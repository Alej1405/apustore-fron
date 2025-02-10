import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Producto from "../components/Producto"
import { Helmet } from "react-helmet-async"

export default function ProductosPage() {

  const { id } = useParams<{ id: string }>()
  const selectColeccion = useAppStore((state)=> state.selectColeccion)
  const productos = useAppStore((state)=>state.productos)
  const coleccion = useAppStore((state) => state.colecciones.find((c) => c.id === parseInt(id!))) // Nuevo: Obtener la colección seleccionada
  const imageUrl = coleccion?.imagen.startsWith('http') ? coleccion?.imagen : `https://app.apustore-ec.com/storage/colect/${coleccion?.imagen}`
  useEffect(() => {
    if (id) {
      selectColeccion(parseInt(id))
    }
  }, [id, selectColeccion])

  return (
    <>
        <Helmet>
          <title>Productos | Apustore</title>
          <meta property="og:title" content={coleccion?.name} />
          <meta property="og:description" content={coleccion?.descripcion} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:url" content="https://apustore-ec.com/" />
        </Helmet>
        <div className="grid md:grid-cols-3 grid-rows-1 gap-10 justify-center items-center p-4">
              {productos.map((producto) => (
          <Producto
            key={producto.id}
            producto={producto}
          />
        ))}
          </div>
    </>
  )
}
