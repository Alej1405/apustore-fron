import { useAppStore } from "../stores/useAppStore"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ProductoProps {
    producto: {
        id: number,
        name: string,
        precio: string,
        descripcion: string,
        stock: string,
        imagen: string
    }
}
const Producto: React.FC<ProductoProps> = ({ producto }) => {


    const selectProducto = useAppStore((state)=> state.selectProducto)

    // Convertir URL relativa a absoluta si es necesario
            const imageUrl = producto.imagen.startsWith('http') ? producto.imagen : `https://app.apustore-ec.com/storage/productos/${producto.imagen}`
    
    return (
        <div className="bg-green-900/50 backdrop-blur-sm rounded-lg m-2 p-4 hover:bg-green-700/50 transition-all">
            <div>
                <h3 className="uppercase text-white text-center text-lg text-semibold mt-2 mb-3 tracking-wider">
                    {producto.name}
                </h3>
                <div className="overflow-hidden">
                    <LazyLoadImage
                        src={imageUrl}
                        alt={producto.name}
                        className="hover:scale-125 hover:rotate-2 transition-transform"
                        effect="blur"
                    />
                </div>
                <div className="mt-2 text-white text-sm font-thin m-5">
                    <ul>
                        <li>
                            <span>Precio:</span> <span className="text-red-800 font-semibold tracking-wider text-md">${producto.precio},00</span>
                        </li>
                        <li className="font-semibold">
                            <span>Unidades en stock</span> <span>{producto.stock}</span>
                        </li>
                    </ul>
                    <div>
                        <small className="uppercase">
                            descripcion:
                        </small>
                        <p className=" text-xs">
                            {producto.descripcion}
                        </p>
                    </div>
                    <div className="my-3 flex flex-col md:flex-row gap-4 justify-between">
                        <button
                            type="button"
                            onClick={()=>selectProducto(producto.id)}
                            className="w-full bg-red-900/50 rounded-lg p-2 uppercase text-xs hover:bg-red-700/50 hover:font-normal transition-transform"
                            >
                            agregar <i className="ri-shopping-bag-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Producto