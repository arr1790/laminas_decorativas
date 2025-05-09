import {  obtenerProductos, obtenerCategorias } from "@/lib/data";
import Link from "next/link";

import ProductoInsertar from "./insertar";
import ProductoEliminar from "./eliminar";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { auth } from "@/auth";
import ProductoModificar from "./modificar";
import Modal from "../modal";

export default async function Productos() {
    const session = await auth();
    const productos = await obtenerProductos();
    const categorias = await obtenerCategorias();

    return (
        <div className="flex flex-col gap-4">
            {session?.user.role === 'ADMIN' && (
                <Modal openElement={
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                      <PlusIcon className="w-4 h-4" />
                      Añadir producto
                    </button>
                  }>
                    <ProductoInsertar categorias={categorias} />
                </Modal>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {productos.map(producto => (
                    <div key={producto.id} className="max-w-96 p-4 mb-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <div className='flex justify-end items-center gap-1'>
                            {session?.user.role === 'ADMIN' && (
                                <>
                                    <Modal openElement={
                                        <div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                            <PencilIcon className='size-4' />
                                        </div>
                                    }>
                                        <ProductoModificar producto={producto} categorias={categorias} />
                                    </Modal>

                                    <Modal openElement={
                                        <div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                                            <TrashIcon className='size-4' />
                                        </div>
                                    }>
                                        <ProductoEliminar producto={producto} />
                                    </Modal>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Link href={`/productos/${producto.id}`} className="font-bold text-lg cursor-pointer">
                                {producto.name}
                            </Link>
                            
                            <img 
                                src={producto.image} 
                                alt={producto.name} 
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            
                            <p className="text-gray-700">{producto.description}</p>
                            
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <span className="font-semibold">Precio:</span> {producto.basePrice.toFixed(2)}€
                                </div>
                                <div>
                                    <span className="font-semibold">Dimensiones:</span> {producto.dimensions}
                                </div>
                                <div>
                                    <span className="font-semibold">Categoría:</span> {producto.category?.name}
                                </div>
                                <div>
                                    <span className="font-semibold">Marco:</span> {producto.withFrame ? "Sí" : "No"}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}