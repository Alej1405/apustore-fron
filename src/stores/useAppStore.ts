import { create } from "zustand"
import { ColeccionSliceType, createColeccionesSlice } from "./coleccionSlice"
import { devtools } from 'zustand/middleware'
import { KartSliceType , createKartSlice } from "./kartSlice"
import { NotificationSliceType , createNotificationSlice } from "./notificationSlice"
import { CmsSliceType, createCmsSlice } from "./cmsSlice"

export const useAppStore = create<ColeccionSliceType & KartSliceType & NotificationSliceType & CmsSliceType>()(devtools ( 
    (...a) => ({
    ...createColeccionesSlice(...a),
    ...createKartSlice(...a),
    ...createNotificationSlice(...a),
    ...createCmsSlice(...a),
})))
