
import { z } from "zod"

export const ColeccionesAPIResponseSchema = z.array(z.object({
    id: z.number(),
    name: z.string(),
    descripcion: z.string(),
    imagen: z.string(),
    public: z.number(),
}))

export const ProductosAPIResponseSchema = z.array(z.object({
    id: z.number(),
    name: z.string(),
    precio: z.string(),
    descripcion: z.string(),
    stock: z.string(),
    imagen: z.string(),
}))

export const ProductoKartSelecct = z.object({
    id: z.number(),
    name: z.string(),
    precio: z.string(),
    descripcion: z.string(),
    stock: z.string(),
    imagen: z.string(),
    color: z.string(),
    size: z.string()
})
