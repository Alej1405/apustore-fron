import { ProductoKartSelecct } from './../types/index';
import { StateCreator } from "zustand"; 
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';
import emailjs from "@emailjs/browser"

export type KartSliceType ={
    kart: ProductoKartSelecct []
    handleKart: (producto: ProductoKartSelecct) => void
    kartExist: (id: ProductoKartSelecct['id']) => boolean
    kartCount: () => number
    laodFromStorage: () => void
    clearKart: () => void
    sendKartInfo: (phone: string, email: string) => Promise<void>
}

export const createKartSlice : StateCreator<KartSliceType & NotificationSliceType, [], [], KartSliceType> = (set, get, api) => ({
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
            set({
                kart:JSON.parse(storeKart)
            })
        }
    },

    clearKart: () => {
        set({ kart: [] });
        localStorage.removeItem('kart');
    },

    sendKartInfo: async (phone: string, email: string) => {
        const kart = get().kart;
        try {
            const templateParams = {
                phone,
                email,
                kart: JSON.stringify(kart, null, 2)
            };

            await emailjs.send(
                'service_2k37yko', // Reemplaza con tu Service ID
                'template_1fo4yuc', // Reemplaza con tu Template ID
                templateParams,
                'XYL0aFgXab9o0L49j' // Reemplaza con tu User ID
            );

            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Información del carrito enviada correctamente',
                error: false
            });
            // Limpiar el carrito y el localStorage
            get().clearKart();
        } catch (error) {
            if (error instanceof Error) {
                createNotificationSlice(set, get, api).showNotification({ 
                    text: `Error al enviar la información del carrito: ${error.message}`,
                    error: true
                });
            } else {
                createNotificationSlice(set, get, api).showNotification({ 
                    text: 'Error al enviar la información del carrito',
                    error: true
                });
            }
        }
    }


})