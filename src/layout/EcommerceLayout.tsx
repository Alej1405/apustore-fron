
import Header from "../components/Header"
import Footer from "../components/Footer"
import Modal from "../components/Modal"
import Notification from "../components/Notification"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"

export default function IndexPages() {
    const laodFromStorage = useAppStore((state)=> state.laodFromStorage)


    useEffect(()=>{
        laodFromStorage()
    }, [laodFromStorage])
    return (
        
        <div className=" bg-products bg-no-repeat bg-cover h-full bg-fixed">
                <Header />
                    <Outlet />
                <Footer />
                <Modal />
                <Notification />

        </div>

            

    )
}
