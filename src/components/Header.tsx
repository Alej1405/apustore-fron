import { NavLink, Link } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";
import { useEsMovil } from "../hooks/useEsMovil";
import { useLogo } from "../hooks/useLogo";

const ENLACES = [
    { to: '/nosotros', texto: 'Nosotros' },
    { to: '/colecciones', texto: 'Catálogo' },
    { to: '/contactos', texto: 'Contactos' },
]

const Header = () => {

    const kartCount = useAppStore((state)=> state.kartCount())
    const esMovil = useEsMovil()
    const logo = useLogo()

    //en el celular: barra superior minima; la navegacion esta abajo (NavMovil)
    if (esMovil) {
        return (
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-bosque/70 px-4 backdrop-blur-xl pt-[env(safe-area-inset-top)]">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Logo de Apustore" className="size-8" />
                    <span className="font-display text-lg font-bold">Apu Store</span>
                </Link>
                <Link to="/contactos" aria-label="Contacto" className="presionable grid size-9 place-items-center rounded-full bg-white/10">
                    <i className="ri-whatsapp-line text-lg text-hoja" aria-hidden="true"></i>
                </Link>
            </header>
        )
    }

    return (
        <nav className="sticky top-0 z-30 bg-musgo/60 backdrop-blur-md text-white">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/" className="flex items-center gap-3">
                        <img src={logo} alt="Logo de Apustore" className="w-10 transition-transform duration-300 ease-salida hover:rotate-[-8deg]"/>
                        <span className="font-display text-lg font-bold">Apu Store</span>
                    </NavLink>
                    <div className="flex items-center gap-1">
                        {ENLACES.map((e) => (
                            <NavLink
                                key={e.to}
                                to={e.to}
                                className={({isActive})=>
                                    `presionable rounded-md px-3 py-2 ${isActive ? 'bg-hoja/20 font-semibold text-hoja' : 'hover:bg-white/10'}`
                                }>
                                {e.texto}
                            </NavLink>
                        ))}
                        <NavLink
                            to="/kart"
                            aria-label={`Pedido, ${kartCount} productos`}
                            className={({isActive})=>
                                `presionable relative ml-2 grid size-10 place-items-center rounded-full ${isActive ? 'bg-hoja/20 text-hoja' : 'hover:bg-white/10'}`
                            }>
                            <i className="ri-shopping-bag-3-line text-lg" aria-hidden="true"></i>
                            {kartCount > 0 && (
                                <span key={kartCount} className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-apu px-1 text-xs font-bold animate-globo">
                                    {kartCount}
                                </span>
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
    };

    export default Header;
