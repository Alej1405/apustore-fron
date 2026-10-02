import { lazy, Suspense, useEffect } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { useAppStore } from "./stores/useAppStore"
import Loader, { CargandoPagina } from "./components/Loader"


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
const ProductoPage = lazy(()=> import("./pages/ProductoPage"))

export default function AppRouter() {
    //el contenido del CMS (logo, hero, nosotros, contacto) se carga una vez para todo el sitio
    const fetchCms = useAppStore((state) => state.fetchCms)
    //el carrito guardado se recupera en cualquier pagina, no solo en las de la tienda
    const laodFromStorage = useAppStore((state) => state.laodFromStorage)
    useEffect(() => {
        fetchCms()
        laodFromStorage()
    }, [fetchCms, laodFromStorage])
    
    return (
        <HelmetProvider>
            <Loader />
            <BrowserRouter>
                <Suspense fallback={<CargandoPagina />}>
                <Routes>
                    {/* rutas de elementos simples o basicos de informacion general de la paginad */}
                    <Route element={<IndexLayout />}>
                        <Route path='/' element={<IndexPage/>}/>
                        <Route path='/nosotros' element={<NosotrosPage/>}/>
                        <Route path='/contactos' element={<ContactosPage/>}/>
                    </Route>
                    {/* rutas de elementos con consumo de api o de vista de comercio electronico */}
                    <Route element={<EcommerceLayout />}>
                        <Route path='/colecciones' element={<ColeccionesPage/>}/>
                        <Route path='/coleccion/productos/:slug' element={<ProductosPage/>}/>
                        <Route path='/producto/:slug' element={<ProductoPage/>}/>
                        <Route path='/kart' element={<KartPage/>}/>
                    </Route>
                </Routes>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    )
}
