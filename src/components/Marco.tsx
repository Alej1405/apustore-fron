import { Suspense } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import NavMovil from "./NavMovil"
import { useEsMovil } from "../hooks/useEsMovil"
import { CargandoPagina } from "./Loader"

//cascaron comun de los dos layouts: cabecera, pagina con transicion, pie y nav movil
export default function Marco({ fondo }: { fondo: string }) {
    const esMovil = useEsMovil()
    const { pathname } = useLocation()

    return (
        <div className={`${fondo} min-h-dvh bg-cover bg-fixed bg-center bg-no-repeat`}>
            <Header />
            <div key={pathname} className="animate-pagina">
                {/* la pagina lazy carga aqui dentro: la cabecera y la nav no desaparecen */}
                <Suspense fallback={<CargandoPagina />}>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
            {esMovil && (
                <>
                    {/* espacio para que la nav inferior no tape el final de la pagina */}
                    <div className="h-24" aria-hidden="true" />
                    <NavMovil />
                </>
            )}
        </div>
    )
}
