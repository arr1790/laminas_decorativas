'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Iconos

export default function MobileMenu({ categories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 focus:outline-none"
        aria-label="Abrir menú"
      >
        <Menu className="w-6 h-6 text-black" />
      </button>

      {/* Menú full-screen */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white  flex-col p-6">
          {/* Cerrar */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 focus:outline-none"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Categorías */}
          <nav className="flex flex-col items-center mt-30 justify-center gap-6 flex-grow">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium text-gray-800 hover:text-indigo-600 transition"
              >
                {cat.name.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
