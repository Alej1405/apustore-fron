import axios from "axios"
import { ColeccionesAPIResponseSchema, ProductosAPIResponseSchema } from "../utils/colecciones-schema"

//recupera todas las colecciones o los titulo que contienen productos
export async function getColecciones(){
    const url = 'https://app.apustore-ec.com/api/colecciones'
    const { data } = await axios(url)
    const result = ColeccionesAPIResponseSchema.safeParse(data)

    if(result.success){
        return result.data
    }
}

//recupera solo los productos que el administrador destaca o los llamados betcelers
export async function getProductos(){
    const url = 'https://app.apustore-ec.com/api/productos' //cambiar la api por la api definitiva
    const { data } = await axios(url)
    const result = ProductosAPIResponseSchema.safeParse(data)

    if(result.success){
        return result.data
    }
}

//recuperar los prodcutos de una sola coleccion
export async function getProductosByColeccion(id: number){
    const url = `https://app.apustore-ec.com/api/productos/coleccion/${id}` //cambiar la api por la api definitiva
    const { data } = await axios(url)
    const result = ProductosAPIResponseSchema.safeParse(data)

    if(result.success){
        return result.data
    }
}

//mostrar los detalles de un producto
export async function getProductoById(id: number){
    const url = `https://app.apustore-ec.com/api/productos/detalles/${id}`
    const { data } = await axios(url)
    const result = ProductosAPIResponseSchema.safeParse(data)
    
    if(result.success){
        return result.data[0]
    }
}