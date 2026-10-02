import { NavLink } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

//firma mashacorp: en el celular la navegacion vive abajo, al alcance del pulgar, como en una app
const PESTANAS = [
    { to: '/', icono: 'ri-home-5', texto: 'Inicio', exacta: true },
    { to: '/colecciones', icono: 'ri-t-shirt-2', texto: 'Catálogo' },
    { to: '/nosotros', icono: 'ri-leaf', texto: 'Nosotros' },
    { to: '/contactos', icono: 'ri-chat-smile-2', texto: 'Contacto' },
    { to: '/kart', icono: 'ri-shopping-bag-3', texto: 'Pedido' },
]

export default function NavMovil() {
    const kartCount = useAppStore((state) => state.kartCount())

    return (
        <nav
            aria-label="Navegación principal"
            className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-white/10 bg-bosque/85 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
        >
            <ul className="grid grid-cols-5">
                {PESTANAS.map((p) => (
                    <li key={p.to}>
                        <NavLink
                            to={p.to}
                            end={p.exacta}
                            className={({ isActive }) =>
                                `presionable relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${isActive ? 'text-hoja' : 'text-papel/60'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <i className={`${p.icono}-${isActive ? 'fill' : 'line'} text-xl leading-none`} aria-hidden="true"></i>
                                    {p.texto}
                                    {p.to === '/kart' && kartCount > 0 && (
                                        <span key={kartCount} className="absolute right-3 top-1.5 grid min-w-4 place-items-center rounded-full bg-apu px-1 text-[10px] font-bold text-white animate-globo">
                                            {kartCount}
                                        </span>
                                    )}
                                    <span className={`absolute top-0 h-0.5 w-6 rounded-full bg-hoja transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                </>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
