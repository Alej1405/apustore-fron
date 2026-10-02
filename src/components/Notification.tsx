import { Fragment } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Transition } from '@headlessui/react'
import { useAppStore } from '../stores/useAppStore'

export default function Notification() {

    const notificacion = useAppStore((state)=> state.notificacion)
    const hiddeNotificaction = useAppStore((state)=> state.hiddeNotificaction)

    return (
        <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex items-end px-4 md:inset-0 md:items-start md:p-6"
        >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <Transition
            show={notificacion.show}
            as={Fragment}
            enter="transform ease-salida duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
                <div className="p-4">
                <div className="flex items-start">
                    <div className="shrink-0">
                        {notificacion.error ? (
                            <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                        ) : (<CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />)}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Notificación</p>
                    <p className="mt-1 text-sm text-gray-500">
                        {notificacion.text}
                    </p>
                    </div>
                    <div className="ml-4 flex shrink-0">
                    <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-musgo focus:ring-offset-2"
                        onClick={ hiddeNotificaction }
                    >
                        <span className="sr-only">Cerrar</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </Transition>
        </div>
        </div>
    )
}