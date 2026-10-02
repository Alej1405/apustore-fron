import axios from "axios"
import { ColeccionesAPIResponseSchema, ProductosAPIResponseSchema, ProductosPaginadosAPIResponseSchema, ProductoSchema } from "../utils/colecciones-schema"
import type { Productos } from "../types"

//api publica de ecommerce del ERP: https://erp.mashaec.net/api/ecommerce/apustore
const API = import.meta.env.VITE_ECOMMERCE_BASE_URL
//tope para no colgar la pagina si la paginacion del ERP nunca cierra
const MAX_PAGINAS = 40

//recupera todas las colecciones (categorias de la tienda)
export async function getColecciones(){
    const { data } = await axios(`${API}/categories`)
    const result = ColeccionesAPIResponseSchema.safeParse(data)

    if(result.success){
        return result.data
    }
}

//recupera solo los productos que el administrador destaca o los llamados betcelers
//si todavia no hay destacados se muestra la primera pagina del catalogo
export async function getProductos(){
    const { data } = await axios(`${API}/products/featured`)
    const result = ProductosAPIResponseSchema.safeParse(data)

    if(result.success && result.data.length){
        return result.data
    }
    return getPagina(`${API}/products?page=1`)
}

//recuperar los productos de una sola coleccion, recorriendo todas sus paginas
export async function getProductosByColeccion(slug: string){
    const productos: Productos = []
    for (let pagina = 1; pagina <= MAX_PAGINAS; pagina++) {
        const { data } = await axios(`${API}/products`, { params: { category: slug, page: pagina } })
        const result = ProductosPaginadosAPIResponseSchema.safeParse(data)
        if(!result.success) break
        productos.push(...result.data.data)
        if(!result.data.next_page_url || result.data.current_page >= result.data.last_page) break
    }
    return productos
}

//mostrar los detalles de un producto (el ERP lo identifica por slug)
export async function getProductoBySlug(slug: string){
    const { data } = await axios(`${API}/products/${encodeURIComponent(slug)}`)
    const result = ProductoSchema.safeParse(data)

    if(result.success){
        return result.data
    }
}

async function getPagina(url: string){
    const { data } = await axios(url)
    const result = ProductosPaginadosAPIResponseSchema.safeParse(data)

    if(result.success){
        return result.data.data
    }
}
