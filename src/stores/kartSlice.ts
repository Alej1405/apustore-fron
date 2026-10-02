import { ProductoKartSelecct } from './../types/index';
import { StateCreator } from "zustand"; 
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';
import { CmsSliceType } from './cmsSlice';
import { contactoRespaldo } from '../data/respaldo';
import { formatPrecio, whatsappLink } from '../utils/formato';

export type KartSliceType ={
    kart: ProductoKartSelecct []
    handleKart: (producto: ProductoKartSelecct) => void
    kartExist: (id: ProductoKartSelecct['id']) => boolean
    kartCount: () => number
    laodFromStorage: () => void
    clearKart: () => void
    sendKartWhatsapp: () => void
}

//arma el mensaje del pedido: una linea por producto con su color y talla
function mensajePedido(kart: ProductoKartSelecct[]){
    const lineas = kart.map((p) => {
        const detalle = [p.color && `color ${p.color}`, p.size && `talla ${p.size}`].filter(Boolean).join(', ')
        return `• ${p.nombre} (${formatPrecio(p.precio_venta)})${detalle ? ` — ${detalle}` : ''}`
    })
    return `Hola Apustore, quiero hacer este pedido:\n${lineas.join('\n')}`
}

export const createKartSlice : StateCreator<KartSliceType & NotificationSliceType & CmsSliceType, [], [], KartSliceType> = (set, get, api) => ({
    kart: [],
    handleKart: (producto) => {
        if(get().kartExist(producto.id)){
            set((state) => ({
                kart: state.kart.filter( kart => kart.id !== producto.id)
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Producto eliminado correctamente',
                error: false})
        }else{
            set((state) => ({
                kart: [...state.kart, producto]
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Producto agregado correctamente',
                error: false})
        }
        localStorage.setItem('kart', JSON.stringify(get().kart))
    },

    kartExist: (id)=>{
        return get().kart.some(prod => prod.id === id)
    },

    kartCount: ()=> {
        return get().kart.length
    },

    laodFromStorage: ()=>{
        const storeKart = localStorage.getItem('kart')
        if(storeKart){
            //el carrito guardado con la version anterior no tiene slug: se descarta
            const kart = (JSON.parse(storeKart) as ProductoKartSelecct[]).filter((p) => p.slug)
            set({ kart })
        }
    },

    clearKart: () => {
        set({ kart: [] });
        localStorage.removeItem('kart');
    },

    //envia el pedido por whatsapp al numero del CMS (o al del respaldo)
    sendKartWhatsapp: () => {
        const numero = get().contacto?.whatsapp ?? contactoRespaldo.whatsapp
        window.open(whatsappLink(numero, mensajePedido(get().kart)), '_blank', 'noopener')
        createNotificationSlice(set, get, api).showNotification({ 
            text: 'Te llevamos a WhatsApp para confirmar tu pedido',
            error: false
        });
        get().clearKart();
    }
})
