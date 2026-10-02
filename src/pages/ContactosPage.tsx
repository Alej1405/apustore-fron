import Meta from "../components/Meta"
import Compartir from "../components/Compartir"
import { useAppStore } from "../stores/useAppStore"
import { contactoRespaldo } from "../data/respaldo"
import { whatsappLink } from "../utils/formato"

export default function ContactosPage() {
  const contacto = useAppStore((state) => state.contacto) ?? contactoRespaldo

  const canales = [
    contacto.whatsapp && { href: whatsappLink(contacto.whatsapp, 'Hola Apustore'), icono: 'ri-whatsapp-line', titulo: 'WhatsApp', detalle: contacto.whatsapp, externo: true },
    contacto.telefono && { href: `tel:${contacto.telefono}`, icono: 'ri-phone-line', titulo: 'Llámanos', detalle: contacto.telefono },
    contacto.email && { href: `mailto:${contacto.email}`, icono: 'ri-mail-line', titulo: 'Correo', detalle: contacto.email },
    contacto.redes.instagram && { href: contacto.redes.instagram, icono: 'ri-instagram-line', titulo: 'Instagram', detalle: '@apustore', externo: true },
    contacto.redes.facebook && { href: contacto.redes.facebook, icono: 'ri-facebook-circle-line', titulo: 'Facebook', detalle: 'Apu Store', externo: true },
  ].filter((c): c is { href: string, icono: string, titulo: string, detalle: string, externo?: boolean } => Boolean(c))

  return (
    <>
      <Meta ruta="/contactos" />
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-14">
        <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white md:text-7xl animate-revelar">Contactos</h1>
        <p className="mt-3 max-w-xl text-papel/85">
          Estamos cerca de ti, te ayudamos en todo lo que requieras. Recuerda que también personalizamos tus diseños.
        </p>
        <div className="mt-3"><Compartir ruta="/contactos" titulo="Contactos de Apustore" /></div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ul className="grid gap-3">
            {canales.map((c, i) => (
              <li key={c.href} className="animate-subir" style={{ animationDelay: `${i * 60}ms` }}>
                <a href={c.href} {...(c.externo ? { target: '_blank', rel: 'noopener' } : {})} className="presionable flex items-center gap-4 rounded-2xl bg-white/90 p-4 text-bosque hover:bg-white">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-bosque text-xl text-hoja"><i className={c.icono} aria-hidden="true"></i></span>
                  <span className="min-w-0">
                    <span className="block font-display font-bold">{c.titulo}</span>
                    <span className="block truncate text-sm text-bosque/70">{c.detalle}</span>
                  </span>
                  <i className="ri-arrow-right-up-line ml-auto text-bosque/40" aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>
          {contacto.mapa_embed && (
            <div className="overflow-hidden rounded-3xl bg-white/10 animate-subir [animation-delay:200ms]">
              <iframe src={contacto.mapa_embed} title="Ubicación de Apustore" className="h-80 w-full border-0 md:h-full md:min-h-96" loading="lazy"></iframe>
              {contacto.direccion && <p className="px-4 py-3 text-sm text-papel/80"><i className="ri-map-pin-line text-hoja" aria-hidden="true"></i> {contacto.direccion}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
