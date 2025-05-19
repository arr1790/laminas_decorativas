import Link from "next/link";
import DropdownCategorias from "@/components/DropdownCategorias";
import HeroSlider from "@/components/HeroSlider";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white m-0 p-0">

      <HeroSlider />

      <section >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">
            NUESTRAS COLECCIONES
          </h2>

          {/* Grid de 1 columna en móvil, 2 columnas en pantallas medianas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CategoryCard title="LO MÁS VENDIDO" image="/vendidos.jpeg" href="/categorias/Decorativas" />
            <CategoryCard title="PIEZAS UNICAS" image="/piezass.png" href="/categorias/Personalizadas" />
          </div>

          {/* Tarjeta centrada para móvil y escritorio */}
          <div className="flex justify-center mt-4">
            <div className="w-full md:w-4/6">
              <CategoryCard 
                title="NOVEDOSAS" 
                image="/novedosos.png" 
                href="/categorias/Bautizo-y-Fiesta-bebe" 
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 py-6 border-t border-gray-200 mt-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-2 text-xs text-center">
            <Link href="/cookies" className="hover:underline">POLÍTICA DE COOKIES</Link>
            <Link href="/privacidad" className="hover:underline">POLÍTICA DE PRIVACIDAD</Link>
            <Link href="/terminos" className="hover:underline">TÉRMINOS Y CONDICIONES</Link>
          </div>
          <div className="mt-4 text-center text-gray-500 text-xs">
            ©️ {new Date().getFullYear()} Ana Ruano. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
function CategoryCard({ title, image, href }) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
        {/* Contenedor de imagen con altura adaptativa */}
        <div className="w-full bg-gray-100 aspect-[4/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white bg-opacity-90 p-2 rounded-md shadow-sm">
            <h3 className="text-gray-800 text-sm sm:text-base font-bold text-center">{title}</h3>
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-sm sm:text-base font-medium text-center text-gray-800 group-hover:text-rose-500">
        {title}
      </h3>
    </Link>
  );
}
