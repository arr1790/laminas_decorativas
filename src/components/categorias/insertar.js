'use client'
import { useEffect } from "react";
import { useId } from "react";
import { useActionState } from "react";
import { insertarCategoria } from "@/lib/actions";  
import { useRouter } from "next/navigation";
import { toast } from "sonner";  

function CategoriaInsertar() {
    const formId = useId();
    const [state, action, pending] = useActionState(insertarCategoria, {});  

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
            className="bg-white p-6 rounded shadow-md"
        >
            <label className="block mb-2">Nombre de la Categoría:</label>
            <input 
                name="name"  // Este es el campo correspondiente para el nombre de la categoría
                placeholder="Nombre de la categoría" 
                required 
                className="border p-2 rounded w-full mb-4"
            />

            <button 
                type="submit" 
                disabled={pending}  // Desactiva el botón mientras se realiza la acción
                className="border-2 border-black bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition"
            >
                {pending ? "Insertando..." : "Insertar Categoría"}  {/* Cambié el texto del botón */}
            </button>
        </form>
    );
}

export default CategoriaInsertar;
