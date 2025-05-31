'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-white text-center">
      <Image
        src="/-404.jpg"
        alt="Página no encontrada"
        width={400}
        height={400}
        className="mb-4 max-w-full h-auto"
      />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">¡Oops! Página no encontrada</h1>
      <p className="text-gray-600 mb-6">La ruta a la que intentas acceder no existe.</p>
      <Link href="/">
        <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}
