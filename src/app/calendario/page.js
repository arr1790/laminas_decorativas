'use client';

import Link from "next/link";
import Image from 'next/image';

const CalendarioEventos = () => {
    return (
        <div>
            {/* Header compacto */}
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
                <h1 className="text-3xl font-bold mb-6 text-pink-500 px-4 py-2 rounded-md">Calendario Eventos 2025</h1>

                <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <p className="mb-4 text-lg">
                        Si tu evento es desde el <span className="font-medium">9 de mayo en adelante</span> realiza tu pedido y lo recibirás a tiempo. 
                    </p>
                    <p className="mb-4">
                        Si lo necesitas antes escríbenos a <a href="mailto:capturadeana@gmail.com" className="text-blue-600 hover:underline">capturadeana@gmail.com</a> y vemos si es posible.
                    </p>
                    <p className="mb-4 text-lg font-medium">
                        Recuerda: el tiempo es clave para garantizarte la calidad que mereces.
                    </p>
                    <p className="text-lg">
                        Haz tu pedido con antelación y déjanos crear algo único para ti.
                    </p>
                </div>

                {/* Sección de políticas (opcional) */}
                <div className="mt-8 border-t pt-6">
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/cookies" className="hover:text-pink-200">Política de Cookies</Link>
                        <Link href="/privacidad" className="hover:text-pink-200">Política de privacidad</Link>
                    </div>
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

export default CalendarioEventos;