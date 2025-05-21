import { deleteOrder, getAllOrders } from "@/lib/actions";

async function page() {

    const pedidos = await getAllOrders() || [];
    return (
        <>
        {
            pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                    <div key={pedido.id} className="flex items-center justify-between border p-4 rounded shadow mb-4">
                        <div>
                            <p className="text-sm text-gray-700">Nombre: {pedido.user.name}</p>
                            <p className="text-sm text-gray-700">
                                Fecha: {new Date(pedido.orderDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-700">Estado: {pedido.status}</p>
                        </div>
                        <form action={deleteOrder}>
                            <input type="hidden" name="id" value={pedido.id} />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                eliminar
                            </button>
                        </form>
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-500 italic">No has realizado algún pedido aún.</p>
            )
        }
   </> )
}

export default page;