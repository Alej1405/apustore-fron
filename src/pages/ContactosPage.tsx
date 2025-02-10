import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function ContactosPage() {
  return (
    <>
      <Helmet>
        <title>Contactos | Apustore</title>
      </Helmet>
        <h1 className="text-center uppercase text-white text-md md:text-1xl font-bold mt-6">
          contactos
        </h1>
        <div className="mt-8 mb-6">
          <p className="text-m text-center text-white font-light mt-2">
            Estamos cerca de ti, te ayudamos en todo lo que requieras.
          </p>
          <p className="text-s text-center text-white font-light mt-1">
            Recuerda que tambien personalizamos tus diseños.
          </p>
        </div>
        <div className="md:h-full grid grid-rows-1 m-auto items-center md:grid-cols-2 justify-center md:w-5/6 w-1/2 gap-6 mt-6 mb-6">
          <div className=" bg-white/50 backdrop-blur-sm rounded-lg mb-4 pb-8">
            <h3 className="text-center text-green-800 font-bold mt-4">
              Estamos a una llamada a un mensaje.
            </h3>
            <ul className="text-center">
              <li className=" text-green-900 font-light mt-6">
                <i className="ri-phone-fill"></i>
                  <span>  0960154992</span>
              </li>
              <li className=" text-green-900 font-light mt-6">
                <i className="ri-whatsapp-line"></i>
                  <Link
                    to="https://wa.me/593960154992"
                  >
                    Whatsapp 
                  </Link>
              </li>
              <li className=" text-green-900 font-light mt-6">
                <i className="ri-facebook-circle-line"></i>
                  <Link
                    to="https://www.facebook.com/profile.php?id=100089894168343&mibextid=ZbWKwL"
                  >
                    Facebook 
                  </Link>
              </li>
              <li className=" text-green-900 font-light mt-6">
                <i className="ri-instagram-line"></i>
                  <Link
                    to="https://www.instagram.com/apu_store222/profilecard/?igsh=MTgyaGptNXUybTJhMQ=="
                  >
                    Intagram 
                  </Link>
              </li>
            </ul>
          </div>
          <div className="m-auto">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7282438550274!2d-78.5245563247857!3d-0.38500609961120663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5a460133fffff%3A0xb3877f549365d77d!2sparque%20central%20Uyumbicho!5e0!3m2!1ses!2sec!4v1737078304179!5m2!1ses!2sec" width="500" height="300" loading="lazy"></iframe>
          </div>
        </div>
    </>
  )
}
