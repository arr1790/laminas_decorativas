import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import Image from 'next/image';
import Footer from "@/components/footer"; // ✅ nuevo import

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-200 m-0 p-0">
      <HeroSlider />

      <section>
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

      {/* ✅ Footer modular insertado */}
      <Footer />
    </div>
  );
}

function CategoryCard({ title, image, href }) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="w-full bg-gray-100 aspect-[4/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-stone-200 bg-opacity-90 p-2 rounded-md shadow-sm">
            <h3 className="text-gray-800 text-sm sm:text-base font-bold text-center">{title}</h3>
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-sm sm:text-base font-medium text-center text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
        {title}
      </h3>
    </Link>
  );
}
