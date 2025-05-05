import React from "react";

import Link from 'next/link';

export default function Categoria({ categoria }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Título general */}
      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{categoria.name}</h1>
      </div>

      {/* Ruta de navegación */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700 cursor-pointer">
          Inicio
        </Link>{" "}
        / <span className="font-medium text-gray-900">{categoria.name}</span>
      </div>

      {/* Encabezado con título y descripción */}
      <div className="mb-8">
       
        <p className="text-gray-600 text-lg">
          {categoria.description || "Sin descripción disponible para esta categoría."}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {categoria.products?.length || 0} productos
        </p>
      </div>

      {/* Línea separadora */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {categoria.products?.map((producto) => (
          <div key={producto.id} className="group">
            <div className="w-full mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={producto.image || '/placeholder.png'}
                alt={producto.name}
                className="w-full h-64 sm:h-80 md:h-96 object-cover object-center transition duration-300 group-hover:opacity-90"
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                {producto.name}
              </h3>
              {producto.basePrice && (
                <p className="text-gray-700 font-medium">
                  Desde {producto.basePrice.toFixed(2)}€
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
