import axios from "axios"
import { TodoAPIResponseSchema } from "../utils/cms-schema"

//CMS del ERP: https://erp.mashaec.net/api/cms/apustore
//el token es de solo lectura y queda dentro del bundle; solo vale para apustore
const API = import.meta.env.VITE_CMS_BASE_URL
const headers = { Authorization: `Bearer ${import.meta.env.VITE_CMS_TOKEN}`, Accept: 'application/json' }

//todo el contenido en una sola llamada (/all); si la api falla devuelve null y la pagina usa el respaldo
export async function getContenido(){
    try {
        const { data } = await axios(`${API}/all`, { headers })
        const result = TodoAPIResponseSchema.safeParse(data)
        return result.success ? result.data : null
    } catch {
        return null
    }
}
