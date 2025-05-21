'use client'
import { useEffect } from "react";
import { useId } from "react";
import { useActionState } from "react";
import { modificarProducto } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function ProductoModificar({ producto, categories }) {
    const formId = useId();
    const [state, action, pending] = useActionState(modificarProducto, {});

    useEffect(() => {
        if (state.success) {
            toast.success(state.success);
            document.getElementById(formId)?.closest("dialog")?.close();
        }
        if (state.error) {
            toast.error(state.error);
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

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Nombre del Producto *</label>
                    <input
                        name="name"
                        defaultValue={producto.name}
                        placeholder="Nombre del producto"
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Descripción *</label>
                    <textarea
                        name="description"
                        defaultValue={producto.description}
                        placeholder="Descripción del producto"
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 min-h-[100px]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Precio Base *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3">$</span>
                            <input
                                name="basePrice"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={producto.basePrice}
                                placeholder="0.00"
                                required
                                className="w-full p-3 pl-8 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Dimensiones *</label>
                        <input
                            name="dimensions"
                            defaultValue={producto.dimensions}
                            placeholder="30x40cm"
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            name="withFrame"
                            type="checkbox"
                            id="withFrame"
                            defaultChecked={producto.withFrame}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="withFrame" className="text-gray-700">Incluye marco</label>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Imagen Principal *</label>
                    <input
                        name="image"
                        type="url"
                        defaultValue={producto.image}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    {producto.image && (
                        <div className="mt-2">
                            <img 
                                src={producto.image} 
                                alt="Preview" 
                                className="h-32 w-32 object-cover rounded border"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Imagen Hover (Opcional)</label>
                    <input
                        name="hoverImage"
                        type="url"
                        defaultValue={producto.hoverImage || ''}
                        placeholder="https://ejemplo.com/hover-image.jpg"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    {producto.hoverImage && (
                        <div className="mt-2">
                            <img 
                                src={producto.hoverImage} 
                                alt="Hover Preview" 
                                className="h-32 w-32 object-cover rounded border"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Categoría *</label>
                    <select
                        name="categoryId"
                        defaultValue={producto.categoryId}
                        required
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={pending}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
                {pending ? (
                    <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        <span>Guardando cambios...</span>
                    </>
                ) : (
                    "Actualizar Producto"
                )}
            </button>

            {state.error && (
                <p className="text-red-500 text-sm mt-2">{state.error}</p>
            )}
        </form>
    );
}

export default ProductoModificar;