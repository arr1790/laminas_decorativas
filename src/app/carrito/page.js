import { auth } from "@/auth";
import { insertarOrden, restarAlCarrito, sumarAlCarrito } from "@/lib/actions";
import { obtenerCarrito } from "@/lib/data";

async function page() {

    const session = await auth()
    const carrito = session ? await obtenerCarrito(session.user.id) : []

      const precioTotal = carrito.orderItems.reduce((total, item) => {
  return total + item.product[0].basePrice * item.cantidad;
}, 0);

    return (<div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left font-semibold">Product</th>
                                    <th className="text-left font-semibold">Price</th>
                                    <th className="text-left font-semibold">Quantity</th>
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
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                 <form key={item.id + "kei"}  action={restarAlCarrito}> <button type="submit" className="font-medium text-indigo-600 hover:text-indigo-500">Restar</button> <input type="hidden" name='orderItemId' value={item.id} /> </form>
                                                                          <p className="text-gray-500">{item.cantidad}</p>
                                                                          <form key={item.id + "keo"} action={sumarAlCarrito}> <button type="submit" className="font-medium text-indigo-600 hover:text-indigo-500">Sumar</button> <input type="hidden" name='orderItemId' value={item.id} /> </form>
                                                
                                            </div>
                                        </td>
                                        <td className="py-4">{(item.product[0].basePrice * item.cantidad).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</td>
                                    </tr>
                                ))}
                                

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="md:w-1/4">
                {/* lateral carrito */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>{precioTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Taxes</span>
                            <span>{(precioTotal*0.21).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">{(precioTotal*1.21).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
                        </div>
                        <form action={insertarOrden}> 
                            <input type="hidden" name="userId" value={session.user.id} />
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                   </form>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default page;