import { z } from 'zod'
import { ColeccionesAPIResponseSchema, ProductosAPIResponseSchema, ProductoKartSelecct } from '../utils/colecciones-schema'

export type Colecciones = z.infer<typeof ColeccionesAPIResponseSchema>
export type Productos = z.infer<typeof ProductosAPIResponseSchema>
export type Producto = Productos[0]
export type ProductoKartSelecct = z.infer<typeof ProductoKartSelecct>