import React from "react";
import Link from 'next/link';

export default function ProductoItem({ producto }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700 cursor-pointer">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href={`/categorias/${producto.category?.id}`} className="hover:text-gray-700 cursor-pointer">
          {producto.category?.name || "Categoría"}
        </Link>{" "}
        / <span className="font-medium text-gray-900">{producto.name}</span>
      </div>

  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        <div className="w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={producto.image || '/placeholder.png'}
            alt={producto.name}
            className="w-full h-auto max-h-[600px] object-cover object-center"
          />
        </div>

     
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {producto.name}
          </h1>

          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-gray-900 mr-4">
              {producto.basePrice?.toFixed(2)}€
            </span>
            {producto.withFrame && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Incluye marco
              </span>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h2>
            <p className="text-gray-600">
              {producto.description || "No hay descripción disponible para este producto."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Dimensiones</h3>
              <p className="text-gray-900">{producto.dimensions || "-"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
              <p className="text-gray-900">{producto.category?.name || "-"}</p>
            </div>
          </div>

         
          <div className="mt-auto space-y-4">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-150">
              Añadir al carrito
            </button>
            <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-150">
              Contactar sobre este diseño
            </button>
          </div>
        </div>
      </div>

   
      <div className="border-t border-gray-200 my-12 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos relacionados</h2>
        
      </div>
    </div>
  );
}