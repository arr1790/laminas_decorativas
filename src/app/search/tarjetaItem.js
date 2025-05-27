"use client";

import Link from "next/link";
import { useState } from "react";

export function ProductCard({ producto }) {
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
        <div className="relative pb-[125%]"> {/* Ajustar según relación de aspecto */}
          {/* Imagen principal */}
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