import Categorias from "@/components/categorias/lista";


import { Suspense } from "react";

export default function CategoriasPage() {
  return (
    <div>
      <Suspense fallback={<p className="text-center text-gray-500 mt-10">Obteniendo categorías...</p>}>
        <Categorias />
      </Suspense>
    </div>
  );
}
