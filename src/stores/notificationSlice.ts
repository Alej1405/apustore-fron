import { StateCreator } from "zustand"; 
import { KartSliceType } from "./kartSlice";

type Notification ={
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceType = {
    notificacion: Notification
    showNotification: (payload: Pick <Notification, 'text' | 'error' >) => void
    hiddeNotificaction: () => void
}

export const createNotificationSlice : StateCreator<NotificationSliceType & KartSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notificacion: {
        text: '',
        error: false,
        show: false
    },

    showNotification: (payload) => {
        set({
            notificacion:{
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hiddeNotificaction()
        }, 3000)
    },

    hiddeNotificaction: () => {
        set({
            notificacion: {
                text: '',
                error: false,
                show: false
            },
        })
    }
})