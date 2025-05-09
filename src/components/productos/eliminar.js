"use client";

import { useEffect } from 'react';
import { useId } from 'react';
import { useActionState } from 'react';
import { eliminarProducto } from "@/lib/actions";
import { toast } from "sonner";

function ProductoEliminar({ producto }) {
    const formId = useId();
    const [state, action, pending] = useActionState(eliminarProducto, {});

    useEffect(() => {
        if (state.success) {
            toast.success('Producto eliminado con éxito');
            document.getElementById(formId)?.closest("dialog")?.close();
        } else if (state.error) {
            toast.error('Error al eliminar el producto');
        }
    }, [state, formId]);
 

    return (
        <>
            <h1 className="text-2xl text-red-600">¿Desea eliminar el siguiente producto?</h1>
            <p>Nombre del producto: {producto.name}</p>

            <form action={action} id={formId} className="mt-4">
                <input type="hidden" name="id" defaultValue={producto.id} />

                <button
                    type="submit"
                    disabled={pending}
                    className="border-2 border-black p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                    {pending ? 'Eliminando...' : 'Eliminar Producto'}
                </button>
            </form>
        </>
    );
}

export default ProductoEliminar;
