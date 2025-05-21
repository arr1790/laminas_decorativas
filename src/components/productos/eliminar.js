"use client";

import { useEffect } from 'react';
import { useId } from 'react';
import { useActionState } from 'react';
import { eliminarProducto } from "@/lib/actions";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

function ProductoEliminar({ producto }) {
    const formId = useId();
    const [state, action, pending] = useActionState(eliminarProducto, {});

    useEffect(() => {
        if (state.success) {
            toast.success('Producto eliminado con éxito');
            document.getElementById(formId)?.closest("dialog")?.close();
            // Refresh the page or update the product list
            window.location.reload();
        } else if (state.error) {
            toast.error(state.error || 'Error al eliminar el producto');
        }
    }, [state, formId]);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <Trash2Icon className="text-red-500" size={24} />
                <h1 className="text-2xl font-bold text-red-600">Eliminar Producto</h1>
            </div>
            
            <div className="mb-6">
                <p className="text-lg font-medium">¿Está seguro que desea eliminar este producto?</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="font-semibold">{producto.name}</p>
                    <p className="text-sm text-gray-600">ID: {producto.id}</p>
                    {producto.image && (
                        <img 
                            src={producto.image} 
                            alt={producto.name} 
                            className="mt-2 w-32 h-32 object-cover rounded"
                        />
                    )}
                </div>
                
                <p className="mt-4 text-red-500">
                    ¡Advertencia! Esta acción no se puede deshacer. Se eliminarán también:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 mt-2">
                    <li>Todos los diseños personalizados asociados</li>
                    <li>Referencias en carritos de compra</li>
                    <li>Referencias en pedidos históricos</li>
                </ul>
            </div>

            <form action={action} id={formId} className="flex justify-end gap-3">
                <input type="hidden" name="id" defaultValue={producto.id} />
                
                <button
                    type="button"
                    onClick={() => document.getElementById(formId)?.closest("dialog")?.close()}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
                >
                    Cancelar
                </button>
                
                <button
                    type="submit"
                    disabled={pending}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-2 disabled:bg-red-400"
                >
                    {pending ? (
                        <span className="animate-spin">↻</span>
                    ) : (
                        <Trash2Icon size={18} />
                    )}
                    {pending ? 'Eliminando...' : 'Eliminar Definitivamente'}
                </button>
            </form>
        </div>
    );
}

export default ProductoEliminar;