import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Meta from "../components/Meta"
import Compartir from "../components/Compartir"
import { CargandoPagina } from "../components/Loader"
import { useAppStore } from "../stores/useAppStore"
import { getProductoBySlug } from "../services/ColeccionService"
import { contactoRespaldo, productosRespaldo, esMuestra } from "../data/respaldo"
import { formatPrecio, imagenProducto, whatsappLink } from "../utils/formato"
import type { Producto } from "../types"

//pagina propia de un producto: tiene su url y su open graph para compartirlo
export default function ProductoPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const selectProducto = useAppStore((state) => state.selectProducto)
  const contacto = useAppStore((state) => state.contacto) ?? contactoRespaldo
  const [producto, setProducto] = useState<Producto | null | undefined>(undefined)

  useEffect(() => {
    let vigente = true
    getProductoBySlug(slug)
      .catch(() => undefined)
      .then((p) => { if (vigente) setProducto(p ?? productosRespaldo.find((r) => r.slug === slug) ?? null) })
    return () => { vigente = false }
  }, [slug])

  if (producto === undefined) return <CargandoPagina />

  if (producto === null) {
    return (
      <div className="mx-auto my-24 max-w-md space-y-4 px-4 text-center text-white">
        <p className="font-display text-2xl font-bold">Este producto ya no está disponible.</p>
        <Link to="/colecciones" className="presionable inline-flex rounded-full bg-hoja px-5 py-2.5 font-semibold text-bosque">Ver el catálogo</Link>
      </div>
    )
  }

  const ruta = `/producto/${producto.slug}`
  const imagen = imagenProducto(producto)
  const mensaje = `Hola Apustore, quiero pedir: ${producto.nombre} (${formatPrecio(producto.precio_venta)})`

  return (
    <>
      <Meta
        titulo={producto.meta_titulo ?? producto.nombre}
        descripcion={producto.meta_descripcion ?? producto.descripcion}
        imagen={imagen}
        url={ruta}
      />
      <article className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-2 md:gap-10 md:px-8 md:py-12">
        <div className="relative overflow-hidden rounded-3xl bg-papel animate-subir">
          <img src={imagen} alt={producto.nombre} className="aspect-square w-full object-cover" />
          {esMuestra(producto) && (
            <span className="absolute left-4 top-4 rounded-full bg-bosque/80 px-3 py-1 text-xs font-semibold text-hoja backdrop-blur">Producto de muestra</span>
          )}
        </div>
        <div className="flex flex-col rounded-3xl bg-white/90 p-6 text-bosque md:p-8 animate-subir [animation-delay:120ms]">
          {producto.store_category && (
            <Link to={`/coleccion/productos/${producto.store_category.slug}`} className="text-sm font-semibold text-helecho hover:underline">
              {producto.store_category.nombre}
            </Link>
          )}
          <h1 className="mt-1 font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.02em]">{producto.nombre}</h1>
          <p className="mt-3 font-display text-3xl font-bold tabular-nums text-apu-oscuro">{formatPrecio(producto.precio_venta)}</p>
          {producto.descripcion && <p className="mt-4 max-w-prose text-bosque/80">{producto.descripcion}</p>}
          {producto.caracteristicas.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {producto.caracteristicas.map((c) => (
                <li key={c.texto} className="rounded-full bg-hoja/40 px-3 py-1 text-xs font-semibold">{c.texto}</li>
              ))}
            </ul>
          )}
          <div className="mt-auto grid gap-2.5 pt-8">
            <a
              href={whatsappLink(contacto.whatsapp, mensaje)}
              target="_blank"
              rel="noopener"
              className="presionable flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-semibold text-white hover:bg-whatsapp/85"
            >
              <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i> Pedir por WhatsApp
            </a>
            <button
              type="button"
              onClick={() => selectProducto(producto.slug)}
              className="presionable flex items-center justify-center gap-2 rounded-full bg-bosque px-5 py-3.5 font-semibold text-hoja hover:bg-musgo"
            >
              <i className="ri-t-shirt-2-line" aria-hidden="true"></i> Elegir talla y color
            </button>
            <div className="flex justify-center pt-1"><Compartir ruta={ruta} titulo={producto.nombre} oscuro /></div>
          </div>
        </div>
      </article>
    </>
  )
}
