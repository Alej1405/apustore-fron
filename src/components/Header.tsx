import { useState, useEffect} from "react";
import { NavLink, Link } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";

const Header = () => {

    const kartCount = useAppStore((state)=> state.kartCount())
    const [flag, setFlag] = useState("hidden")
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //menu hamburguesa
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    useEffect(() => {
        if (kartCount !== 0) {
            setFlag("absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2");
        } else {
            setFlag("hidden");
        }
    }, [kartCount]);

    console.log(kartCount)


    return (
        <nav className="bg-green-900/50 backdrop-blur-sm text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <div>
                        <NavLink
                            to="/"
                            className="text-lg font-bold flex flex-row items-center gap-3">
                                <img src="vite.svg" alt="Logo de Apustore" className="w-10"/>
                                <h2>Apu Store</h2>
                        </NavLink>

                    </div>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <NavLink
                            to="/nosotros" 
                            className={({isActive})=>
                                isActive ? 'relative hover:bg-green-300/40 px-3 py-2 rounded-md text-red-700/80 font-bold bg-green-300/40' : 'relative hover:bg-green-300/40 px-3 py-2 rounded-md'
                            }>
                            Nosotros
                        </NavLink>
                        <NavLink
                            to="/colecciones"
                            className={({ isActive }) =>
                            isActive
                                ? 'relative hover:bg-green-300/40 px-3 py-2 rounded-md text-red-700/80 font-bold bg-green-300/40'
                                : 'relative hover:bg-green-300/40 px-3 py-2 rounded-md'
                            }
                            >
                            Catalogo
                        </NavLink>
                        <NavLink
                            to="/contactos" 
                            className={({isActive})=>
                                isActive ? 'relative hover:bg-green-300/40 px-3 py-2 rounded-md text-red-700/80 font-bold bg-green-300/40' : 'relative hover:bg-green-300/40 px-3 py-2 rounded-md'
                            }>
                            Contactos
                        </NavLink>
                        <NavLink
                            to="/kart" 
                            className={({isActive})=>
                                isActive ? 'relative hover:bg-green-300/40 px-3 py-2 rounded-md text-red-700/80 font-bold bg-green-300/40' : 'relative hover:bg-green-300/40 px-3 py-2 rounded-md'
                            }>
                            <i className="ri-shopping-cart-2-line"></i>
                            <span className={flag}>
                                {kartCount}
                            </span>
                        </NavLink>
                    </div>
                    <div className="md:hidden">
                        <button
                        onClick={toggleMenu}
                        className="p-2 rounded-md"
                        aria-label="Toggle menu"
                        >
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                                isMenuOpen
                                ? "M6 18L18 6M6 6l12 12"
                                : "M4 6h16M4 12h16m-7 6h7"
                            }
                            />
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/nosotros"
                            className="block hover:bg-green-300/40 px-3 py-2 rounded-md">
                            Nosotros
                        </Link>
                        <Link
                            to="/colecciones"
                            className="block hover:bg-green-300/40 px-3 py-2 rounded-md"
                            >
                            Catalogo
                        </Link>
                        <Link
                            to="/contactos" 
                            className="block hover:bg-green-300/40 px-3 py-2 rounded-md">
                            Contactos
                        </Link>
                        <NavLink
                            to="/kart" 
                            className={({isActive})=>
                                isActive ? 'relative hover:bg-green-300/40 px-3 py-2 rounded-md text-red-700/80 font-bold bg-green-300/40' : 'relative hover:bg-green-300/40 px-3 py-2 rounded-md'
                            }>
                            <i className="ri-shopping-cart-2-line"></i>
                            <span className={flag}>
                                {kartCount}
                            </span>
                        </NavLink>
                    </div>
                </div>
            )}
            
        </nav>
    );
    };

    export default Header;

