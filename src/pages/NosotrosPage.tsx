import { Helmet } from "react-helmet"

export default function NosotrosPage() {
  return (
    <>
      <Helmet>
          <title>Nosotros | Apustore</title>
      </Helmet>
      <div className="bg-white/60 backdrop-blur-sm rounded-lg md:w-4/6 w-5/6 m-auto p-12 mt-24 mb-32 space-y-8">
      <div className="space-y-3">
        <h2 className="uppercase text-green-800 font-extrabold">mision</h2>
        <p className="ml-4 text-green-900 ">
          Ofrecer y ofertar a nuestros clientes productos de calidad, con costos competitivos en el mercado, acordes a su necesidad y exigencia, productos que están acordes a su estilo de vivir la vida.
        </p>
      </div>
      <div>
        <h2 className="uppercase text-green-800 font-extrabold">vision</h2>
        <p className="ml-4 text-green-900 ">
          Ser un negocio líder y reconocido en la venta de diseños exclusivos en prendas de estampado, generando un servicio de calidad y excelencia a nuestros clientes, siendo altamente competitivos en el mercado nacional.
        </p>
      </div>
      <div>
        <h2 className="uppercase text-green-800 font-extrabold">objetivos</h2>
        <p className="ml-4 text-green-900 ">
          Ofrecer una amplia variedad de productos de moda exclusivos, de calidad y a precios accesibles
        </p>
      </div>
    </div>
    </>
  )
}
