import { Helmet } from "react-helmet-async"
import seo from "../data/seo.json"

//meta tags de una pagina: titulo, descripcion y open graph propios
//google los lee aqui; whatsapp y facebook no ejecutan JS y los leen del prerender

type MetaProps = {
    //ruta de una pagina fija de seo.json ("/nosotros")
    ruta?: string
    //o los datos de una pagina dinamica (coleccion, producto)
    titulo?: string
    descripcion?: string | null
    imagen?: string
    url?: string
}

export default function Meta({ ruta, titulo, descripcion, imagen, url }: MetaProps) {
    const pagina = seo.paginas.find((p) => p.ruta === ruta)
    const tituloFinal = titulo ? `${titulo} | ${seo.nombre}` : pagina?.titulo ?? seo.nombre
    const tituloCorto = titulo ?? pagina?.tituloCorto ?? seo.nombre
    const descripcionFinal = descripcion ?? pagina?.descripcion ?? ''
    const urlFinal = `${seo.sitio}${url ?? ruta ?? ''}`
    const imagenFinal = imagen?.startsWith('http') ? imagen : `${seo.sitio}${imagen ?? seo.imagen}`

    return (
        <Helmet>
            <title>{tituloFinal}</title>
            <meta name="description" content={descripcionFinal} />
            <link rel="canonical" href={urlFinal} />
            <meta property="og:title" content={tituloCorto} />
            <meta property="og:description" content={descripcionFinal} />
            <meta property="og:image" content={imagenFinal} />
            <meta property="og:url" content={urlFinal} />
            <meta property="twitter:title" content={tituloCorto} />
            <meta property="twitter:description" content={descripcionFinal} />
            <meta property="twitter:image" content={imagenFinal} />
        </Helmet>
    )
}
