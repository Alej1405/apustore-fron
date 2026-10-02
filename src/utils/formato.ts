import type { Producto } from "../types"

const STORAGE = import.meta.env.VITE_ERP_STORAGE_URL

//ruta relativa del ERP ("store/products/x.png") -> url absoluta; las absolutas pasan tal cual
export function mediaUrl(path?: string | null){
    if(!path) return '/vite.svg'
    if(/^https?:\/\//i.test(path) || path.startsWith('/')) return path
    return `${STORAGE}/${path}`
}

//imagen principal del producto (o la primera)
export function imagenProducto(producto: Producto){
    const principal = producto.imagenes.find((img) => img.es_principal) ?? producto.imagenes[0]
    return mediaUrl(principal?.path)
}

//"12.9900" -> "$12.99"
export function formatPrecio(precio: string){
    const valor = Number.parseFloat(precio)
    return Number.isFinite(valor) ? `$${valor.toFixed(2)}` : ''
}

//enlace de whatsapp a partir de un celular ecuatoriano ("0960154992" -> 593960154992)
export function whatsappLink(numero: string | null | undefined, mensaje: string){
    const digitos = (numero ?? '').replace(/\D/g, '')
    const internacional = digitos.startsWith('0') ? `593${digitos.slice(1)}` : digitos
    return `https://wa.me/${internacional}?text=${encodeURIComponent(mensaje)}`
}
