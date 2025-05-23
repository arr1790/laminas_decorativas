
import { auth } from "@/auth";
import { insertarOrder, restarAlCarrito, sumarAlCarrito } from "@/lib/actions";
import { obtenerCarrito } from "@/lib/data";
import { redirect } from "next/navigation";
import provincias from "@/lib/provincias";
import paisesUE from "@/lib/paisesUE";

async function page() {
    const session = await auth()

    if (!session) {
        redirect('/auth/login')
    }
    const carrito = session ? await obtenerCarrito(session.user.id) : []

    const precioTotal = carrito.orderItems.reduce((total, item) => {
        return total + item.product[0].basePrice * item.cantidad;
    }, 0);

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Carrito</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Producto</th>
                                        <th className="text-left font-semibold">Precio</th>
                                        <th className="text-left font-semibold">Cantidad</th>
                                        <th className="text-left font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.orderItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <img className="h-30 w-20 mr-4" src={item.product[0].image} alt="Product image" />
                                                    <span className="font-semibold">{item.product[0].name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">{item.product[0].basePrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</td>
                                            <td className="py-4
                                            ">
                                                <div className="flex items-center gap-1">
                                                    <form action={restarAlCarrito}>
                                                        <input type="hidden" name="orderItemId" value={item.id} />
                                                        <button
                                                            type="submit"
                                                            className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                                            aria-label="Restar uno"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </form>

                                                    <p className="text-gray-700 w-5 text-center">{item.cantidad}</p>

                                                    <form action={sumarAlCarrito}>
                                                        <input type="hidden" name="orderItemId" value={item.id} />
                                                        <button
                                                            type="submit"
                                                            className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                                            aria-label="Sumar uno"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </form>
                                                </div>

                                            </td>
                                            <td className="py-4">{(item.product[0].basePrice * item.cantidad).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Sección de Contacto y Dirección */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <h2 className="text-xl font-semibold mb-4">Contacto</h2>

                            <div className="mb-6">
                                <h3 className="font-medium mb-2">Correo electrónico</h3>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="newsletter"
                                        className="mr-2 h-4 w-4 text-blue-600 rounded"
                                    />
                                    <label htmlFor="newsletter">Envíame novedades y ofertas por correo electrónico</label>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h2 className="text-xl font-semibold mb-4">Dirección de envío</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Nombre</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            placeholder="Nombre"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Apellidos</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            placeholder="Apellidos"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Dirección</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder="Dirección"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Casa, apartamento, etc. (opcional)</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder="Piso, puerta, etc."
                                    />
                                </div>

                                {/* Grupo de País, Provincia y Código Postal */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">País/Región</label>
                                        <select
                                            name="pais"
                                            defaultValue="España"
                                            required
                                            className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-2 appearance-none focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                        >
                                            {paisesUE.map((pais) => (
                                                <option key={pais} value={pais}>{pais}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Provincia</label>
                                        <select
                                            name="provincia"
                                            defaultValue="La Coruña"
                                            required
                                            className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-2 appearance-none focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                        >
                                            {provincias.map((prov) => (
                                                <option key={prov} value={prov}>{prov}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Código postal</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            placeholder="Código postal"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Ciudad</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            placeholder="Ciudad"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Teléfono</label>
                                        <input
                                            type="tel"
                                            className="w-full p-2 border rounded"
                                            placeholder="Teléfono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-lg font-semibold mb-4">Resumen</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>{precioTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Impuestos</span>
                                <span>{(precioTotal * 0.21).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Gastos de envío</span>
                                <span>Gratis</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">{(precioTotal * 1.21).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
                            </div>
                            <form action={insertarOrder}>
                                <input type="hidden" name="userId" value={session.user.id} />
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-600 transition">
                                    Finalizar Pedido
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;