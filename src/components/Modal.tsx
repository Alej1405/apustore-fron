import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { ProductoKartSelecct } from '../types';
import { contactoRespaldo } from '../data/respaldo';
import { formatPrecio, imagenProducto, whatsappLink } from '../utils/formato';
import { useEsMovil } from '../hooks/useEsMovil';

const colors = [
    { name: 'blanco', class: 'bg-white' },
    { name: 'negro', class: 'bg-black' },
    { name: 'rojo', class: 'bg-red-500' },
    { name: 'tomate', class: 'bg-red-700' },
    { name: 'amarillo', class: 'bg-yellow-500' },
    { name: 'verde-oliva', class: 'bg-green-700' }
];

const sizes = ['S', 'M', 'L', 'XL'];

//elegir talla y color antes de agregar. En el celular sube como una hoja desde abajo (tipo app)
export default function Modal() {

    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state)=> state.closeModal)
    const producto = useAppStore((state)=> state.producto)
    const hadleKart = useAppStore((state)=> state.handleKart)
    const kartExist = useAppStore((state)=> state.kartExist)
    const contacto = useAppStore((state)=> state.contacto) ?? contactoRespaldo
    const esMovil = useEsMovil()

    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');

    //el modal se monta vacio ({}) hasta que se elige un producto
    const imageUrl = producto.imagenes ? imagenProducto(producto) : '/vite.svg'
    const precio = producto.precio_venta ? formatPrecio(producto.precio_venta) : ''
    const yaEsta = kartExist(producto.id)
    const mensaje = `Hola Apustore, quiero pedir: ${producto.nombre} (${precio})${selectedSize ? `, talla ${selectedSize}` : ''}${selectedColor ? `, color ${selectedColor}` : ''}`

    const panel = esMovil
        ? { clase: 'fixed inset-x-0 bottom-0 max-h-[90dvh] overflow-y-auto rounded-t-3xl pb-[calc(1.5rem+env(safe-area-inset-bottom))]', desde: 'translate-y-full', hasta: 'translate-y-0' }
        : { clase: 'relative w-full max-w-3xl rounded-3xl', desde: 'opacity-0 scale-95', hasta: 'opacity-100 scale-100' }

    return (
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity duration-300 ease-salida" enterFrom="opacity-0" enterTo="opacity-100"
                        leave="transition-opacity duration-200 ease-salida" leaveFrom="opacity-100" leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center md:p-6">
                            <Transition.Child
                                as={Fragment}
                                enter="transition duration-[400ms] ease-cajon" enterFrom={panel.desde} enterTo={panel.hasta}
                                leave="transition duration-200 ease-salida" leaveFrom={panel.hasta} leaveTo={panel.desde}
                            >
                                <Dialog.Panel className={`${panel.clase} bg-papel p-5 text-bosque shadow-2xl md:grid md:grid-cols-2 md:gap-8 md:p-8`}>
                                    {esMovil && <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-bosque/20" aria-hidden="true" />}
                                    <img
                                        src={imageUrl}
                                        className="aspect-square w-full rounded-2xl bg-white object-cover"
                                        alt={producto.nombre}
                                    />
                                    <div className="mt-5 flex flex-col md:mt-0">
                                        <Dialog.Title as="h3" className="font-display text-3xl font-extrabold leading-tight">
                                            {producto.nombre}
                                        </Dialog.Title>
                                        <p className="mt-1 font-display text-2xl font-bold tabular-nums text-apu-oscuro">{precio}</p>
                                        {producto.descripcion && (
                                            <p className="mt-3 text-sm text-bosque/75">{producto.descripcion}</p>
                                        )}

                                        <fieldset className="mt-5">
                                            <legend className="mb-2 text-sm font-semibold">¿Qué talla eres?</legend>
                                            <div className="flex gap-2">
                                                {sizes.map((size) => (
                                                    <label key={size} className={`presionable grid size-11 cursor-pointer place-items-center rounded-full border text-sm font-semibold ${selectedSize === size ? 'border-bosque bg-bosque text-hoja' : 'border-bosque/20 bg-white hover:border-bosque/50'}`}>
                                                        <input type="radio" name="size" value={size} checked={selectedSize === size} onChange={(e) => setSelectedSize(e.target.value)} className="sr-only" />
                                                        {size}
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <fieldset className="mt-4">
                                            <legend className="mb-2 text-sm font-semibold">Elige un color{selectedColor && <span className="font-normal text-bosque/60"> · {selectedColor}</span>}</legend>
                                            <div className="flex gap-2.5">
                                                {colors.map((color) => (
                                                    <label key={color.name} title={color.name} className={`presionable size-9 cursor-pointer rounded-full border border-black/10 ${color.class} ${selectedColor === color.name ? 'ring-2 ring-bosque ring-offset-2 ring-offset-papel' : ''}`}>
                                                        <input type="radio" name="color" value={color.name} checked={selectedColor === color.name} onChange={(e) => setSelectedColor(e.target.value)} className="sr-only" />
                                                        <span className="sr-only">{color.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <div className="mt-6 grid gap-2.5">
                                            <a
                                                href={whatsappLink(contacto.whatsapp, mensaje)}
                                                target="_blank"
                                                rel="noopener"
                                                className="presionable inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-semibold text-white hover:bg-whatsapp/85"
                                            >
                                                <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i> Pedir por WhatsApp
                                            </a>
                                            <div className="grid grid-cols-2 gap-2.5">
                                                <button
                                                    onClick={()=> {
                                                        hadleKart({id: producto.id, nombre: producto.nombre, slug: producto.slug, precio_venta: producto.precio_venta, imagen: imageUrl, color: selectedColor, size: selectedSize} as ProductoKartSelecct)
                                                        closeModal()
                                                    }}
                                                    className="presionable inline-flex items-center justify-center gap-2 rounded-full bg-bosque px-4 py-3 text-sm font-semibold text-hoja hover:bg-musgo"
                                                >
                                                    <i className={yaEsta ? 'ri-delete-bin-line' : 'ri-shopping-bag-3-line'} aria-hidden="true"></i>
                                                    {yaEsta ? "Quitar del pedido" : "Agregar al pedido"}
                                                </button>
                                                <button
                                                    onClick={closeModal}
                                                    className="presionable rounded-full border border-bosque/20 px-4 py-3 text-sm font-semibold hover:bg-bosque/5"
                                                >
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
    )
}
