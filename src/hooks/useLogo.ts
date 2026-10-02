import { useAppStore } from "../stores/useAppStore"

//logo de la empresa: el svg que se sube en el ERP, o el del sitio si la api no responde
export function useLogo() {
    return useAppStore((state) => state.logo) ?? '/vite.svg'
}
