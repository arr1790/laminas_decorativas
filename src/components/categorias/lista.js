import { obtenerCategorias } from "@/lib/data";
import Link from "next/link";
import Modal from "../modal";
import CategoriaInsertar from "./insertar";
import CategoriaModificar from "./modificar";
import CategoriaEliminar from "./eliminar";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { auth } from "@/auth";

async function Categorias() {
  const session = await auth();
  const categorias = await obtenerCategorias();

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-indigo-900">Gestión de Categorías</h1>

        {/* Botón Insertar (solo admin) */}
        {session?.user.role === 'ADMIN' && (
          <Modal openElement={
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
              <PlusIcon className="w-4 h-4" />
              Añadir Categoría
            </button>
          }>
            <CategoriaInsertar />
          </Modal>
        )}
      </div>

      {/* Grid de Categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="bg-white shadow-md rounded-xl p-5 relative hover:shadow-lg transition-shadow">
            {/* Botones (solo admin) */}
            {session?.user.role === 'ADMIN' && (
              <div className="absolute top-3 right-3 flex gap-2">
                <Modal openElement={
                  <button className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                }>
                  <CategoriaModificar categoria={categoria} />
                </Modal>

                <Modal openElement={
                  <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                }>
                  <CategoriaEliminar categoria={categoria} />
                </Modal>
              </div>
            )}

            {/* Contenido de la categoría */}
            <Link href={`/categorias/${categoria.id}`} className="block space-y-2">
              <h2 className="text-xl font-semibold text-indigo-800 hover:underline">
                {categoria.name}
              </h2>
              <p className="text-gray-500 text-sm">
                <span className="font-medium text-gray-700">ID:</span> {categoria.id}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
