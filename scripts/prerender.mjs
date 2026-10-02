/**
 * Prerender de Open Graph.
 *
 * El sitio es una SPA: el servidor entrega siempre el mismo index.html y los meta
 * tags reales los pone React en el navegador. WhatsApp, Facebook y LinkedIn no
 * ejecutan JavaScript, así que sin esto todo enlace compartido sale con el título
 * y la imagen de la portada.
 *
 * Corre después de `vite build`. Escribe un HTML por página fija, por colección y
 * por producto, con su propio <head>; el cuerpo es el mismo bundle y React arranca
 * igual. El .htaccess los entrega en su URL normal. También escribe el sitemap.
 *
 *   dist/_paginas/<archivo>.html      → /nosotros, /colecciones, /contactos, /kart
 *   dist/_colecciones/<slug>.html     → /coleccion/productos/<slug>
 *   dist/_productos/<slug>.html       → /producto/<slug>
 *
 * Si el ERP no responde, se publica igual con los textos de src/data/seo.json:
 * la web siempre muestra contenido.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

// En CI las variables llegan por el entorno; en local se leen de .env.local.
async function cargarEnvLocal() {
    const texto = await readFile('.env.local', 'utf8').catch(() => '')
    for (const linea of texto.split('\n')) {
        const m = linea.match(/^\s*(VITE_[A-Z_]+)\s*=\s*(.*)\s*$/)
        if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
}
await cargarEnvLocal()

const CMS       = process.env.VITE_CMS_BASE_URL
const TOKEN     = process.env.VITE_CMS_TOKEN
const ECOMMERCE = process.env.VITE_ECOMMERCE_BASE_URL
const STORAGE   = process.env.VITE_ERP_STORAGE_URL
const DIST      = path.resolve('dist')
const SEO       = JSON.parse(await readFile('src/data/seo.json', 'utf8'))
const SITIO     = SEO.sitio

function esc(texto) {
    return String(texto ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Recorta a lo que muestran buscadores y tarjetas, sin cortar una palabra. */
