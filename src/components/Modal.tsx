import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { ProductoKartSelecct } from '../types';


export default function Modal() {

    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state)=> state.closeModal)
    const producto = useAppStore((state)=> state.producto)
    const hadleKart = useAppStore((state)=> state.handleKart)
    const kartExist = useAppStore((state)=> state.kartExist)


    const imageUrl = producto?.imagen?.startsWith('http') ? producto.imagen : producto?.imagen  ? `https://app.apustore-ec.com/storage/productos/${producto.imagen}` : 'https://app.apustore-ec.com/storage/productos/default.png';

    const [selectedColor, setSelectedColor] = useState<string>('');
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
        };

    const [selectedSize, setSelectedSize] = useState<string>('');
    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSize(event.target.value);
    };

    const colors = [
        { name: 'blanco', class: 'bg-white' },
        { name: 'negro', class: 'bg-black' },
        { name: 'rojo', class: 'bg-red-500' },
        { name: 'tomate', class: 'bg-red-700' },
        { name: 'amarillo', class: 'bg-yellow-500' },
        { name: 'verde-oliva', class: 'bg-green-700' }
    ];

    const sizes = [
        { name: 'S', class: 'bg-gray-400' },
        { name: 'M', class: 'bg-gray-400' },
        { name: 'L', class: 'bg-gray-400' },
        { name: 'XL', class: 'bg-gray-400' }
    ];

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                                >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-100/90 backdrop-blur-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                                    <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {producto.name} 
                                    </Dialog.Title>
                                        <small className="text-xs">
                                            Anetes de agregar, selecciona el color y la talla
                                        </small>
                                        <img
                                            src={imageUrl}
                                            className="md:w-5/6 m-auto"
                                            alt={producto.name}
                                        />
                                    <div className="grid md:grid-cols-2 grid-rows-1 justify-center items-center gap-4">
                                        <div>
                                            <Dialog.Title as="h3" className="text-gray-900 md:text-xl text-s font-extrabold my-3">
                                                Precio <span className='text-gray-500 font-black'>
                                                            $ {producto.precio}.00
                                                        </span>
                                            </Dialog.Title>
                                                
                                            <Dialog.Title as="h3" className="text-gray-900 md:text-1xl text-s font-extrabold uppercase">
                                                detalle
                                            </Dialog.Title>
                                                <p className="text-gray-500 text-xs indent-3 mb-8">
                                                    {producto.descripcion}
                                                </p>
                                        </div>
                                        <div>
                                            <div>
                                                <div>
                                                    <p className="block md:text-sm text-xs font-medium text-gray-700 mb-2">
                                                        Que talla eres...?
                                                    </p>
                                                    <div className="flex gap-2">
                                                        {sizes.map((size) => (
                                                            <div key={size.name} className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    id={size.name}
                                                                    name="size"
                                                                    value={size.name}
                                                                    checked={selectedSize === size.name}
                                                                    onChange={handleSizeChange}
                                                                    className="hidden"
                                                                />
                                                                <label
                                                                    htmlFor={size.name}
                                                                    className={`block w-6 h-6 rounded-full cursor-pointer text-center items-center justify-center text-white text-s ${size.class} ${
                                                                    selectedSize === size.name ? 'ring-2 ring-offset-2 ring-black' : ''
                                                                    }`}
                                                                    >
                                                                    {size.name}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="gap-3 my-4">
                                                    <p className="block md:text-sm text-xs font-medium text-gray-700 mb-2">
                                                        Elige un color:
                                                    </p>
                                                    <div className="flex gap-2">
                                                        {(colors).map((color) => (
                                                            <div key={color.name} className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    id={color.name}
                                                                    name="color"
                                                                    value={color.name}
                                                                    checked={selectedColor === color.name}
                                                                    onChange={handleColorChange}
                                                                    className="hidden"
                                                                />
                                                                <label
                                                                    htmlFor={color.name}
                                                                    className={`block w-6 h-6 rounded-full cursor-pointer ${color.class} ${
                                                                    selectedColor === color.name ? 'ring-2 ring-offset-2 ring-black' : ''
                                                                    }`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 grid-rows-1 gap-3 w-full">
                                        <div className="w-full">
                                            <button
                                                onClick={()=> {
                                                    hadleKart({...producto, color: selectedColor, size: selectedSize} as ProductoKartSelecct)
                                                    closeModal()
                                                }}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-green-700 p-2 text-base font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 w-full focus:ring-green-600 focus:ring-offset-2 sm:text-xs"
                                                >
                                                    <i className='ri-shopping-cart-fill mx-2'></i>
                                                    {kartExist(producto.id) ?"Eliminar":"Agregar"}
                                            </button>
                                        </div>
                                        <div className="w-full">
                                            <button
                                                onClick={closeModal}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-700 p-2 text-base font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 w-full focus:ring-red-600 focus:ring-offset-2 sm:text-xs bottom-0"
                                                >
                                                    <i className="ri-logout-box-fill mx-2"></i> Cerrar
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                    
                </Dialog>
            </Transition>
        </>
    )
}