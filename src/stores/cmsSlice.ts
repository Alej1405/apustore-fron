import { StateCreator } from "zustand"
import { getContenido } from "../services/CmsService"
import type { Hero, Nosotros, Contacto } from "../types"

//contenido del CMS; null mientras no llega o si la api no responde (la pagina usa el respaldo)
export type CmsSliceType = {
    logo: string | null
    hero: Hero | null
    nosotros: Nosotros | null
    contacto: Contacto | null
    //true cuando la api respondio (o fallo): el loader ya puede salir
    cmsListo: boolean

    fetchCms: () => Promise<void>
}

export const createCmsSlice : StateCreator<CmsSliceType> = (set) => ({
    logo: null,
    hero: null,
    nosotros: null,
    contacto: null,
    cmsListo: false,

    fetchCms: async () => {
        const contenido = await getContenido()
        set({
            logo: contenido?.empresa?.logo ?? null,
            hero: contenido?.hero ?? null,
            nosotros: contenido?.nosotros ?? null,
            contacto: contenido?.contacto ?? null,
            cmsListo: true,
        })
    },
})
