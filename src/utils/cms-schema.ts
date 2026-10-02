import { z } from "zod"

//schemas del CMS del ERP (con token). Sin contenido cargado el ERP responde {} o null

const textoOpcional = z.string().nullish()

export const HeroAPIResponseSchema = z.object({
    titulo: z.string(),
    subtitulo: textoOpcional,
    descripcion: textoOpcional,
    imagen: textoOpcional,
    cta_texto: textoOpcional,
    cta_url: textoOpcional,
})

export const NosotrosAPIResponseSchema = z.object({
    titulo: z.string(),
    descripcion: textoOpcional,
    imagen: textoOpcional,
    //mision, vision y objetivos, en ese orden
    por_que_nosotros: z.array(z.string()).default([]),
    caracteristicas: z.array(z.string()).default([]),
})

export const ContactoAPIResponseSchema = z.object({
    direccion: textoOpcional,
    telefono: textoOpcional,
    email: textoOpcional,
    whatsapp: textoOpcional,
    mapa_embed: textoOpcional,
    redes: z.object({
        facebook: textoOpcional,
        instagram: textoOpcional,
        tiktok: textoOpcional,
        youtube: textoOpcional,
    }).partial().default({}),
})

//respuesta de /all: todo el contenido en una sola llamada, con el logo de la empresa
export const TodoAPIResponseSchema = z.object({
    empresa: z.object({ nombre: z.string(), logo: textoOpcional }).nullish(),
    hero: HeroAPIResponseSchema.nullish(),
    nosotros: NosotrosAPIResponseSchema.nullish(),
    contacto: ContactoAPIResponseSchema.nullish(),
})
