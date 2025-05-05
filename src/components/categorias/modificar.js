'use client'
import { useEffect } from "react";
import { useId } from "react";
import { useActionState } from "react";
import { modificarCategoria } from "@/lib/actions";  // Asegúrate de que esta función esté importada correctamente
import { toast } from "sonner";  

function CategoriaModificar({ categoria }) {
    const formId = useId();
    const [state, action, pending] = useActionState(modificarCategoria, {}); 

    // Manejo de notificación y cierre del formulario
    useEffect(() => {
        if (state.success) {
            toast.success(state.success);  
            document.getElementById(formId)?.closest("dialog")?.close();  
        }
    }, [state, formId]);

    return (
        <form
            action={action}
            id={formId}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
        >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Modificar Categoría</h2>

            <input type="hidden" name="id" defaultValue={categoria.id} />

            <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">Nombre de la Categoría</label>
                <input
                    name="nombre"
                    id="nombre"
                    defaultValue={categoria.name}
                    placeholder="Nombre de la categoría"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            >
                {pending ? "Modificando..." : "Modificar Categoría"}
            </button>
        </form>
    );
}

export default CategoriaModificar;
