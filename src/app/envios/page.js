'use client';

import Link from "next/link";
import Image from 'next/image';

const enviosYDevoluciones = () => {
    return (
        <div>
            {/* Header con logo */}
            <header className="bg-white pt-0 pb-0">
                <div className="flex justify-center">
                    <Link href="/">
                        <Image
                            src="/capturadeana.png"
                            alt="Logo"
                            width={500}
                            height={75}
                            className="w-[250px] md:w-[280px] h-auto m-0 p-0 block"
                            priority
                        />
                    </Link>
                </div>
            </header>

            {/* Barra de navegación superior */}
            <nav className="bg-white border-y border-gray-200">
                <div className="flex flex-wrap justify-center gap-4 py-3 px-2">
                    <Link href="/boda" className="hover:text-pink-200 text-sm font-medium">BODA</Link>
                    <Link href="/comunion" className="hover:text-pink-200 text-sm font-medium">COMUNIÓN</Link>
                    <Link href="/bautizo" className="hover:text-pink-200 text-sm font-medium">BAUTIZO Y FIESTA BEBÉ</Link>
                    <Link href="/cumpleanos" className="hover:text-pink-200 text-sm font-medium">CUMPLEAÑOS</Link>
                    <Link href="/laminas" className="hover:text-pink-200 text-sm font-medium">PERSONALIZADAS</Link>
                    <Link href="/outlet" className="hover:text-pink-200 text-sm font-medium">DECORATIVAS</Link>
                </div>
            </nav>

            {/* Main content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-pink-500 px-4 py-2 rounded-md">Envíos y Devoluciones</h1>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">PLAZO DE PRODUCCIÓN</h2>
                    <p className="mb-4">
                        En Capturas de Ana todos y cada uno de los <span className="font-medium">DETALLES PERSONALIZADOS PARA EVENTOS</span> de nuestro catálogo son producidos en el momento en el que el cliente realiza el pedido. Por este motivo nuestro plazo de producción y entrega es de <span className="font-medium">2 semanas aproximadamente</span>. Para las <span className="font-medium">COMUNIONES</span> abrimos la agenda a partir de noviembre, haz tu pedido, por lo menos, un mes antes de la comunión, son fechas en las que se acumula mucho trabajo.
                    </p>
                    <p className="mb-4">
                        Si el evento es antes de los plazos arriba indicados escríbenos a <a href="mailto:capturasdeana@gmail.com" className="text-blue-600 hover:underline">capturasdeana@gmail.com</a> dinos cuándo lo necesitas y te decimos si es posible.
                    </p>
                    <p className="mb-4">
                        La <span className="font-medium">PAPELERÍA DE EVENTOS Y LAS LÁMINAS PERSONALIZADAS</span> tienen un plazo de producción y entrega de <span className="font-medium">10 días laborables</span>.
                    </p>
                    <p>
                        En el caso de los <span className="font-medium">PRODUCTOS NO PERSONALIZADOS (DECORACIÓN Y FIESTAS)</span>, el plazo de entrega es de <span className="font-medium">24/72 horas</span>.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">TRANSPORTE (Nacional Peninsular)</h2>
                    <p className="mb-4">
                        Los pedidos de Capturas de Ana con destino peninsular, se envían a través de la empresa de mensajería <span className="font-medium">CORREOS EXPRESS</span>, con un servicio <span className="font-medium">24/48 horas</span> (contando solamente días laborables). Aunque algunos envíos pueden sufrir retrasos ajenos a la compañía.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">TRANSPORTE (Baleares)</h2>
                    <p className="mb-4">
                        Los pedidos de Capturas de Ana con destino Baleares, se envían a través de la empresa de mensajería <span className="font-medium">CORREOS EXPRESS</span>, con un servicio <span className="font-medium">72/96 horas</span> (contando solamente días laborables). Aunque algunos envíos pueden sufrir retrasos ajenos a la compañía.
                    </p>
                    <p>
                        Es muy importante que incluyas tu teléfono en los datos de contacto para que el mensajero pueda contactarte en caso de ausencia en el domicilio. En caso de una primera ausencia el mensajero concretará una segunda y definitiva entrega.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">GASTOS DE ENVÍO</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Nacional Peninsular: <span className="font-medium">4,90€</span></li>
                        <li>Baleares: <span className="font-medium">7,90€</span></li>
                    </ul>
                    <p className="mt-4">
                        Desde Capturas de Ana no realizamos envíos a las Islas Canarias, Ceuta, Melilla.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Devolución de compra</h2>
                    <p className="mb-4">
                        Todos nuestros artículos se pueden devolver, en un plazo máximo de <span className="font-medium">7 días</span> desde su recepción sin necesidad de justificación alguna. Pasado este plazo no se admitirán devoluciones.
                    </p>
                    <p className="mb-4">
                        Quedan exentos del punto anterior y no tienen derecho de desistimiento, los productos personalizados, tal y como indica la Ley 3/2014 sobre comercio electrónico.
                    </p>
                    <p className="mb-4">
                        Para hacer efectiva dicha devolución debes comunicárnoslo por escrito al email <a href="mailto:capturasdeana@gmail.com" className="text-blue-600 hover:underline">capturasdeana@gmail.com</a> y deberás devolver el artículo en su embalaje original y en perfecto estado.
                    </p>
                    <p>
                        En el caso de productos defectuosos el plazo para reclamaciones es de 7 días. En tal caso escríbenos a <a href="mailto:capturasdeana@gmail.com" className="text-blue-600 hover:underline">capturasdeana@gmail.com</a>. Pasaremos a buscarlo, con un transporte pagado por nosotras. Una vez nos lleguen y comprobados los mismos procederemos, según elijas, a realizar el abono íntegro de la mercancía mediante transferencia bancaria o la reposición de la misma.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 border-t border-gray-200">
                <div className="mx-auto max-w-6xl px-2">
                    <div className="flex flex-wrap justify-center gap-4 text-xs">
                        <Link href="/cookies" className="hover:text-pink-200">POLÍTICA DE COOKIES</Link>
                        <Link href="/privacidad" className="hover:text-pink-200">POLÍTICA DE PRIVACIDAD</Link>
                        <Link href="/terminos" className="hover:text-pink-200">TÉRMINOS Y CONDICIONES</Link>
                    </div>

                    <div className="mt-4 text-center text-gray-500 text-xs">
                        © {new Date().getFullYear()} Ana Ruano. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default enviosYDevoluciones;