import Marco from "../components/Marco"
import Modal from "../components/Modal"
import Notification from "../components/Notification"

//layout de las vistas de comercio electronico: mismo cascaron, fondo de prendas
export default function EcommerceLayout() {
    return (
        <>
            <Marco fondo="bg-products" />
            <Modal />
            <Notification />
        </>
    )
}
