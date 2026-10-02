import { z } from 'zod'
import { ProductoSchema, ProductoKartSelecct, type ColeccionAPI } from '../utils/colecciones-schema'
import { HeroAPIResponseSchema, NosotrosAPIResponseSchema, ContactoAPIResponseSchema } from '../utils/cms-schema'

export type Coleccion = ColeccionAPI
export type Colecciones = ColeccionAPI[]
export type Producto = z.infer<typeof ProductoSchema>
export type Productos = Producto[]
export type ProductoKartSelecct = z.infer<typeof ProductoKartSelecct>

export type Hero = z.infer<typeof HeroAPIResponseSchema>
export type Nosotros = z.infer<typeof NosotrosAPIResponseSchema>
export type Contacto = z.infer<typeof ContactoAPIResponseSchema>
