import Link from 'next/link';
import { obtenerCategorias } from '@/lib/data';

export default async function NavbarCategorias() {
  const categories = await obtenerCategorias();

  return (
    <div className="[&_*]:border-none"> {/* Contenedor que fuerza la eliminación de bordes */}
      <nav className="bg-white text-black border-none outline-none ring-0">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 py-2 px-2 
                       border-none outline-none ring-0 before:border-none after:border-none">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              className="text-sm font-medium transition border-none outline-none ring-0
             relative link-underline"
            >
              {cat.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}