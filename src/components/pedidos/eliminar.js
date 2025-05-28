"use client";

import { deleteOrder } from "@/lib/actions";
import { RefreshCwIcon, TrashIcon, CalendarDaysIcon, UserIcon, MapPinIcon, PackageIcon, ReceiptIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function PedidoEliminar({ pedido }) {
  const formId = useId();
  const [state, action, pending] = useActionState(deleteOrder, {});

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      document.getElementById(formId)?.closest("dialog")?.close();
    }
  }, [state]);

  const precioTotal = pedido.orderItems.reduce((acc, item) => {
    const precio = item.product?.[0]?.basePrice || 0;
    return acc + precio * item.cantidad;
  }, 0);

  const impuestos = precioTotal * 0.21;
  const total = precioTotal + impuestos;

  return (
    <div className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-100">
      {/* Encabezado */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <PackageIcon className="text-blue-500" />
          Pedido #{pedido.id}
        </h2>
        <form id={formId} action={action} className="flex justify-end">
          <input type="hidden" name="id" value={pedido.id} />
          <button
            type="submit"
            disabled={pending}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-70 text-white font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            {pending ? (
              <>
                <RefreshCwIcon className="animate-spin w-5 h-5" />
                Eliminando...
              </>
            ) : (
              <>
                <TrashIcon className="w-5 h-5" />
                Eliminar Pedido
              </>
            )}
          </button>
        </form>
      </div>

      {/* Información del pedido */}
      <div className="space-y-6 text-gray-700">
        {/* Datos básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
            <CalendarDaysIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha y hora</p>
              <p className="font-semibold text-gray-800">
                {new Date(pedido.orderDate).toLocaleString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
            <UserIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Cliente</p>
              <p className="font-semibold text-gray-800">
                {pedido.user?.name || "Desconocido"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg md:col-span-2">
            <MapPinIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Dirección de envío</p>
              <p className="font-semibold text-gray-800">
                {pedido.address?.direccion1 || "-"}, {pedido.address?.ciudad || "-"}
                {pedido.address?.codigoPostal && ` (${pedido.address.codigoPostal})`}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <PackageIcon className="w-4 h-4 text-blue-500" />
              Productos ({pedido.orderItems.length})
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {pedido.orderItems.map((item) => {
              const nombre = item.product?.[0]?.name || "Producto";
              const precioUnitario = item.product?.[0]?.basePrice || 0;
              const subtotal = precioUnitario * item.cantidad;
              const image = item.product?.[0]?.image || "/images/default-product.avif";
              
              return (
                <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <img
                      src={image}
                      alt={nombre}
                      className="w-16 h-16 rounded-md object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{nombre}</h4>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <span className="text-gray-500">Cantidad:</span> {item.cantidad}
                        </div>
                        <div className="text-right">
                          <span className="text-gray-500">P. unitario:</span> {precioUnitario.toFixed(2)} €
                        </div>
                        <div className="col-span-2 pt-2 border-t border-gray-100">
                          <span className="text-gray-500">Subtotal:</span> <span className="font-medium">{subtotal.toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Resumen de pago */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <ReceiptIcon className="w-5 h-5 text-blue-600" />
            Resumen del pago
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{precioTotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Impuestos (21%):</span>
              <span className="font-medium">{impuestos.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío:</span>
              <span className="font-medium text-green-600">Gratis</span>
            </div>
            <div className="border-t border-blue-200 my-3"></div>
            <div className="flex justify-between text-lg font-bold text-blue-800">
              <span>Total:</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PedidoEliminar;