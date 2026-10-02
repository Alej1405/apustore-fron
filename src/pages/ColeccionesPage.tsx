import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Colecion from "../components/Colecion"
import Producto from "../components/Producto"
import Meta from "../components/Meta"
import Compartir from "../components/Compartir"

export default function ColeccionesPage() {

  const fetchColeccion = useAppStore((state) => state.fetchColecciones )
  const colecciones = useAppStore((state) => state.colecciones )
  const fetchProducto = useAppStore((state)=>state.fetchProducto)
  const productos = useAppStore ((state)=>state.productos)

  useEffect(() =>{
    fetchColeccion()
    fetchProducto()
  },[fetchColeccion, fetchProducto])

  return (
    <>
      <Meta ruta="/colecciones" />
      <header className="mx-auto max-w-7xl px-4 pt-8 md:px-8 md:pt-12">
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-white md:text-6xl animate-revelar">Catálogo</h1>
        <p className="mt-2 max-w-xl text-papel/80">
          Recuerda que la <span className="font-semibold text-hoja">moda sostenible</span> es también una forma de <span className="font-semibold text-hoja">cuidar el planeta</span>.
        </p>
        <div className="mt-3"><Compartir ruta="/colecciones" titulo="Catálogo de Apustore" /></div>
      </header>

      {/* colecciones: carrusel en el celular, grilla en escritorio */}
      <section aria-label="Colecciones" className="mx-auto max-w-7xl md:px-8">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-6 md:grid md:grid-cols-3 md:px-0">
          {colecciones.map((coleccion) => (
            <Colecion key={coleccion.id} coleccion={coleccion} />
          ))}
        </div>
      </section>

      <section aria-labelledby="productos" className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 id="productos" className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">Destacados</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {productos.map((producto, i) => (
            <div key={producto.id} className="animate-subir" style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}>
              <Producto producto={producto} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
