import { Link } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ColecionProps {
        coleccion: {
        id: number
        name: string
        descripcion: string
        imagen: string
        }
    }

    const Colecion: React.FC<ColecionProps> = ({ coleccion }) => {

        // Convertir URL relativa a absoluta si es necesario
            const imageUrl = coleccion.imagen.startsWith('http') ? coleccion.imagen : `https://app.apustore-ec.com/storage/colect/${coleccion.imagen}`
            const id_coleccion = coleccion.id

            return (
                <div className="bg-red-900/50 backdrop-blur-sm my-3 mx-3 rounded-lg space-y-5 pb-4 md:w-full md:w-max-1/3 inline-block mt-5 pt-5">
                    <div>
                        <h2 className="uppercase text-center text-white font-semibold mt-3 mb-3">
                            {coleccion.name}
                        </h2>
                    <div className="w-11/12 m-auto mt-4 overflow-hidden">
                            <LazyLoadImage
                                src={imageUrl}
                                alt={coleccion.name}
                                className="hover:scale-125 hover:rotate-2 transition-transform"
                                effect="blur"
                                placeholderSrc="vite.svg"
                            />
                    </div>
                    </div>
                    <div className="mx-6">
                        <div>
                            <p className="text-sm text-slate-200 font-light mb-3">
                                {coleccion.descripcion}
                            </p>
                        </div>
                    <div className="mt-3 mb-5">
                        <span className="text-white uppercase text-xs">
                        Unidades en esta coleccion <span className="text-white text-sm font-semibold left-4">
                        14 Unidades</span>
                        </span>
                    </div>
                    <Link
                        to={`/coleccion/productos/${id_coleccion}`}
                        className="uppercase rounded-lg bg-green-900/50 hover:bg-red-900 text-white text-xs p-3 mt-6 transition-colors">
                        ver todos los productos
                    </Link>
                    </div>
                </div>
            )
        }
        
        export default Colecion
