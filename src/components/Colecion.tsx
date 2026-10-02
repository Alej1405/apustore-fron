import { Link } from "react-router-dom"
import type { Coleccion } from "../types"
import { mediaUrl } from "../utils/formato"
import { esMuestra } from "../data/respaldo"

    //tarjeta de coleccion: la foto manda, el nombre va sobre ella
    const Colecion = ({ coleccion }: { coleccion: Coleccion }) => {

            return (
                <Link
                    to={`/coleccion/productos/${coleccion.slug}`}
                    className="presionable group relative block aspect-[4/5] w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-musgo md:w-auto"
                >
                    <img
                        src={mediaUrl(coleccion.imagen)}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-salida group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bosque via-bosque/30 to-transparent" />
                    {esMuestra(coleccion) && (
                        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-0.5 text-[11px] font-semibold text-bosque">Muestra</span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                        <h2 className="font-display text-2xl font-bold leading-tight text-white">{coleccion.nombre}</h2>
                        {coleccion.descripcion && (
                            <p className="mt-1 line-clamp-2 text-sm text-papel/80">{coleccion.descripcion}</p>
                        )}
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-hoja">
                            {coleccion.products_count} {coleccion.products_count === 1 ? 'producto' : 'productos'}
                            <i className="ri-arrow-right-up-line transition-transform duration-300 ease-salida group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true"></i>
                        </span>
                    </div>
                </Link>
            )
        }
        
        export default Colecion
