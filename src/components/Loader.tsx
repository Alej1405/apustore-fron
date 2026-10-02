import { useEffect, useState } from "react"
import { useAppStore } from "../stores/useAppStore"
import { useLogo } from "../hooks/useLogo"

//tiempo minimo en pantalla: menos se lee como un parpadeo
const MINIMO_MS = 900

//pantalla de entrada: el logo cae como un sello mientras llega el contenido del ERP
export default function Loader() {
    const cmsListo = useAppStore((state) => state.cmsListo)
    const logo = useLogo()
    const [minimoCumplido, setMinimoCumplido] = useState(false)
    const [montado, setMontado] = useState(true)
    const saliendo = cmsListo && minimoCumplido

    useEffect(() => {
        const t = setTimeout(() => setMinimoCumplido(true), MINIMO_MS)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        if (!saliendo) return
        const t = setTimeout(() => setMontado(false), 450)
        return () => clearTimeout(t)
    }, [saliendo])

    if (!montado) return null

    return (
        <div
            role="status"
            aria-label="Cargando Apustore"
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-bosque transition-[opacity,filter] duration-[450ms] ease-salida ${saliendo ? 'pointer-events-none opacity-0 blur-sm' : 'opacity-100'}`}
        >
            <div className="animate-sello">
                <img src={logo} alt="" className="size-28 animate-latido [animation-delay:900ms]" />
            </div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-hoja animate-subir [animation-delay:300ms]">
                Viste natural
            </p>
            <div className="h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
                <div className={`h-full rounded-full bg-apu transition-[width] duration-700 ease-salida ${cmsListo ? 'w-full' : 'w-1/3'}`} />
            </div>
        </div>
    )
}

//carga de una pagina (rutas lazy): discreta, sin tapar la navegacion
export function CargandoPagina() {
    const logo = useLogo()
    return (
        <div role="status" aria-label="Cargando" className="flex min-h-[50vh] items-center justify-center">
            <img src={logo} alt="" className="size-14 animate-latido opacity-80" />
        </div>
    )
}
