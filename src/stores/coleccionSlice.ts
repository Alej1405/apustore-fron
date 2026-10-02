import { StateCreator } from "zustand"
import { getColecciones, getProductos, getProductosByColeccion, getProductoBySlug } from "../services/ColeccionService"
import type { Colecciones, Productos, Producto } from "../types"
import { coleccionesRespaldo, productosRespaldo } from "../data/respaldo"

export type ColeccionSliceType ={
    colecciones: Colecciones
    productos: Productos
    producto: Producto
    modal: boolean

    fetchColecciones: () => Promise<void>
    fetchProducto: () => Promise<void>
    selectColeccion: (slug: string) => Promise<void>
    selectProducto: (slug: string) => Promise<void>
    closeModal: () => void
}


export const createColeccionesSlice : StateCreator<ColeccionSliceType> = (set) =>({
    
    colecciones: [],
    productos: [],
    producto: {} as Producto,
    modal: false,

    fetchColecciones: async () => {
        const api = await getColecciones().catch(() => undefined)
        //sin colecciones en el ERP se muestra el catalogo de muestra
        const colecciones = api?.length ? api : coleccionesRespaldo
        set({
            colecciones
        })
    },

    fetchProducto: async ()=>{
        const api = await getProductos().catch(() => undefined)
        const productos = api?.length ? api : productosRespaldo
        set({
            productos
        })
    },
    
    selectColeccion: async (slug: string) => {
        const api = await getProductosByColeccion(slug).catch(() => [])
        const productos = api.length ? api : productosRespaldo.filter((p) => p.store_category?.slug === slug)
        set({
            productos
        })
    },
    
    selectProducto: async (slug: string)=>{
        const producto = await getProductoBySlug(slug).catch(() => undefined) ?? productosRespaldo.find((p) => p.slug === slug)
        if(!producto) return
        set({
            producto,
            modal: true
        })
        
    },

    closeModal: () => {
        set({
            modal:false,
            producto: {} as Producto
        })
    },
})
