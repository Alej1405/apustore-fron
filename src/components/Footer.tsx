import { useAppStore } from "../stores/useAppStore"
import { contactoRespaldo, nosotrosRespaldo } from "../data/respaldo"
import { whatsappLink } from "../utils/formato"
import { useLogo } from "../hooks/useLogo"

export default function Footer(){
    const contacto = useAppStore((state) => state.contacto) ?? contactoRespaldo
    const nosotros = useAppStore((state) => state.nosotros) ?? nosotrosRespaldo
    const logo = useLogo()
    const [mision] = nosotros.por_que_nosotros

    const enlaces = [
        contacto.whatsapp && { href: whatsappLink(contacto.whatsapp, 'Hola Apustore'), icono: 'ri-whatsapp-line', texto: contacto.whatsapp, externo: true },
        contacto.telefono && { href: `tel:${contacto.telefono}`, icono: 'ri-phone-line', texto: contacto.telefono },
        contacto.email && { href: `mailto:${contacto.email}`, icono: 'ri-mail-line', texto: contacto.email },
        contacto.redes.facebook && { href: contacto.redes.facebook, icono: 'ri-facebook-circle-line', texto: 'Apu Store', externo: true },
        contacto.redes.instagram && { href: contacto.redes.instagram, icono: 'ri-instagram-line', texto: '@apustore', externo: true },
    ].filter((e): e is { href: string, icono: string, texto: string, externo?: boolean } => Boolean(e))

    return(
        <footer className="mt-12 bg-bosque/95 text-papel backdrop-blur">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
                <div>
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="" className="size-12" />
                        <span className="font-display text-xl font-bold">Apu Store</span>
                    </div>
                    {mision && <p className="mt-4 max-w-sm text-sm leading-relaxed text-papel/70">{mision}</p>}
                </div>
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-hoja">Estamos cerca de ti</h2>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {enlaces.map((e) => (
                            <li key={e.href}>
                                <a href={e.href} {...(e.externo ? { target: '_blank', rel: 'noopener' } : {})} className="inline-flex items-center gap-2 text-papel/80 transition-colors hover:text-hoja">
                                    <i className={`${e.icono} text-base text-hoja`} aria-hidden="true"></i> {e.texto}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-hoja">Matriz</h2>
                    <p className="mt-4 text-sm text-papel/80">{contacto.direccion}</p>
                    {contacto.mapa_embed && (
                        <iframe
                            src={contacto.mapa_embed}
                            title="Ubicación de Apustore"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="mt-3 h-36 w-full rounded-2xl border-0 grayscale-[30%]"
                        />
                    )}
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-4 text-xs text-papel/50 md:flex-row md:px-8">
                    <p>© {new Date().getFullYear()} Apustore · Todos los derechos reservados</p>
                    <a href="https://mashaec.net" target="_blank" rel="noopener" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                        Desarrollado por <img src="/footer.svg" alt="Mashacorp" className="h-5" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
