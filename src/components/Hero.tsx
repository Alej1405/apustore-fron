import {Link} from "react-router-dom"
export default function Hero(){
    return(
        <main>
            <div className=" md:grid-cols-2">
                <div className=" flex flex-col rounded-lg md:w-2/6 md:h-1/2 md:mx-24 mx-4 my-8 px-8 py-6 bg-white/40 backdrop-blur-lg hover:bg-white/60 transition-all"> 
                    <h1 className="text-5xl uppercase font-extrabold text-green-950 my-3 text-center">
                        Viste Natural
                    </h1>
                    <div className="mx-2 my-3">
                        <img src="hero1.svg" alt="" />
                    </div>
                    <h2 className="text-2xl font-thin text-left my-2">
                        Tienda Online de Ropa Ecológica y Sustentable
                    </h2>
                    <p className="text-sm m-">
                        Viste con estilo mientras cuidas del planeta. 
                        <br />
                        <span className="text-green-800 text-xs font-semibold">
                            ¡Descubre la moda sostenible que conecta contigo y con la naturaleza!
                        </span>
                    </p>
                    <div className="flex items-center justify-end mr-2 my-6">
                        <img src="vite.svg" alt="" className="w-1/6 mx-2" />
                        <span className="uppercase text-green-950 font-bold text-2xl">
                            apustore
                        </span>
                    </div>
                    <Link
                        to="/colecciones" 
                        className="m-auto bg-green-950 text-green-300 px-12 py-2 rounded-md my-4">
                        Compra aqui...!!!
                    </Link>
                </div>
            </div>
        
        </main>
    )
}