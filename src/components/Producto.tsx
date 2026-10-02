import { Link } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import type { Producto as ProductoType } from "../types"
import { formatPrecio, imagenProducto } from "../utils/formato"
import { esMuestra } from "../data/respaldo"

//tarjeta de producto; recibe el producto del catalogo o uno del carrito (que solo trae lo basico)
type ProductoProps = {
    producto: Pick<ProductoType, 'id' | 'nombre' | 'slug' | 'precio_venta'> & Partial<ProductoType> & { imagen?: string }
}

const Producto = ({ producto }: ProductoProps) => {

    const selectProducto = useAppStore((state)=> state.selectProducto)
    const imageUrl = producto.imagen ?? (producto.imagenes ? imagenProducto(producto as ProductoType) : '/vite.svg')
    
    return (
        <article className="group flex flex-col overflow-hidden rounded-3xl bg-white/90 text-bosque shadow-[0_12px_30px_-12px_rgba(5,46,22,0.5)]">
            <Link to={`/producto/${producto.slug}`} className="relative block aspect-square overflow-hidden bg-papel">
                <img
                    src={imageUrl}
                    alt={producto.nombre}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-salida group-hover:scale-105"
                />
                {esMuestra(producto) && (
                    <span className="absolute left-3 top-3 rounded-full bg-bosque/80 px-2.5 py-0.5 text-[11px] font-semibold text-hoja backdrop-blur">Muestra</span>
                )}
            </Link>
            <div className="flex flex-1 flex-col gap-1 p-4">
                <Link to={`/producto/${producto.slug}`}>
                    <h3 className="font-display text-base font-bold leading-tight md:text-lg">{producto.nombre}</h3>
                </Link>
                {producto.descripcion && (
                    <p className="line-clamp-2 text-xs text-bosque/70">{producto.descripcion}</p>
                )}
                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="font-display text-lg font-extrabold tabular-nums text-apu-oscuro">{formatPrecio(producto.precio_venta)}</span>
                    <button
                        type="button"
                        onClick={()=>selectProducto(producto.slug)}
                        aria-label={`Agregar ${producto.nombre}`}
                        className="presionable inline-flex items-center gap-1.5 rounded-full bg-bosque px-4 py-2 text-xs font-semibold text-hoja hover:bg-musgo"
                        >
                        <i className="ri-add-line" aria-hidden="true"></i> Agregar
                    </button>
                </div>
            </div>
        </article>
    )
}

export default Producto
