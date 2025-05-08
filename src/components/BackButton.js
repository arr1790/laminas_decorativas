"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Importa el ícono de flecha izquierda

export function BackButton() {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
    >
      <ArrowLeft className="w-4 h-4" />
      Volver atrás
    </button>
  );
}