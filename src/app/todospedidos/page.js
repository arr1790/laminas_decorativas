import { deleteOrder, getAllOrders, modificarOrder } from "@/lib/actions";

export default async function Page() {
  const pedidos = await getAllOrders() || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Gestión de Pedidos</h1>

      {pedidos.length > 0 ? (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
            >
              {/* Datos del pedido */}
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Nombre:</span> {pedido.user.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Fecha:</span>{" "}
                  {new Date(pedido.orderDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Estado:</span> {pedido.status}
                </p>
              </div>

              {/* Modificar estado */}
              <form action={modificarOrder} className="flex flex-col gap-2">
                <input type="hidden" name="id" value={pedido.id} />
                <select
                  name="status"
                  defaultValue={pedido.status}
                  className="border border-gray-300 rounded p-2 text-sm text-gray-700"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregado">Entregado</option>
                </select>
                <button className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 text-sm transition">
                  Actualizar Estado
                </button>
              </form>

              {/* Eliminar pedido */}
              <form action={deleteOrder} className="flex flex-col gap-2 items-start md:items-end">
                <input type="hidden" name="id" value={pedido.id} />
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-sm transition">
                  Eliminar Pedido
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">No se ha realizado ningún pedido aún.</p>
      )}
    </div>
  );
}
