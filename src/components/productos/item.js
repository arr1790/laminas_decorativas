'use client';
import React, { useState } from "react";
import Link from 'next/link';

export default function ProductoItem({ producto, relacionados = [] }) {
  const [nombre, setNombre] = useState("");
  const [textoPersonalizado, setTextoPersonalizado] = useState("");
  const [imagenActual, setImagenActual] = useState(0);

  const imagenes = producto.images || [producto.image || '/placeholder.png'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700 cursor-pointer">Inicio</Link> /{" "}
        <Link href={`/categorias/${producto.category?.slug}`} className="hover:text-gray-700 cursor-pointer">
          {producto.category?.name || "Piorigo"}
        </Link>{" "}
        / <span className="font-medium text-gray-900">{producto.name}</span>
      </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
  {/* Galería de imágenes - Contenedor ajustado para imagen más grande */}
  <div className="flex flex-col h-full">
    <div className="flex-grow flex items-center justify-center overflow-hidden rounded-lg">
      <img
        src={imagenes[imagenActual]}
        alt={producto.name}
        className="w-full h-full max-h-[700px] object-contain object-center rounded-md shadow"
      />
    </div>
    {imagenes.length > 1 && (
      <div className="flex mt-4 space-x-2">
        {imagenes.map((img, index) => (
          <button
            key={index}
            onClick={() => setImagenActual(index)}
            className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
              imagenActual === index ? 'border-indigo-600' : 'border-transparent'
            }`}
          >
            <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    )}
  </div>

        {/* Información del producto */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
              CON MARCO
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{producto.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-600 ml-1">| reseña</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-gray-900 mr-4">
              {producto.basePrice?.toFixed(2)}€
            </span>
          </div>

          <p className="text-gray-600 mb-6">Los gastos de envío se calculan en la pantalla de pago.</p>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">TAMAÑO (CM)</h3>
            <p className="text-gray-600">{producto.dimensions || "21X30"} ✔</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">NOMBRE: *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Escribe los nombres"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">TEXTO (OPCIONAL)</label>
            <input
              type="text"
              value={textoPersonalizado}
              onChange={(e) => setTextoPersonalizado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Añade un texto especial"
            />
          </div>

          <button className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-none font-medium transition duration-150 mb-8 uppercase">
            AÑADIR AL CARRITO
          </button>

          <div className="mb-8">
            <p className="text-gray-600">
              Lámina personalizada con la frase "{producto.name}". Añade vuestros nombres, fecha o frase favorita. Este diseño es perfecto para decorar la casa o para hacer un regalo especial y personalizado.
            </p>
          </div>

          
        
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="border-t border-gray-200 my-12 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relacionados.map((rel) => (
            <Link key={rel.id} href={`/productos/${rel.id}`} className="block group">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={rel.image || "/placeholder.png"}
                  alt={rel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-2 font-medium text-gray-900 group-hover:underline">{rel.name}</h3>
              <p className="text-gray-600 text-sm">{rel.basePrice?.toFixed(2)} €</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

