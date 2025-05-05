"use client";

import { useEffect } from 'react';
import { useId } from 'react';
import { useFormState } from 'react-dom';  // Changed from useActionState
import { eliminarCategoria } from "@/lib/actions";
import { toast } from "sonner";

function CategoriaEliminar({ categoria }) {
    const formId = useId();
    const [state, action, pending] = useFormState(eliminarCategoria, {});  // Changed to useFormState

    useEffect(() => {
        if (state.success) {
            toast.success('Categoría eliminada con éxito');
            document.getElementById(formId)?.closest("dialog")?.close();
        } else if (state.error) {
            toast.error('Error al eliminar la categoría');
        }
    }, [state, formId]);

    return (
        <>
            <h1 className="text-2xl text-red-600">¿Desea eliminar la siguiente categoría?</h1>
            <p>Nombre de la categoría: {categoria.name}</p>
            
            <form action={action} id={formId} className="mt-4">
                <input type="hidden" name="id" defaultValue={categoria.id} />

                <button
                    type="submit"
                    disabled={pending}
                    className="border-2 border-black p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                    {pending ? 'Eliminando...' : 'Eliminar Categoría'}
                </button>
            </form>
        </>
    );
}

export default CategoriaEliminar;