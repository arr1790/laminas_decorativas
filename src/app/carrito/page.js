import { auth } from "@/auth";
import { eliminarDelCarrito, insertarOrder, restarAlCarrito, sumarAlCarrito } from "@/lib/actions";
import { obtenerCarrito, obtenerDireccionesPorUserId } from "@/lib/data";
import { redirect } from "next/navigation";
import provincias from "@/lib/provincias";
import paisesUE from "@/lib/paisesUE";
import Footer from "@/components/footer";

async function page() {
    const session = await auth();
    const direccion = await obtenerDireccionesPorUserId(session.user.id);

    if (!session) {
        redirect('/auth/login');
    }

    const carrito = session ? await obtenerCarrito(session.user.id) : [];

    const precioTotal = carrito.orderItems.reduce((total, item) => {
        return total + item.product.basePrice * item.cantidad;
    }, 0);

    if (precioTotal === 0) {
        return (
            <img
                className="w-24 h-auto  object-contain mx-auto"
                src={item.product.image}
                alt="Product image"
            />


        );
    }

    return (
        <>
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Carrito</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold pb-2">Producto</th>
                                            <th className="text-left font-semibold pb-2">Precio</th>
                                            <th className="text-left font-semibold pb-2">Cantidad</th>
                                            <th className="text-left font-semibold pb-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carrito.orderItems.map((item) => (
                                            <tr key={item.id} className="border-t">
                                                <td className="py-4">
                                                    <div className="flex flex-col md:flex-row items-center gap-2">
                                                        <img className="h-24 w-auto object-contain" src={item.product.image} alt="Product image" />

                                                        <span className="font-semibold text-center md:text-left">{item.product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    {item.product.basePrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-1">
                                                        <div className="flex items-center gap-1">
                                                            <form action={restarAlCarrito}>
                                                                <input type="hidden" name="orderItemId" value={item.id} />
                                                                <button type="submit" className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100" aria-label="Restar uno">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                            </form>

                                                            <p className="text-gray-700 w-5 text-center">{item.cantidad}</p>

                                                            <form action={sumarAlCarrito}>
                                                                <input type="hidden" name="orderItemId" value={item.id} />
                                                                <button type="submit" className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100" aria-label="Sumar uno">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                            </form>
                                                        </div>

                                                        {/* Botón eliminar se muestra debajo en móviles */}
                                                        <form action={eliminarDelCarrito} className="md:ml-4">
                                                            <input type="hidden" name="orderItemId" value={item.id} />
                                                            <button type="submit" className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100" aria-label="Eliminar producto">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M6 7a1 1 0 012 0v7a1 1 0 11-2 0V7zm4 0a1 1 0 012 0v7a1 1 0 11-2 0V7zM4 5h12v2H4V5zm3-2h2v1H7V3zM5 6h10l-1 9a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    {(item.product.basePrice * item.cantidad).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>




                        <form action={insertarOrder} className="max-w-6xl mx-auto px-4 py-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Información de contacto y envío */}
                                <div className="md:col-span-2">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h2 className="text-2xl font-bold mb-6">Dirección de envío</h2>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                                    <input name="nombre" defaultValue={direccion?.nombre ?? ''} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300" placeholder="Nombre" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                                                    <input name="apellido" defaultValue={direccion?.apellido ?? ''} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300" placeholder="Apellidos" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                                <input name="direccion1" defaultValue={direccion?.direccion1 ?? ''} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300" placeholder="Dirección" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Casa, apartamento, etc. (opcional)</label>
                                                <input name="direccion2" defaultValue={direccion?.direccion2 ?? ''} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300" placeholder="Piso, puerta, etc." />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">País/Región</label>
                                                    <select name="pais" defaultValue={direccion?.pais ?? "España"} required className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-300">
                                                        {paisesUE.map((pais) => (
                                                            <option key={pais} value={pais}>{pais}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                                                    <select name="provincia" defaultValue={direccion?.provincia ?? "La Coruña"} required className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-300">
                                                        {provincias.map((prov) => (
                                                            <option key={prov} value={prov}>{prov}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                                                    <input name="codigoPostal" defaultValue={direccion?.codigoPostal ?? ''} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300" placeholder="Código postal" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                                                    <input name="ciudad" defaultValue={direccion?.ciudad ?? ''} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300" placeholder="Ciudad" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                                    <input name="telefono" defaultValue={direccion?.telefono ?? ''} type="tel" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300" placeholder="Teléfono" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input name="email" defaultValue={direccion?.email ?? session.user.email ?? ''} type="email" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300" placeholder="ejemplo@ejemplo.com" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Resumen del pedido */}
                                <div className="sticky top-4">
                                    <div className="bg-white rounded-lg shadow-md p-6">
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
                                        <hr className="my-4" />
                                        <div className="flex justify-between font-semibold text-lg mb-4">
                                            <span>Total</span>
                                            <span>{(precioTotal * 1.21).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
                                        </div>

                                        <input type="hidden" name="userId" value={session.user.id} />
                                        <button type="submit" className="bg-black text-white py-3 px-4 rounded-lg w-full  hover:text-white transition font-semibold">
                                            Finalizar Pedido
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default page;
