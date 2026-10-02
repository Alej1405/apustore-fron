//estilos y presentacion de la web es decir que muestra lo principal

import Marco from "../components/Marco"
import Modal from "../components/Modal"
import Notification from "../components/Notification"

export default function IndexLayout() {
    return (
        <>
            <Marco fondo="bg-index" />
            <Modal />
            <Notification />
        </>
    )
}
