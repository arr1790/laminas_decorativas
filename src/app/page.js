import Link from "next/link";
import Image from 'next/image';
// import DropdownCategorias from "@/components/DropdownCategorias";

export default function Home() {
  return (
    <div>

      {/* Logo/Marca */}
      <header className="text-center py-8 px-4 bg-gradient-to-r from-blue-50 to-pink-50">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">CAPTURAS DE ANA</h1>
          <p className="text-lg text-gray-600 italic">Descubre algo diferente...</p>
        </div>
      </header>

      {/* Navegación principal */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex flex-wrap justify-center gap-4 md:gap-8 py-4 px-4">
          <Link href="/boda" className="hover:text-rose-500 transition font-medium">BODA</Link>
          <Link href="/comunion" className="hover:text-rose-500 transition font-medium">COMUNIÓN</Link>
          <Link href="/bautizo" className="hover:text-rose-500 transition font-medium">BAUTIZO Y FIESTA BEBÉ</Link>
          <Link href="/cumpleanos" className="hover:text-rose-500 transition font-medium">CUMPLEAÑOS</Link>
          <Link href="/laminas" className="hover:text-rose-500 transition font-medium">LÁMINAS</Link>
          <Link href="/outlet" className="hover:text-rose-500 transition font-medium">OUTLET</Link>
        </div>
      </nav>

      {/* Categorías destacadas */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">NUESTRAS COLECCIONES</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Boda */}
            <CategoryCard 
              title="ESPECIAL BODA" 
              image="/boda.png" 
              href="/boda"
            />
            
            {/* Comunión */}
            <CategoryCard 
              title="COMUNIÓN" 
              image="/comunion.png" 
              href="/comunion"
            />
            
            {/* Fiesta Bebé */}
            <CategoryCard 
              title="FIESTA BEBÉ" 
              image="/fiestabebe.png" 
              href="/bautizo"
            />
            
            {/* Cumpleaños */}
            <CategoryCard 
              title="CUMPLEAÑOS" 
              image="/cumpleaños.png" 
              href="/cumpleanos"
            />
            
            {/* Láminas */}
            <CategoryCard 
              title="LÁMINAS PERSONALIZADAS" 
              image="/laminapersonalizada.png" 
              href="/laminas"
            />
            
            {/* laminadecorativas */}
            <CategoryCard 
              title="LÁMINAS DECORATIVAS" 
              image="/laminadecorativa.png" 
              href="/laminas decorativas"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/cookies" className="hover:text-rose-500 transition">POLÍTICA DE COOKIES</Link>
            <Link href="/privacidad" className="hover:text-rose-500 transition">POLÍTICA DE PRIVACIDAD</Link>
            <Link href="/terminos" className="hover:text-rose-500 transition">TÉRMINOS Y CONDICIONES</Link>
          </div>
          
          <div className="mt-6 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} MIMARIETA. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente para tarjetas de categoría
function CategoryCard({ title, image, href }) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-gray-100">
          <Image 
            src={image} 
            alt={title} 
            width={500} 
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="text-white text-xl font-bold text-center px-4">{title}</h3>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-medium text-center text-gray-800 group-hover:text-rose-500 transition">
        {title}
      </h3>
    </Link>
  );
}