import Link from "next/link";
import Image from 'next/image';
import DropdownCategorias from "@/components/DropdownCategorias";

export default function Home() {
  return (
    <div className="min-h-screen bg-white m-0 p-0">
     <header className="bg-white">
  <div className="flex justify-center items-start">  {/* Cambiado a items-start */}
    <Link href="/" className="block leading-none"> 
      <Image
        src="/CapturadeAna.png"
        alt="Logo"
        width={500}
        height={75}
        className="w-[250px] md:w-[280px] h-auto"
        priority
      />
    </Link>
  </div>
</header>

      <nav className="bg-white border-y border-gray-200 mt-0">
        <div className="flex justify-center py-2 px-2">
          <DropdownCategorias/>
        </div>
      </nav>
      <section className="py-6 px-2"> 
        <div className="mx-auto max-w-6xl"> 
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">NUESTRAS COLECCIONES</h2> 

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> 
            <CategoryCard title="BODA" image="/boda.png" href="/categorias/1" />
            <CategoryCard title="COMUNIÓN" image="/comunion.png" href="/categorias/2" />
            <CategoryCard title="FIESTA BEBÉ" image="/fiestabebe.png" href="/categorias/3" />
            <CategoryCard title="CUMPLEAÑOS" image="/cumpleaños.png" href="/categorias/4" />
            <CategoryCard title="LÁMINAS PERSONALIZADAS" image="/laminapersonalizada.png" href="/categorias/5" />
            <CategoryCard title="LÁMINAS DECORATIVAS" image="/laminadecorativa.png" href="/categorias/7" />
          </div>
        </div>
      </section>

      {/* Footer compacto */}
      <footer className="bg-gray-100 py-6 border-t border-gray-200"> {/* Reducido padding */}
        <div className="mx-auto max-w-6xl px-2"> {/* Contenedor ajustado */}
          <div className="flex flex-wrap justify-center gap-4 text-xs"> {/* Texto más pequeño */}
            <Link href="/cookies" className="hover:pink-200-500">POLÍTICA DE COOKIES</Link>
            <Link href="/privacidad" className="hover:pink-200-500">POLÍTICA DE PRIVACIDAD</Link>
            <Link href="/terminos" className="hover:pink-200-500">TÉRMINOS Y CONDICIONES</Link>
          </div>

          <div className="mt-4 text-center text-gray-500 text-xs"> {/* Más compacto */}
            © {new Date().getFullYear()} Ana Ruano .Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente ajustado
function CategoryCard({ title, image, href }) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"> {/* Sombra más sutil */}
        <div className="aspect-square bg-gray-100">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" /* Transición más rápida */
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow-sm"> {/* Cuadro de fondo */}
            <h3 className="text-gray-800 text-lg font-bold text-center">{title}</h3>
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-base font-medium text-center text-gray-800 group-hover:text-rose-500"> {/* Más compacto */}
        {title}
      </h3>
    </Link>
  );
}