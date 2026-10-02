import {Link} from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import { heroRespaldo } from "../data/respaldo"
import { mediaUrl } from "../utils/formato"
import { useLogo } from "../hooks/useLogo"
import Compartir from "./Compartir"

//momento de entrada del sitio: el titulo se revela como tinta, el logo cae como sello
export default function Hero(){
    const hero = useAppStore((state) => state.hero) ?? heroRespaldo
    const logo = useLogo()

    return(
        <main className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-6 md:min-h-[calc(100dvh-4rem)] md:grid-cols-[minmax(0,26rem)_1fr] md:gap-12 md:px-8">
            <div className="relative rounded-3xl bg-white/45 p-6 text-bosque shadow-[0_20px_60px_-20px_rgba(5,46,22,0.6)] backdrop-blur-lg md:p-8">
                <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em] md:text-6xl animate-revelar [animation-delay:200ms]">
                    {hero.titulo}
                </h1>
                {hero.subtitulo && (
                    <h2 className="mt-4 text-xl font-light leading-snug md:text-2xl animate-subir [animation-delay:450ms]">
                        {hero.subtitulo}
                    </h2>
                )}
                {hero.descripcion && (
                    <p className="mt-3 max-w-prose text-sm font-semibold text-helecho animate-subir [animation-delay:550ms]">
                        {hero.descripcion}
                    </p>
                )}
                <div className="mt-6 flex items-center gap-3 animate-subir [animation-delay:650ms]">
                    <Link
                        to={hero.cta_url ?? '/colecciones'} 
                        className="presionable inline-flex items-center gap-2 rounded-full bg-bosque px-7 py-3 font-semibold text-hoja hover:bg-musgo">
                        {hero.cta_texto ?? 'Compra aquí'}
                        <i className="ri-arrow-right-line" aria-hidden="true"></i>
                    </Link>
                    <Compartir ruta="/" titulo={hero.titulo} oscuro />
                </div>
                <div className="absolute -right-2 -top-5 animate-sello [animation-delay:700ms] md:-right-8 md:-top-8">
                    <img src={logo} alt="" className="size-16 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] md:size-24" />
                </div>
            </div>
            <div className="animate-subir [animation-delay:350ms]">
                <img
                    src={mediaUrl(hero.imagen ?? heroRespaldo.imagen)}
                    alt={hero.titulo}
                    className="mx-auto w-full max-w-[17rem] drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] md:max-w-xl"
                />
            </div>
        </main>
    )
}
