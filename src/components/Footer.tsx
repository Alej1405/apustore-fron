export default function Footer(){

    return(
        <footer className="flex flex-col">
            <div className="bg-green-950/90 md:grid md:grid-cols-3 md:px-5 px-2 md:pt-6 pt-3 mt-4">
                <div>
                    <h5 className="uppercase font-semibold text-sm text-green-200 my-3 mx-12">mision</h5>
                        <p className="text-green-800 text-xs font-light mb-6 w-3/6 m-auto text-justify">
                        Ofrecer y ofertar a nuestros clientes productos de calidad, con costos competitivos en el mercado, acordes a su necesidad y exigencia, productos que están acordes a su estilo de vivir la vida.
                        </p>
                    <h5 className="uppercase font-semibold text-sm text-green-200 my-3 mx-12">vision</h5>
                        <p className="text-green-800 text-xs font-light mb-6 w-3/6 m-auto text-justify">
                        Ser un negocio líder y reconocido en la venta de diseños exclusivos en prendas de estampado, generando un servicio de calidad y excelencia a nuestros clientes, siendo altamente competitivos en el mercado nacional.
                        </p>
                </div>
                <div className="flex flex-col text-green-800 text-xs">
                    <span className="uppercase text-green-200 mt-3">
                        estamos cerca de ti:
                    </span>
                    <a href="https://www.facebook.com/profile.php?id=100089894168343&mibextid=ZbWKwL">
                        <i className="ri-facebook-circle-fill"></i>
                        Apu Store
                    </a>
                    <a href="https://www.instagram.com/apu_store222/profilecard/?igsh=MTgyaGptNXUybTJhMQ==">
                        <i className="ri-instagram-fill"></i>
                        @apustore
                    </a>
                    <span className="uppercase text-green-200 mt-3">
                        llamanos:
                    </span>
                    <a href="">
                        <i className="ri-phone-fill"></i>
                        +593 96 015 4992
                    </a>
                    <span className="uppercase text-green-200 mt-3">
                        escribenos:
                    </span>
                    <a href="">
                        <i className="ri-whatsapp-fill"></i>
                        +593 96 015 4992
                    </a>
                    <span className="uppercase text-green-200 mt-3">
                        comentarios:
                    </span>
                    <a>
                        <i className="ri-mail-fill"></i>
                        ventas@apustore-ec.com
                    </a>
                </div>
                <div>
                <span className="uppercase text-green-200 mt-3 text-xs">
                        matriz:
                    </span>
                    <p  className="flex flex-col text-green-800 text-xs">
                        Uyumbicho,Ecuador.
                    </p>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63835.4531237157!2d-78.55647019148502!3d-0.41069949382453425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5a5068368d34b%3A0xe55cea1d7c8f61b7!2sUyumbicho!5e0!3m2!1ses!2sec!4v1734728477739!5m2!1ses!2sec"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-1/1"
                    />

                </div>
            </div>
            <div className="bg-sky-950 py-1">
                <div className="flex items-center justify-center">
                    <p className="mx-2 text-xs text-sky-500">
                        <i className="ri-copyright-line"></i>
                        todos los derechos reservados 
                    </p>
                            <img src="vite.svg" alt="" className="w-5"/>
                </div>
                <img src="footer.svg" alt="" className="w-12 m-auto"/>
            </div>
        </footer>
    )
}