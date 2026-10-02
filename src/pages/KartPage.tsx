import { Link } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import Meta from "../components/Meta"
import { formatPrecio } from "../utils/formato"

export default function KartPage() {

    const kart = useAppStore((state)=> state.kart)
    const handleKart = useAppStore((state)=> state.handleKart)
    const sendKartWhatsapp = useAppStore((state)=> state.sendKartWhatsapp)
    const hasKart = kart.length > 0

    return (
        <>
            <Meta ruta="/kart" />
            <div className="mx-auto max-w-3xl px-4 pt-8 md:px-8 md:pt-12">
                <h1 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-white md:text-5xl animate-revelar">Tu pedido</h1>
                <p className="mt-2 text-papel/80">
                    Recuerda que la <span className="font-semibold text-hoja">moda sostenible</span> es también una forma de <span className="font-semibold text-hoja">cuidar el planeta</span>.
                </p>

                {hasKart ? (
                    <>
                        <ul className="mt-6 space-y-3">
                            {kart.map((producto, i) => (
                                <li key={producto.id} className="flex items-center gap-4 rounded-2xl bg-white/90 p-3 text-bosque animate-subir" style={{ animationDelay: `${Math.min(i * 50, 300)}ms` }}>
                                    <Link to={`/producto/${producto.slug}`} className="shrink-0">
                                        <img src={producto.imagen} alt="" className="size-20 rounded-xl bg-papel object-cover" />
                                    </Link>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-display font-bold">{producto.nombre}</p>
                                        <p className="text-sm text-bosque/70">
                                            {[producto.size && `Talla ${producto.size}`, producto.color && `Color ${producto.color}`].filter(Boolean).join(' · ') || 'Sin talla ni color elegidos'}
                                        </p>
                                        <p className="font-semibold tabular-nums text-apu-oscuro">{formatPrecio(producto.precio_venta)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleKart(producto)}
                                        aria-label={`Quitar ${producto.nombre}`}
                                        className="presionable grid size-10 shrink-0 place-items-center rounded-full text-bosque/60 hover:bg-bosque/10 hover:text-apu-oscuro"
                                    >
                                        <i className="ri-delete-bin-line text-lg" aria-hidden="true"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {/* en el celular el boton queda fijo sobre la nav inferior, al alcance del pulgar */}
                        <div className="sticky bottom-24 mt-6 md:static">
                            <button
                                onClick={sendKartWhatsapp}
                                className="presionable flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-semibold text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.7)] hover:bg-whatsapp/85"
                            >
                                <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i> Enviar pedido por WhatsApp
                            </button>
                        </div>
                    </>
                ):(
                    <div className="mt-10 rounded-3xl bg-white/10 p-8 text-center backdrop-blur">
                        <i className="ri-shopping-bag-3-line text-5xl text-hoja" aria-hidden="true"></i>
                        <p className="mt-3 font-display text-xl font-bold text-white">Aún no has agregado nada.</p>
                        <p className="mt-1 text-sm text-papel/70">Elige tus prendas y envía el pedido por WhatsApp en un toque.</p>
                        <Link to="/colecciones" className="presionable mt-5 inline-flex rounded-full bg-hoja px-6 py-3 font-semibold text-bosque">Ver el catálogo</Link>
                    </div>
                )}
            </div>
        </>
    ) 
}
