import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Colecion from "../components/Colecion"
import Producto from "../components/Producto"
import { Suspense } from "react"
import { Helmet} from 'react-helmet-async';

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
      <Helmet>
          <title>Catalogo | Apustore</title>
          <meta property="og:title" content="Catalogo de productos" />
          <meta property="og:description" content="Apustore no solo es ropa, es un respiro a la naturaleza" />
          <meta property="og:image" content="https://apustore-ec.com/hero1.svg" />
          <meta property="og:url" content="https://apustore-ec.com/" />
      </Helmet>
      {/* titulo de la seccion */}
        <div className="bg-green-900/40 backdrop-blur-sm">
          <h1 className="text-center text-s md:text-3xl text-white mt-6 mb-4 font-black">
            Catálogo.
            <br />
            <small className="text-white text-center text-lg font-thin">
              Recuerda que la <span className="text-green-500 uppercase font-bold">moda sostenible</span> es tambien un forma de <span className="text-green-500 uppercase font-bold">cuidar el planeta</span>
            </small>
          </h1>
        </div>
      {/* contenedor de la coleccion */}
      <div className="w-5/6 bg-white/40 rounded-lg backdrop-blur-sm items-center justify-center m-auto mt-6 mb-3">
        {/* contenedor de carrusel de colecciones */}
          <Suspense fallback={"Cargando..."}>
            <div className="grid grid-cols-3 w-full items-center justify-center p-4 overflow-x-auto whitespace-nowrap scroll-smooth">
              <div> 
              {colecciones.map((coleccion) => (
              <Colecion
                key={coleccion.id}
                coleccion={coleccion} />
              ))}
              </div>
            </div>
          </Suspense>
        {/* contenedor de productos / detalles de cada prodcuto */}
        <Suspense fallback={"Cargando..."}>
          <div className="grid md:grid-cols-3 grid-rows-1 gap-10 justify-center items-center p-4">
              {productos.map((producto) => (
                <Producto
                  key={producto.id}
                  producto={producto}
                />
              ))}
          </div>
        </Suspense>
      </div>
    </>
  )
}
