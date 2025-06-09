'use client';
import React, { useState } from "react";
import Link from 'next/link';
import PaginatedList from "@/lib/paginated-list";
import Footer from "../footer";

export default function Categoria({ categoria }) {


  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{categoria.name}</h1>
        </div>


        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700 cursor-pointer">
            Inicio
          </Link>{" "}
          / <span className="font-medium text-gray-900">{categoria.name}</span>
        </div>

        {/* Descripción y contador */}
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
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"> */}
        <PaginatedList items={categoria.products?.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}></PaginatedList>
        {/* </div> */}


      </div>
      <Footer />
    </>
  );

}



function ProductCard({ producto }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const productUrl = `/productos/${producto.id}`;

  const handleTap = () => {
    if (window.innerWidth <= 768) {
      setIsTapped(!isTapped);
    }
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTap}
    >

      <div className="w-full mb-4 overflow-hidden rounded-lg">
        <div className="relative pb-[125%]">
       
          <img
            src={producto.image || '/placeholder.png'}
            alt={producto.name}
            className={`
              absolute inset-0 w-full h-full object-contain
              transition-opacity duration-300
              ${(isHovered || isTapped) && producto.hoverImage ? 'opacity-0' : 'opacity-100'}
            `}
          />


          {producto.hoverImage && (
            <img
              src={producto.hoverImage}
              alt={producto.name}
              className={`
                absolute inset-0 w-full h-full object-contain
                transition-opacity duration-300
                ${(isHovered || isTapped) ? 'opacity-100' : 'opacity-0'}
              `}
            />
          )}
        </div>
      </div>


      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
          <Link href={productUrl} className="hover:underline">
            {producto.name}
          </Link>
        </h3>

        {producto.basePrice && (
          <p className="text-gray-700 font-medium">
            Desde {producto.basePrice.toFixed(2)}€
          </p>
        )}
      </div>

    </div>

  );


}