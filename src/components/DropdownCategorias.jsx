import Link from 'next/link';
import { obtenerCategorias } from '@/lib/data';

export default async function NavbarCategorias() {
  const categories = await obtenerCategorias();

  return (
    <nav className="bg-white border-y border-gray-200 mt-0">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 py-2 px-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categorias/${cat.id}`}
            className="hover:text-pink-200 text-sm font-medium transition"
          >
            {cat.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}