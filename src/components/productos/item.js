'use client';
import React, { useState, useRef } from "react";
import Link from 'next/link';
import { Search, ZoomIn, ZoomOut } from "lucide-react";
import CamposPersonalizados from "../campospersonalizados";
import { insertarCarrito } from "@/lib/actions";
import { useTransition } from 'react';
import { toast } from "sonner";

export default function ProductoItem({ user, producto, relacionados = [] }) {
  const [nombre, setNombre] = useState("");
  const [textoPersonalizado, setTextoPersonalizado] = useState("");
  const [imagenActual, setImagenActual] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 }); // Posición inicial centrada
  const imgRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  const handleImageClick = (e) => {
    if (!zoomActive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setZoomActive(!zoomActive);
    // Resetear a la posición central al desactivar
    if (!zoomActive) setZoomPosition({ x: 50, y: 50 });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    startTransition(() => {
      insertarCarrito(formData).then(() => {
        setNombre(" ");
        setTextoPersonalizado(" ");
      });
     toast.success('Añadido al carrito ' + producto.name)
    });
  }

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
        {/* Galería de imágenes */}
        <div className="flex flex-col h-full">
          <div className="flex-grow flex items-center justify-center overflow-hidden rounded-lg relative">
            <div 
              className="relative w-full h-full"
              onClick={handleImageClick}
            >
              <img
                ref={imgRef}
                src={imagenes[imagenActual]}
                alt={producto.name}
                className={`w-full h-full max-h-[700px] object-contain object-center rounded-md shadow transition-all duration-300 ${
                  zoomActive ? 'cursor-crosshair' : 'cursor-default'
                }`}
                style={{
                  transform: zoomActive ? 'scale(1.8)' : 'scale(1)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
              />
              
              <button 
                onClick={toggleZoom}
                className={`absolute bottom-4 right-4 p-2 rounded-full transition-all ${
                  zoomActive ? 'bg-indigo-600 text-white' : 'bg-white/80 text-gray-800 hover:bg-white'
                } shadow-md`}
                aria-label={zoomActive ? "Desactivar zoom" : "Activar zoom"}
              >
                {zoomActive ? (
                  <ZoomOut className="w-5 h-5" strokeWidth={2.5} />
                ) : (
                  <ZoomIn className="w-5 h-5" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>

          {imagenes.length > 1 && (
            <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
              {imagenes.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setImagenActual(index);
                    setZoomActive(false);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                    imagenActual === index ? 'border-indigo-600' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Vista ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
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

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="userId" value={user?.id} />
            <input type="hidden" name="productId" value={producto.id} />
            {producto.category?.slug !== 'Decorativas' && (
              <CamposPersonalizados
                categoria={producto.category}
                nombre={nombre}
                setNombre={setNombre}
                textoPersonalizado={textoPersonalizado}
                setTextoPersonalizado={setTextoPersonalizado}
              />
            )}

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-none font-medium transition duration-150 mb-8 uppercase"
              disabled={isPending}
            >
              {isPending ? "Añadiendo..." : "AÑADIR AL CARRITO"}
            </button>
          </form>

          <div className="mb-8">
            <p className="text-gray-600">
              Lámina personalizada "{producto.name}". Añade vuestros nombres, fecha o frase favorita. Este diseño es perfecto para decorar la casa o para hacer un regalo especial y personalizado.
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
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
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