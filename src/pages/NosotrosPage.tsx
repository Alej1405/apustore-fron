import Meta from "../components/Meta"
import Compartir from "../components/Compartir"
import { useAppStore } from "../stores/useAppStore"
import { nosotrosRespaldo } from "../data/respaldo"
import { mediaUrl } from "../utils/formato"

//mision, vision y objetivos vienen en ese orden en por_que_nosotros
const ETIQUETAS = ['misión', 'visión', 'objetivos']

export default function NosotrosPage() {
  const nosotros = useAppStore((state) => state.nosotros) ?? nosotrosRespaldo

  return (
    <>
      <Meta ruta="/nosotros" descripcion={nosotros.descripcion} imagen={nosotros.imagen ? mediaUrl(nosotros.imagen) : undefined} />
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-7xl animate-revelar">{nosotros.titulo}</h1>
          <Compartir ruta="/nosotros" titulo={nosotros.titulo} />
        </div>
        {nosotros.imagen && <img src={mediaUrl(nosotros.imagen)} alt="" className="mt-6 aspect-[16/7] w-full rounded-3xl object-cover animate-subir" />}
        {nosotros.descripcion && <p className="mt-6 max-w-2xl text-lg text-papel/85 animate-subir [animation-delay:120ms]">{nosotros.descripcion}</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {nosotros.por_que_nosotros.map((texto, i) => (
            <section key={ETIQUETAS[i] ?? texto} className="rounded-3xl bg-white/85 p-6 text-bosque animate-subir" style={{ animationDelay: `${200 + i * 80}ms` }}>
              {ETIQUETAS[i] && <h2 className="font-display text-xl font-extrabold capitalize text-helecho">{ETIQUETAS[i]}</h2>}
              <p className="mt-2 text-sm leading-relaxed">{texto}</p>
            </section>
          ))}
        </div>
        {nosotros.caracteristicas.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {nosotros.caracteristicas.map((c) => <li key={c} className="rounded-full bg-hoja/20 px-4 py-1.5 text-sm font-semibold text-hoja">{c}</li>)}
          </ul>
        )}
      </div>
    </>
  )
}
