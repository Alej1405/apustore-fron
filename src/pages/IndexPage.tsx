import Hero from "../components/Hero"
import { Helmet } from "react-helmet-async"

export default function IndexPage() {
    return (
        <>
            <Helmet>
                <title>Inicio | Apustore</title>
                <meta property="og:title" content="Apustore Moda Sostenible" />
                <meta property="og:description" content="Apustore no solo es ropa, es un respiro a la naturaleza" />
                <meta property="og:image" content="https://apustore-ec.com/vite.svg" />
                <meta property="og:url" content="https://apustore-ec.com/" />
            </Helmet>
            <Hero />
        </>
    )
}
