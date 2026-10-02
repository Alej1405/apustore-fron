import { useState } from "react"
import seo from "../data/seo.json"

//boton para compartir un bloque con su propia url (y su propio open graph)
//oscuro: para usarlo sobre fondo claro
export default function Compartir({ ruta, titulo, oscuro = false }: { ruta: string, titulo: string, oscuro?: boolean }) {
    const [copiado, setCopiado] = useState(false)
    const url = `${seo.sitio}${ruta}`

    const compartir = async () => {
        if (navigator.share) {
            await navigator.share({ title: titulo, url }).catch(() => {})
            return
        }
        await navigator.clipboard.writeText(url)
        setCopiado(true)
        setTimeout(() => setCopiado(false), 2000)
    }

    return (
        <button
            type="button"
            onClick={compartir}
            className={`presionable inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${oscuro ? 'bg-bosque/10 text-bosque hover:bg-bosque/20' : 'bg-white/15 text-white backdrop-blur hover:bg-white/25'}`}
            aria-label={`Compartir ${titulo}`}
        >
            <i className={copiado ? "ri-check-line" : "ri-share-forward-line"} aria-hidden="true"></i>
            {copiado ? 'Enlace copiado' : 'Compartir'}
        </button>
    )
}
