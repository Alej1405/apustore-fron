//estilos y presentacion de la web es decir que muestra lo principal

import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function IndexLayout() {
    return (
        
        <div className="bg-index bg-no-repeat bg-cover h-full bg-fixed">
                <Header />
                    <Outlet />
                <Footer />
        </div>

            

    )
}
