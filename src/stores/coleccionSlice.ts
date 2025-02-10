import { StateCreator } from "zustand"
import { getColecciones, getProductos, getProductosByColeccion, getProductoById } from "../services/ColeccionService"
import type { Colecciones, Productos, Producto } from "../types"

export type ColeccionSliceType ={
    colecciones: Colecciones
    productos: Productos
    producto: Producto
    modal: boolean

    fetchColecciones: () => Promise<void>
    fetchProducto: () => Promise<void>
    selectColeccion: (id: number) => Promise<void>
    selectProducto: (id: number) => Promise<void>
    closeModal: () => void
}


export const createColeccionesSlice : StateCreator<ColeccionSliceType> = (set) =>({
    
    colecciones: [],
    productos: [],
    producto: {} as Producto,
    modal: false,

    fetchColecciones: async () => {
        const colecciones = await getColecciones()
        set({
            colecciones
        })
    },

    fetchProducto: async ()=>{
        const productos = await getProductos()
        set({
            productos
        })
    },
    
    selectColeccion: async (id: number) => {
        const productos = await getProductosByColeccion(id)
        set({
            productos
        })
    },
    
    selectProducto: async (id: number)=>{
        const producto = await getProductoById(id)
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