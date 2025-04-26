import Link from "next/link";

import Image from 'next/image'; // Importa Image desde next/image
import DropdownCategorias from "@/components/DropdownCategorias";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Navigation */}
      <nav className="flex flex-wrap justify-between items-center px-4 py-3 border-b border-gray-200 text-xs md:text-sm">
        <div className="flex space-x-4 md:space-x-6">
          <Link href="/mi-cuenta" className="hover:text-rose-400 transition">MI CUENTA</Link>
          <Link href="/envios" className="hover:text-rose-400 transition">ENVÍOS Y DEVOLUCIONES</Link>
          <Link href="/contacto" className="hover:text-rose-400 transition">CONTACTO</Link>
          <DropdownCategorias />
          <Link href="/calendario" className="hover:text-rose-400 transition">CALENDARIO EVENTOS 2025</Link>
        </div>
        <Link href="/carrito" className="hover:text-rose-400 transition">CARRITO (0 PRODUCTOS - 0,00€)</Link>
      </nav>

      {/* Main Header */}
      <header className="text-center py-6 md:py-4 px-4">
  <div className="flex justify-center">
   <div className="flex items-center">Capturas de ana
  </div>
  </div>
</header>

      {/* Main Navigation */}
      <nav className="flex flex-wrap justify-center gap-4 py-4 border-y border-gray-200 px-4">
        <Link href="/boda" className="hover:text-rose-400 transition">BODA</Link>
        <Link href="/comunion" className="hover:text-rose-400 transition">COMUNIÓN</Link>
        <Link href="/bautizo" className="hover:text-rose-400 transition">BAUTIZO Y FIESTA BEBÉ</Link>
        <Link href="/cumpleanos" className="hover:text-rose-400 transition">CUMPLEAÑOS</Link>
        <Link href="/laminas" className="hover:text-rose-400 transition">LÁMINAS</Link>
        <Link href="/contacto" className="hover:text-rose-400 transition">CONTACTO</Link>
        <Link href="/outlet" className="hover:text-rose-400 transition">OUTLET</Link>
      </nav>

      {/* Product Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
        {/* Wedding Section */}
        <div className="text-center group">
          <h3 className="text-lg font-medium mb-2 group-hover:text-rose-400 transition">ESPECIAL BODA</h3>
          <div className="aspect-square bg-gray-100 mb-2 overflow-hidden">
            <Image 
              src="/boda.png" 
              alt="Lámina para boda" 
              width={500} 
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Communion Section */}
        <div className="text-center group">
          <h3 className="text-lg font-medium mb-2 group-hover:text-rose-400 transition">COMUNIÓN</h3>
          <div className="aspect-square bg-gray-100 mb-2 overflow-hidden">
            <Image 
              src="/comunion.png" 
              alt="Comunion" 
              width={500} 
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Baby Section */}
        <div className="text-center group">
          <h3 className="text-lg font-medium mb-2 group-hover:text-rose-400 transition">FIESTA BEBE</h3>
          <div className="aspect-square bg-gray-100 mb-2 overflow-hidden">
            <Image 
              src="/fiestabebe.png" 
              alt="Fiesta bebe" 
              width={500} 
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        {/* Birthday Section */}
        <div className="text-center group">
          <h3 className="text-lg font-medium mb-2 group-hover:text-rose-400 transition">CUMPLEAÑOS</h3>
          <div className="aspect-square bg-gray-100 mb-2 overflow-hidden">
            <Image 
              src="/cumpleaños.png" 
              alt="Cumpleanos" 
              width={500} 
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        {/* Laminas Section */}
        <div className="text-center group">
          <h3 className="text-lg font-medium mb-2 group-hover:text-rose-400 transition">CUMPLEAÑOS</h3>
          <div className="aspect-square bg-gray-100 mb-2 overflow-hidden">
            <Image 
              src="/laminapersonalizada.png" 
              alt="Lámina personalizada" 
              width={500} 
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        {/* Outlet Section */}
        <div className="text-center group">
          <h3 className="text-lg font-medium mb-2 group-hover:text-rose-400 transition">OUTLET REGALOS</h3>
          <div className="aspect-square bg-gray-100 mb-2 overflow-hidden">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              [Outlet Image]
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap justify-center gap-4 py-6 border-t border-gray-200 text-xs md:text-sm px-4">
        <Link href="/cookies" className="hover:text-rose-400 transition">POLÍTICA DE COOKIES</Link>
        <Link href="/privacidad" className="hover:text-rose-400 transition">POLÍTICA DE PRIVACIDAD</Link>
        <Link href="/terminos" className="hover:text-rose-400 transition">TÉRMINOS Y CONDICIONES</Link>
      </footer>
    </div>
  );
}
