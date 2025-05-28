import { obtenerPedidos, obtenerProductos, getUsers } from "@/lib/data";
import PedidoInsertar from "./insertar";
import PedidoModificar from "./modificar";
import PedidoEliminar from "./eliminar";

import { PencilIcon, PlusIcon, TrashIcon, ClockIcon, UserIcon } from "lucide-react";

import { auth } from "@/auth";
import Modal from "../modal";

export default async function Pedidos() {
  const session = await auth();
  if (!session) return null;

  const user = session.user;
  const pedidos = user.role === "ADMIN"
    ? await obtenerPedidos()
    : await obtenerPedidos(user.id);
  const productos = await obtenerProductos();
  const usuarios = user.role === "ADMIN" ? await getUsers() : [];

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  };

  const getUserName = (userId) => {
    const usuario = usuarios.find(u => u.id === userId);
    return usuario ? `${usuario.name} (${usuario.email})` : "Usuario no encontrado";
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8">
      <div className="w-full max-w-6xl">

        {user.role === "ADMIN" && (
          <div className="flex justify-end mb-6">
            <Modal
              openElement={
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
                  <PlusIcon className="w-5 h-5" />
                  <span className="font-medium">Nuevo Pedido</span>
                </button>
              }
            >
              <PedidoInsertar user={user} products={productos} />
            </Modal>
          </div>
        )}

        {pedidos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-lg font-medium">
              No hay pedidos registrados.
            </div>
          </div>
        ) : (
          // Desktop Table
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pedido</th>
                  {user.role === "ADMIN" && (
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usuario</th>
                  )}
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Productos</th>
                  <th className="py-4 px-6 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Total (€)</th>
                  {user.role === "ADMIN" && <th className="py-4 px-6"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pedidos
                  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                  .map((pedido) => (
                    <tr
                      key={pedido.id}
                      className="hover:bg-gray-50/50 transition-colors"
                      title={`Ver detalles del pedido #${pedido.id}`}
                    >
                      <td className="py-5 px-6 font-medium text-gray-900 whitespace-nowrap">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          #{pedido.id}
                        </span>
                      </td>
                      {user.role === "ADMIN" && (
                        <td className="py-5 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <UserIcon className="w-4 h-4 text-gray-400" />
                            {getUserName(pedido.userId)}
                          </div>
                        </td>
                      )}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          {formatDate(pedido.orderDate)}
                        </div>
                      </td>
                      <td className="py-5 px-6 max-w-[280px]">
                        <ul className="flex flex-col gap-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50">
                          {pedido.orderItems.map((item) => (
                            <li key={item.id} className="flex items-start gap-3">
                              <img
                                src={item.product.image || "/images/default-product.avif"}
                                alt={item.product.name || "Producto"}
                                className="w-10 h-10 rounded-md object-cover flex-shrink-0 border border-gray-200"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{item.product.name || "Producto"}</p>
                                <p className="text-xs text-gray-500">
                                  {item.cantidad} × {item.product.basePrice?.toFixed(2)} €
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <span className="font-semibold text-gray-900 text-lg">
                          {pedido.total
                            ? pedido.total.toFixed(2)
                            : pedido.orderItems.reduce(
                                (acc, item) => acc + (item.product?.basePrice || 0) * item.cantidad,
                                0
                              ).toFixed(2)}{" "}
                          €
                        </span>
                      </td>
                      {user.role === "ADMIN" && (
                        <td className="py-5 px-6 text-right whitespace-nowrap">
                          <div className="flex gap-2 justify-end">
                            <Modal
                              openElement={
                                <button
                                  className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors hover:shadow-sm"
                                  aria-label={`Editar pedido #${pedido.id}`}
                                >
                                  <PencilIcon className="w-5 h-5" />
                                </button>
                              }
                            >
                              <PedidoModificar pedido={pedido} productos={productos} user={user} />
                            </Modal>

                            <Modal
                              openElement={
                                <button
                                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors hover:shadow-sm"
                                  aria-label={`Eliminar pedido #${pedido.id}`}
                                >
                                  <TrashIcon className="w-5 h-5" />
                                </button>
                              }
                            >
                              <PedidoEliminar pedido={pedido} />
                            </Modal>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-6 w-full">
          {pedidos
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .map((pedido) => (
              <div
                key={pedido.id}
                className="bg-white border border-gray-200 rounded-xl shadow p-5"
                title={`Ver detalles del pedido #${pedido.id}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    #{pedido.id}
                  </span>
                  <span className="font-semibold text-gray-900 text-lg">
                    {pedido.total
                      ? pedido.total.toFixed(2)
                      : pedido.orderItems.reduce(
                          (acc, item) => acc + (item.product?.basePrice || 0) * item.cantidad,
                          0
                        ).toFixed(2)}{" "}
                    €
                  </span>
                </div>

                {user.role === "ADMIN" && (
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-700">
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    {getUserName(pedido.userId)}
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  {formatDate(pedido.orderDate)}
                </div>

                <ul className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50 space-y-3">
                  {pedido.orderItems.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image || "/images/default-product.avif"}
                        alt={item.product.name || "Producto"}
                        className="w-12 h-12 rounded-md object-cover flex-shrink-0 border border-gray-200"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.product.name || "Producto"}</p>
                        <p className="text-xs text-gray-500">
                          {item.cantidad} × {item.product.basePrice?.toFixed(2)} €
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {user.role === "ADMIN" && (
                  <div className="flex gap-4 mt-5 justify-end">
                    <Modal
                      openElement={
                        <button
                          className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors hover:shadow-sm"
                          aria-label={`Editar pedido #${pedido.id}`}
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                      }
                    >
                      <PedidoModificar pedido={pedido} productos={productos} user={user} />
                    </Modal>

                    <Modal
                      openElement={
                        <button
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors hover:shadow-sm"
                          aria-label={`Eliminar pedido #${pedido.id}`}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      }
                    >
                      <PedidoEliminar pedido={pedido} />
                    </Modal>
                  </div>
                )}
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}