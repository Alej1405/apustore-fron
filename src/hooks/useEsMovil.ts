import { useSyncExternalStore } from "react"

//firma mashacorp: en el celular no se adapta la web, se renderiza otra experiencia (tipo app)
const consulta = '(max-width: 767px)'

function suscribir(avisar: () => void) {
    const mq = window.matchMedia(consulta)
    mq.addEventListener('change', avisar)
    return () => mq.removeEventListener('change', avisar)
}

export function useEsMovil() {
    return useSyncExternalStore(suscribir, () => window.matchMedia(consulta).matches, () => false)
}