function resumir(texto, limite = 160) {
    const limpio = String(texto ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    if (limpio.length <= limite) return limpio
    return limpio.slice(0, limpio.lastIndexOf(' ', limite)).trimEnd() + '…'
}

/** og:image tiene que ser absoluta. Las rutas del ERP son relativas a su storage. */
function imagenAbsoluta(imagen) {
    if (!imagen) return `${SITIO}${SEO.imagen}`
    if (/^https?:\/\//i.test(imagen)) return imagen
    if (imagen.startsWith('/')) return `${SITIO}${imagen}`
    return `${STORAGE}/${imagen}`
}

function precio(valor) {
    const n = Number.parseFloat(valor)
    return Number.isFinite(n) ? n.toFixed(2) : null
}

/** Reemplaza el valor de una etiqueta del index.html (no la duplica: las redes toman la primera). */
function reemplazarMeta(html, atributo, nombre, valor) {
    const patron = new RegExp(`(<meta\\s+${atributo}=["']${nombre}["']\\s+content=["'])[^"']*(["']\\s*/?>)`, 'i')
    if (!patron.test(html)) {
        console.error(`::error::index.html no tiene ${atributo}="${nombre}". El prerender la reemplaza, no la inventa.`)
        process.exit(1)
    }
    return html.replace(patron, `$1${esc(valor)}$2`)
}

/** El HTML de una URL con sus propios meta tags. */
function construir(plantilla, { titulo, tituloCorto, descripcion, url, imagen, tipo = 'website', extraHead = '' }) {
    let html = plantilla.replace(/<title>[^<]*<\/title>/i, `<title>${esc(titulo)}</title>`)
    html = reemplazarMeta(html, 'name', 'description', descripcion)
    html = reemplazarMeta(html, 'property', 'og:type', tipo)
    for (const red of ['og', 'twitter']) {
        html = reemplazarMeta(html, 'property', `${red}:title`, tituloCorto)
        html = reemplazarMeta(html, 'property', `${red}:description`, descripcion)
        html = reemplazarMeta(html, 'property', `${red}:url`, url)
        html = reemplazarMeta(html, 'property', `${red}:image`, imagen)
    }
    html = reemplazarMeta(html, 'property', 'og:image:alt', tituloCorto)
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, `<link rel="canonical" href="${esc(url)}" />`)
    return extraHead ? html.replace('</head>', `  ${extraHead}\n</head>`) : html
}

const jsonLd = (dato) => `<script type="application/ld+json">${JSON.stringify(dato).replace(/</g, '\\u003c')}</script>`

/** GET al ERP. Devuelve null si falla o viene vacío: esa parte usa los textos de seo.json. */
async function pedir(url, conToken = false) {
    try {
        const r = await fetch(url, { headers: { Accept: 'application/json', ...(conToken ? { Authorization: `Bearer ${TOKEN}` } : {}) } })
        if (!r.ok) {
            console.warn(`::warning::El ERP respondió ${r.status} en ${url}`)
            return null
        }
        const dato = await r.json()
        return dato && (typeof dato !== 'object' || Object.keys(dato).length) ? dato : null
    } catch (error) {
        console.warn(`::warning::No se pudo leer ${url}: ${error.message}`)
        return null
    }
}

async function todosLosProductos() {
    const productos = []
    for (let pagina = 1; pagina <= 40; pagina++) {
        const res = await pedir(`${ECOMMERCE}/products?page=${pagina}`)
        if (!res?.data) break
        productos.push(...res.data)
        if (!res.next_page_url || res.current_page >= res.last_page) break
    }
    return productos
}

const aplanar = (cats) => cats.flatMap((c) => [c, ...aplanar(c.children ?? [])])
const slugValido = (s) => typeof s === 'string' && /^[\w-]+$/.test(s)

function imagenProducto(p) {
    const principal = (p.imagenes ?? []).find((i) => i.es_principal) ?? p.imagenes?.[0]
    return imagenAbsoluta(principal?.path)
}

function sitemap(urls) {
    const filas = urls.map(({ loc, cambia, prioridad }) =>
        `  <url><loc>${SITIO}${loc}</loc><changefreq>${cambia}</changefreq><priority>${prioridad}</priority></url>`)
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${filas.join('\n')}\n</urlset>\n`
}

async function escribir(carpeta, nombre, html) {
    await mkdir(path.join(DIST, carpeta), { recursive: true })
    await writeFile(path.join(DIST, carpeta, `${nombre}.html`), html, 'utf8')
}

async function main() {
    const plantilla = await readFile(path.join(DIST, 'index.html'), 'utf8').catch(() => {
        console.error('::error::No existe dist/index.html. El prerender corre después de `vite build`.')
        process.exit(1)
    })

    if (!TOKEN) console.warn('::warning::Falta VITE_CMS_TOKEN: la portada y Nosotros salen con los textos de seo.json.')

    const [hero, nosotros, contacto, categorias, productos] = await Promise.all([
        TOKEN ? pedir(`${CMS}/hero`, true) : null,
        TOKEN ? pedir(`${CMS}/about`, true) : null,
        TOKEN ? pedir(`${CMS}/contact`, true) : null,
        pedir(`${ECOMMERCE}/categories`),
        todosLosProductos(),
    ])

    const paginaSeo = (ruta) => SEO.paginas.find((p) => p.ruta === ruta)
    const urls = SEO.paginas.filter((p) => p.ruta !== '/kart').map((p) => ({ loc: p.ruta, cambia: p.cambia, prioridad: p.prioridad }))

    // Portada: hero del CMS (o seo.json) y los datos estructurados de la tienda.
    const inicio = paginaSeo('/')
    const tienda = { '@context': 'https://schema.org', '@type': 'ClothingStore', name: SEO.nombre, url: SITIO, image: `${SITIO}${SEO.imagen}`, logo: `${SITIO}/vite.svg` }
    if (contacto?.telefono) tienda.telephone = contacto.telefono
    if (contacto?.email) tienda.email = contacto.email
    if (contacto?.direccion) tienda.address = { '@type': 'PostalAddress', streetAddress: contacto.direccion, addressCountry: 'EC' }
    const redes = Object.values(contacto?.redes ?? {}).filter(Boolean)
    if (redes.length) tienda.sameAs = redes

    await writeFile(path.join(DIST, 'index.html'), construir(plantilla, {
        titulo: inicio.titulo,
        tituloCorto: hero?.titulo ?? inicio.tituloCorto,
        descripcion: resumir(hero?.descripcion ?? inicio.descripcion),
        url: `${SITIO}/`,
        imagen: imagenAbsoluta(hero?.imagen),
        extraHead: jsonLd(tienda),
    }), 'utf8')

    // Páginas fijas. Nosotros toma su texto e imagen del CMS si los hay.
    for (const p of SEO.paginas.filter((p) => p.ruta !== '/')) {
        const delCms = p.ruta === '/nosotros' ? nosotros : null
        await escribir('_paginas', p.archivo, construir(plantilla, {
            titulo: p.titulo,
            tituloCorto: p.tituloCorto,
            descripcion: resumir(delCms?.descripcion ?? p.descripcion),
            url: `${SITIO}${p.ruta}`,
            imagen: imagenAbsoluta(delCms?.imagen),
        }))
    }

    // Una página por colección.
    const colecciones = aplanar(Array.isArray(categorias) ? categorias : []).filter((c) => slugValido(c.slug))
    for (const c of colecciones) {
        const nombre = String(c.nombre).trim()
        const ruta = `/coleccion/productos/${c.slug}`
        await escribir('_colecciones', c.slug, construir(plantilla, {
            titulo: `${c.meta_titulo ?? nombre} | ${SEO.nombre}`,
            tituloCorto: nombre,
            descripcion: resumir(c.meta_descripcion ?? c.descripcion ?? `Colección ${nombre} de ${SEO.nombre}.`),
            url: `${SITIO}${ruta}`,
            imagen: imagenAbsoluta(c.imagen),
        }))
        urls.push({ loc: ruta, cambia: 'weekly', prioridad: '0.8' })
    }

    // Una página por producto, con su precio y sus datos estructurados.
    const validos = productos.filter((p) => slugValido(p.slug))
    for (const p of validos) {
        const nombre = String(p.nombre).trim()
        const ruta = `/producto/${p.slug}`
        const valor = precio(p.precio_venta)
        const imagen = imagenProducto(p)
        const producto = { '@context': 'https://schema.org', '@type': 'Product', name: nombre, image: imagen, description: resumir(p.descripcion), url: `${SITIO}${ruta}` }
        if (valor) producto.offers = { '@type': 'Offer', price: valor, priceCurrency: 'USD', availability: 'https://schema.org/InStock' }
        await escribir('_productos', p.slug, construir(plantilla, {
            titulo: `${p.meta_titulo ?? nombre} | ${SEO.nombre}`,
            tituloCorto: valor ? `${nombre} · $${valor}` : nombre,
            descripcion: resumir(p.meta_descripcion ?? p.descripcion ?? `${nombre}. Pídelo por WhatsApp en ${SEO.nombre}.`),
            url: `${SITIO}${ruta}`,
            imagen,
            tipo: 'product',
            extraHead: jsonLd(producto),
        }))
        urls.push({ loc: ruta, cambia: 'weekly', prioridad: '0.7' })
    }

    await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(urls), 'utf8')

    console.log(`Prerender: portada${hero ? ' (con el CMS)' : ''}, ${SEO.paginas.length - 1} página(s) fija(s), ${colecciones.length} colección(es), ${validos.length} producto(s). Sitemap con ${urls.length} URLs.`)
}

main()
