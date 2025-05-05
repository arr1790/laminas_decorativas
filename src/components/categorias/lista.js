import { obtenerCategorias } from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/Modal";
import CategoriaInsertar from "./insertar";
import CategoriaModificar from "./modificar";
import CategoriaEliminar from "./eliminar";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { auth } from "@/auth";

async function Categorias() {
  const session = await auth();
  const categorias = await obtenerCategorias();

  return (
    <div className="flex flex-col gap-4">
      {/* Botón Insertar (solo visible para admin) */}
      {session?.user.role === 'ADMIN' && (
        <Modal openElement={
          <div className='justify-self-end size-8 grid place-content-center rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'>
            <PlusIcon className='size-4' />
          </div>
        }>
          <CategoriaInsertar />
        </Modal>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="max-w-96 p-4 mb-4 bg-indigo-50 rounded-lg border border-indigo-100">
            {/* Botones de acción (solo para admin) */}
            {session?.user.role === 'ADMIN' && (
              <div className='flex justify-end items-center gap-1'>
                {/* Botón Modificar */}
                <Modal openElement={
                  <div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                    <PencilIcon className='size-4' />
                  </div>
                }>
                  <CategoriaModificar categoria={categoria} />
                </Modal>

                {/* Botón Eliminar */}
                <Modal openElement={
                  <div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                    <TrashIcon className='size-4' />
                  </div>
                }>
                  <CategoriaEliminar categoria={categoria} />
                </Modal>
              </div>
            )}

            {/* Contenido de la categoría */}
            <Link href={`/categorias/${categoria.id}`} className="flex flex-col gap-2 font-bold cursor-pointer">
              <h2 className="text-xl text-indigo-800 hover:text-indigo-600 hover:underline">
                {categoria.name}
              </h2>
              <p className="text-gray-700 font-normal">
                <span className="font-semibold">ID:</span> {categoria.id}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorias;