import { z } from "zod"

//schemas de la api de ecommerce del ERP (publica, sin token)
//el ERP manda el precio como string decimal ("12.9900") y las imagenes con ruta relativa

const textoOpcional = z.string().nullish()
//el ERP a veces manda nombres con espacios sobrantes ("Camisetas ")
const textoLimpio = z.string().transform((s) => s.trim())

export type ColeccionAPI = {
    id: number
    nombre: string
    slug: string
    descripcion?: string | null
    imagen?: string | null
    products_count: number
    children: ColeccionAPI[]
}

//una coleccion es una categoria de la tienda, con sus subcategorias
export const ColeccionSchema: z.ZodType<ColeccionAPI, z.ZodTypeDef, unknown> = z.lazy(() =>
    z.object({
        id: z.number(),
        nombre: textoLimpio,
        slug: z.string(),
        descripcion: textoOpcional,
        imagen: textoOpcional,
        products_count: z.number().default(0),
        children: z.array(ColeccionSchema).default([]),
    }),
)

export const ColeccionesAPIResponseSchema = z.array(ColeccionSchema)

export const ProductoSchema = z.object({
    id: z.number(),
    nombre: textoLimpio,
    slug: z.string(),
    descripcion: textoOpcional,
    precio_venta: z.string().default('0'),
    destacado: z.boolean().default(false),
    caracteristicas: z.array(z.object({ texto: z.string() })).default([]),
    store_category: z.object({ id: z.number(), nombre: textoLimpio, slug: z.string() }).nullable().default(null),
    imagenes: z.array(z.object({
        id: z.number(),
        path: z.string(),
        es_principal: z.boolean().default(false),
        orden: z.number().default(0),
    })).default([]),
    meta_titulo: textoOpcional,
    meta_descripcion: textoOpcional,
})

export const ProductosAPIResponseSchema = z.array(ProductoSchema)

//respuesta paginada estilo laravel de /products
export const ProductosPaginadosAPIResponseSchema = z.object({
    data: ProductosAPIResponseSchema,
    current_page: z.number().default(1),
    last_page: z.number().default(1),
    next_page_url: z.string().nullable().default(null),
})

//producto en el carrito: lleva el color y la talla que eligio el cliente
export const ProductoKartSelecct = z.object({
    id: z.number(),
    nombre: z.string(),
    slug: z.string(),
    precio_venta: z.string(),
    imagen: z.string(),
    color: z.string(),
    size: z.string()
})
