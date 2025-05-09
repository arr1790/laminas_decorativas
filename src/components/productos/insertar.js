'use client'
import { useEffect } from "react";
import { useId } from "react";
import { useActionState } from "react";
import { insertarProducto } from "@/lib/actions";
import { toast } from "sonner";

function ProductoInsertar() {
    const formId = useId();
    const [state, action, pending] = useActionState(insertarProducto, {});

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
            className="bg-white p-6 rounded shadow-md space-y-4"
        >
            <div>
                <label className="block mb-2">Nombre del Producto:</label>
                <input 
                    name="name"
                    placeholder="Nombre del producto" 
                    required 
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label className="block mb-2">Descripción:</label>
                <textarea 
                    name="description"
                    placeholder="Descripción del producto" 
                    required 
                    className="border p-2 rounded w-full"
                    rows={3}
                />
            </div>

            <div>
                <label className="block mb-2">Precio Base:</label>
                <input 
                    name="basePrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00" 
                    required 
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label className="block mb-2">Dimensiones:</label>
                <input 
                    name="dimensions"
                    placeholder="Ej: 30x40cm" 
                    required 
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="flex items-center gap-2">
                <input 
                    name="withFrame"
                    type="checkbox"
                    id="withFrame"
                    className="h-4 w-4"
                />
                <label htmlFor="withFrame">Incluye marco</label>
            </div>

            <div>
                <label className="block mb-2">URL de la Imagen:</label>
                <input 
                    name="image"
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg" 
                    required 
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label className="block mb-2">ID de Categoría:</label>
                <input 
                    name="categoryId"
                    type="number"
                    placeholder="1" 
                    required 
                    className="border p-2 rounded w-full"
                />
            </div>

            <button 
                type="submit" 
                disabled={pending}
                className="border-2 border-black bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition"
            >
                {pending ? "Insertando producto..." : "Insertar Producto"}
            </button>
        </form>
    );
}

export default ProductoInsertar;