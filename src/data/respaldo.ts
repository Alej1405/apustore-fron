import type { Hero, Nosotros, Contacto } from "../types"

//contenido propio de apustore: se muestra solo si el CMS no responde o esta vacio
//cuando la api trae datos, esto se oculta (cms ?? respaldo)

export const heroRespaldo: Hero = {
    titulo: 'Viste Natural',
    subtitulo: 'Tienda Online de Ropa Ecológica y Sustentable',
    descripcion: 'Viste con estilo mientras cuidas del planeta. ¡Descubre la moda sostenible que conecta contigo y con la naturaleza!',
    imagen: '/hero1.svg',
    cta_texto: 'Compra aquí',
    cta_url: '/colecciones',
}

export const nosotrosRespaldo: Nosotros = {
    titulo: 'Nosotros',
    descripcion: null,
    imagen: null,
    por_que_nosotros: [
        'Ofrecer y ofertar a nuestros clientes productos de calidad, con costos competitivos en el mercado, acordes a su necesidad y exigencia, productos que están acordes a su estilo de vivir la vida.',
        'Ser un negocio líder y reconocido en la venta de diseños exclusivos en prendas de estampado, generando un servicio de calidad y excelencia a nuestros clientes, siendo altamente competitivos en el mercado nacional.',
        'Ofrecer una amplia variedad de productos de moda exclusivos, de calidad y a precios accesibles',
    ],
    caracteristicas: [],
}

export const contactoRespaldo: Contacto = {
    direccion: 'Uyumbicho, Ecuador.',
    telefono: '0960154992',
    email: 'ventas@apustore-ec.com',
    whatsapp: '0960154992',
    mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7282438550274!2d-78.5245563247857!3d-0.38500609961120663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5a460133fffff%3A0xb3877f549365d77d!2sparque%20central%20Uyumbicho!5e0!3m2!1ses!2sec!4v1737078304179!5m2!1ses!2sec',
    redes: {
        facebook: 'https://www.facebook.com/profile.php?id=100089894168343&mibextid=ZbWKwL',
        instagram: 'https://www.instagram.com/apu_store222/profilecard/?igsh=MTgyaGptNXUybTJhMQ==',
    },
}

//catalogo de muestra: se ve mientras el ERP no tenga colecciones ni productos cargados,
//para que el cliente vea como se comporta la tienda. Los ids negativos lo marcan como muestra.
type Coleccion = import("../types").Coleccion
type Producto = import("../types").Producto

export const esMuestra = (item: { id: number }) => item.id < 0

const coleccion = (id: number, nombre: string, slug: string, descripcion: string, imagen: string, total: number): Coleccion =>
    ({ id, nombre, slug, descripcion, imagen, products_count: total, children: [] })

export const coleccionesRespaldo: Coleccion[] = [
    coleccion(-1, 'Estampadas', 'muestra-estampadas', 'Diseños exclusivos en serigrafía y DTF, hechos para que se note quién los lleva.', '/muestra/disenos-apu.webp', 2),
    coleccion(-2, 'Básicas de algodón', 'muestra-basicas', 'Algodón suave en colores de la naturaleza: la base de todo guardarropa.', '/muestra/camiseta-oliva.webp', 4),
    coleccion(-3, 'Personalizadas', 'muestra-personalizadas', 'Tu diseño, nuestra tinta. Llevamos tu idea a la prenda.', '/muestra/serigrafia.webp', 1),
]

const producto = (id: number, nombre: string, slug: string, precio: string, imagen: string, col: Coleccion, descripcion: string, caracteristicas: string[] = []): Producto => ({
    id, nombre, slug, descripcion, precio_venta: precio, destacado: true,
    caracteristicas: caracteristicas.map((texto) => ({ texto })),
    store_category: { id: col.id, nombre: col.nombre, slug: col.slug },
    imagenes: [{ id, path: imagen, es_principal: true, orden: 0 }],
    meta_titulo: null, meta_descripcion: null,
})

const [estampadas, basicas, personalizadas] = coleccionesRespaldo

export const productosRespaldo: Producto[] = [
    producto(-1, 'Camiseta Saiyajin', 'muestra-camiseta-saiyajin', '18.00', '/muestra/camiseta-saiyajin.webp', estampadas, 'Estampado frontal y en la espalda, con el sello Apu en la manga.', ['Algodón', 'Estampado DTF', 'Unisex']),
    producto(-2, 'Colección Diseños Apu', 'muestra-disenos-apu', '16.00', '/muestra/disenos-apu.webp', estampadas, 'Montaña, ciclismo y calle: elige tu diseño y tu color.', ['Serigrafía', 'Varios colores']),
    producto(-3, 'Camiseta Blanca Natural', 'muestra-camiseta-blanca', '10.00', '/muestra/camiseta-blanca.webp', basicas, 'La básica que combina con todo.', ['100% algodón']),
    producto(-4, 'Camiseta Verde Oliva', 'muestra-camiseta-oliva', '10.00', '/muestra/camiseta-oliva.webp', basicas, 'Tono tierra, tela suave, corte clásico.', ['100% algodón']),
    producto(-5, 'Camiseta Azul Petróleo', 'muestra-camiseta-petroleo', '10.00', '/muestra/camiseta-petroleo.webp', basicas, 'Un azul profundo que no pasa de moda.', ['100% algodón']),
    producto(-6, 'Camiseta Azul Marino', 'muestra-camiseta-marino', '10.00', '/muestra/camiseta-marino.webp', basicas, 'Sobria, cómoda y lista para estampar.', ['100% algodón']),
    producto(-7, 'Estampado Personalizado', 'muestra-personalizado', '15.00', '/muestra/serigrafia.webp', personalizadas, 'Envíanos tu diseño por WhatsApp y lo estampamos en serigrafía.', ['Serigrafía artesanal', 'Desde una prenda']),
]
