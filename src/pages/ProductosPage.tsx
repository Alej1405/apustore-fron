import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Producto from "../components/Producto"
import Meta from "../components/Meta"
import Compartir from "../components/Compartir"
import type { Colecciones } from "../types"
import { mediaUrl } from "../utils/formato"

//busca la coleccion por slug, tambien entre las subcolecciones
function buscarColeccion(colecciones: Colecciones, slug: string): Colecciones[0] | undefined {
  for (const c of colecciones) {
    if (c.slug === slug) return c
    const hija = buscarColeccion(c.children, slug)
    if (hija) return hija
  }
}

export default function ProductosPage() {

  const { slug = '' } = useParams<{ slug: string }>()
  const selectColeccion = useAppStore((state)=> state.selectColeccion)
  const fetchColecciones = useAppStore((state)=> state.fetchColecciones)
  const productos = useAppStore((state)=>state.productos)
  const coleccion = useAppStore((state) => buscarColeccion(state.colecciones, slug))

  useEffect(() => {
    selectColeccion(slug)
  }, [slug, selectColeccion])

  //si se entra directo a la url, las colecciones aun no estan cargadas
  useEffect(() => {
    if (!coleccion) fetchColecciones()
  }, [coleccion, fetchColecciones])

  const ruta = `/coleccion/productos/${slug}`

  return (
    <>
        <Meta
          titulo={coleccion?.nombre ?? 'Productos'}
          descripcion={coleccion?.descripcion}
          imagen={coleccion?.imagen ? mediaUrl(coleccion.imagen) : undefined}
          url={ruta}
        />
        <header className="mx-auto max-w-7xl px-4 pt-8 md:px-8 md:pt-12">
          <Link to="/colecciones" className="inline-flex items-center gap-1 text-sm text-papel/70 hover:text-hoja">
            <i className="ri-arrow-left-line" aria-hidden="true"></i> Catálogo
          </Link>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-0.02em] text-white md:text-6xl animate-revelar">{coleccion?.nombre}</h1>
          {coleccion?.descripcion && <p className="mt-2 max-w-xl text-papel/80">{coleccion.descripcion}</p>}
          <div className="mt-3"><Compartir ruta={ruta} titulo={coleccion?.nombre ?? 'Colección de Apustore'} /></div>
        </header>
        <div className="mx-auto mt-6 grid max-w-7xl grid-cols-2 gap-3 px-4 md:grid-cols-4 md:gap-5 md:px-8">
          {productos.map((producto, i) => (
            <div key={producto.id} className="animate-subir" style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}>
              <Producto producto={producto} />
            </div>
          ))}
        </div>
    </>
  )
}
