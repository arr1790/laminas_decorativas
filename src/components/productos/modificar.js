'use client'
import { useEffect } from "react";
import { useId } from "react";
import { useActionState } from "react";
import { modificarProducto } from "@/lib/actions";
import { toast } from "sonner";

function ProductoModificar({ producto }) {
    const formId = useId();
    const [state, action, pending] = useActionState(modificarProducto, {});

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
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-4"
        >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Modificar Producto</h2>

            <input type="hidden" name="id" defaultValue={producto.id} />

            <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre del Producto</label>
                <input
                    name="name"
                    defaultValue={producto.name}
                    placeholder="Nombre del producto"
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Descripción</label>
                <textarea
                    name="description"
                    defaultValue={producto.description}
                    placeholder="Descripción del producto"
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    rows={3}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Precio Base</label>
                <input
                    name="basePrice"
                    type="number"
                    step="0.01"
                    defaultValue={producto.basePrice}
                    placeholder="0.00"
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Dimensiones</label>
                <input
                    name="dimensions"
                    defaultValue={producto.dimensions}
                    placeholder="Ej: 30x40cm"
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    name="withFrame"
                    type="checkbox"
                    id="withFrame"
                    defaultChecked={producto.withFrame}
                    className="h-4 w-4"
                />
                <label htmlFor="withFrame">Incluye marco</label>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">URL de la Imagen</label>
                <input
                    name="image"
                    type="url"
                    defaultValue={producto.image}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">ID de Categoría</label>
                <input
                    name="categoryId"
                    type="number"
                    defaultValue={producto.categoryId}
                    placeholder="1"
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            >
                {pending ? "Modificando producto..." : "Modificar Producto"}
            </button>
        </form>
    );
}

export default ProductoModificar;