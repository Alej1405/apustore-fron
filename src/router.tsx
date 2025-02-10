import { lazy, Suspense } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"


//importar el layouts
//layout principal
import IndexLayout from "./layout/IndexLayout"
//layout ecommerce
import EcommerceLayout from "./layout/EcommerceLayout"

//importar paginas
//pagina principal
const IndexPage = lazy(()=> import("./pages/IndexPage"))
//paginas estaticas nosotros-about
import NosotrosPage from "./pages/NosotrosPage"
const ContactosPage = lazy(()=> import("./pages/ContactosPage"))
//paginas con consumo de api productos y coleccion

const ColeccionesPage = lazy(()=> import("./pages/ColeccionesPage"))
const ProductosPage = lazy(()=> import("./pages/ProductosPage"))
const KartPage = lazy(()=> import("./pages/KartPage"))

export default function AppRouter() {
    
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    {/* rutas de elementos simples o basicos de informacion general de la paginad */}
                    <Route element={<IndexLayout />}>
                        <Route path='/' element={
                        <Suspense fallback="Cargando">
                            <IndexPage/>
                        </Suspense>
                        
                        }/>
                        <Route path='/nosotros' element={<NosotrosPage/>}/>
                        <Route path='/contactos' element={
                        <Suspense fallback="Cargando">
                            <ContactosPage/>
                        </Suspense>
                        }/>
                    </Route>
                    {/* rutas de elementos con consumo de api o de vista de comercio electronico */}
                    <Route element={<EcommerceLayout />}>
                        <Route path='/colecciones' element={
                        <Suspense fallback="Cargando">
                            <ColeccionesPage/>
                        </Suspense>
                        }/>
                        <Route path='/coleccion/productos/:id' element={
                        <Suspense fallback="Cargando">
                            <ProductosPage/>
                        </Suspense>
                        }/>
                        <Route path='/kart' element={
                        <Suspense fallback="Cargando">
                            < KartPage/>
                        </Suspense>    
                        }/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    )
}
