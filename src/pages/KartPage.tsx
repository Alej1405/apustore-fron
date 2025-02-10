import { Helmet } from "react-helmet"
import { Suspense, useState } from "react" 
import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"

//importar componentes
import Producto from "../components/Producto"
import Enviar from "../components/Enviar"

export default function KartPage() {

    const kart = useAppStore((state)=> state.kart)
    const hasKart = useMemo(()=> kart.length , [kart])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)


    return (
        <>
            <Helmet>
                <title>Carrito | Apustore</title>
            </Helmet>
            {/* titulo de la seccion */}
                <div className="bg-green-900/40 backdrop-blur-sm">
                <h1 className="text-center text-s md:text-3xl text-white mt-6 mb-4 font-black">
                    Confirma tu pedido.
                    <br />
                    <small className="text-white text-center text-lg font-thin">
                    Recuerda que la <span className="text-green-500 uppercase font-bold">moda sostenible</span> es tambien un forma de <span className="text-green-500 uppercase font-bold">cuidar el planeta</span>
                    </small>
                </h1>
                </div>

                {hasKart ? (
                    <Suspense fallback={"Cargando..."}>
                    <div className="grid md:grid-cols-3 grid-rows-1 gap-10 justify-center items-center p-4">
                        {kart.map((producto) => (
                            <Producto
                            key={producto.id}
                            producto={producto}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={openModal}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Confirmar Pedido
                        </button>
                    </div>
                    </Suspense>
                ):(
                    <p className="text-white font-black tracking-wider m-auto text-center"> 
                        No has agregado nada para comprar. 
                    </p>
                )}

                <Enviar isOpen={isModalOpen} closeModal={closeModal} />
        
        </>
    ) 
}
