import { useEffect } from "react"
import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import Meta from "../components/Meta"
import Producto from "../components/Producto"
import Compartir from "../components/Compartir"
import { useAppStore } from "../stores/useAppStore"

export default function IndexPage() {
    const hero = useAppStore((state) => state.hero)
    const productos = useAppStore((state) => state.productos)
    const fetchProducto = useAppStore((state) => state.fetchProducto)

    useEffect(() => {
        fetchProducto()
    }, [fetchProducto])

    return (
        <>
            <Meta ruta="/" descripcion={hero?.descripcion} />
            <Hero />
            {productos.length > 0 && (
                <section aria-labelledby="destacados" className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="mb-4 flex items-end justify-between gap-3">
                        <h2 id="destacados" className="font-display text-3xl font-extrabold text-white md:text-4xl">Lo más pedido</h2>
                        <div className="flex items-center gap-2">
                            <Compartir ruta="/colecciones" titulo="Catálogo de Apustore" />
                            <Link to="/colecciones" className="presionable hidden rounded-full bg-hoja px-4 py-1.5 text-sm font-semibold text-bosque md:inline-flex">Ver todo</Link>
                        </div>
                    </div>
                    {/* en el celular se desliza de lado, como en una app; en escritorio es una grilla */}
                    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
                        {productos.slice(0, 8).map((producto, i) => (
                            <div key={producto.id} className="w-[70%] shrink-0 snap-start animate-subir md:w-auto" style={{ animationDelay: `${Math.min(i * 60, 360)}ms` }}>
                                <Producto producto={producto} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}
