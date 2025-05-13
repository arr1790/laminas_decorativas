import Link from "next/link";
import DropdownCategorias from "@/components/DropdownCategorias";
import HeroSlider from "@/components/HeroSlider";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white m-0 p-0 ">

      <HeroSlider />

      

      <section className="py-6 px-2">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            NUESTRAS COLECCIONES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CategoryCard title="BODA" image="/boda.png" href="/categorias/Boda" />
            <CategoryCard title="COMUNIÓN" image="/comunion.png" href="/categorias/Comunion" />
            <CategoryCard title="FIESTA BEBÉ" image="/fiestabebe.png" href="/categorias/Bautizo-y-Fiesta-bebe" />
            <CategoryCard title="CUMPLEAÑOS" image="/cumpleaños.png" href="/categorias/Cumpleanos" />
            <CategoryCard title="LÁMINAS PERSONALIZADAS" image="/laminapersonalizada.png" href="/categorias/Personalizadas" />
            <CategoryCard title="LÁMINAS DECORATIVAS" image="/laminadecorativa.png" href="/categorias/Decorativas" />
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-2">
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <Link href="/cookies">POLÍTICA DE COOKIES</Link>
            <Link href="/privacidad">POLÍTICA DE PRIVACIDAD</Link>
            <Link href="/terminos">TÉRMINOS Y CONDICIONES</Link>
          </div>
          <div className="mt-4 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} Ana Ruano. Todos los derechos reservados.
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
        <div className="aspect-square bg-gray-100">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow-sm">
            <h3 className="text-gray-800 text-lg font-bold text-center">{title}</h3>
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-base font-medium text-center text-gray-800 group-hover:text-rose-500">
        {title}
      </h3>
    </Link>
  );
}
