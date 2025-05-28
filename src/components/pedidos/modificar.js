"use client";

import { modificarOrder } from "@/lib/actions";
import {
  PencilIcon,
  RefreshCwIcon,
  CalendarDaysIcon,
  UserIcon,
  MapPinIcon,
  PackageIcon,
  ReceiptIcon,
} from "lucide-react";
import { useActionState, useEffect, useId, useState } from "react";
import { toast } from "sonner";

function PedidoModificar({ pedido }) {
  const formId = useId();
  const [state, action, pending] = useActionState(modificarOrder, {});
  const [status, setStatus] = useState(pedido.status);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      document.getElementById(formId)?.closest("dialog")?.close();
    }
  }, [state]);

  // Cuando cambie el pedido recibido, actualizamos el estado local
  useEffect(() => {
    setStatus(pedido.status);
  }, [pedido.status]);

  const precioTotal = pedido.orderItems.reduce((acc, item) => {
    const precio = item.product?.[0]?.basePrice || 0;
    return acc + precio * item.cantidad;
  }, 0);

  const impuestos = precioTotal * 0.21;
  const total = precioTotal + impuestos;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <PencilIcon className="text-amber-500" />
          Modificar Pedido #{pedido.id}
        </h2>
        <form id={formId} action={action} className="flex flex-col gap-6">
          <input type="hidden" name="id" value={pedido.id} />

          <label className="block">
            <span className="font-semibold text-gray-800 mb-2 block">
              Estado del pedido:
            </span>
            <select
              name="status"
              className="w-full md:w-60 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            >
              <option selected={status === "Pendiente"}  defaultValue="Pendiente">Pendiente</option>
              <option selected={status === "En_proceso"} defaultValue="En_proceso">En proceso</option>
              <option selected={status === "Enviado"} defaultValue="Enviado">Enviado</option>
              <option selected={status === "Entregado"} defaultValue="Entregado">Entregado</option>
              <option selected={status === "Cancelado"} defaultValue="Cancelado">Cancelado</option>
            </select>
          </label>

          {/* Para que el form envíe el valor actualizado, creamos un input oculto */}
          <input type="hidden" name="status" value={status} />

          <button
            type="submit"
            disabled={pending}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-70 text-white font-semibold px-5 py-2.5 rounded-lg transition-shadow shadow-sm hover:shadow-md"
          >
            {pending ? (
              <>
                <RefreshCwIcon className="animate-spin w-5 h-5" />
                Actualizando...
              </>
            ) : (
              <>
                <PencilIcon className="w-5 h-5" />
                Actualizar Pedido
              </>
            )}
          </button>
        </form>
      </div>

      {/* Resto del código igual, sin cambios */}
      {/* Información del pedido */}
      <div className="space-y-6 text-gray-700">
        {/* Datos básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
            <CalendarDaysIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha y hora</p>
              <p className="font-semibold text-gray-800">
                {new Date(pedido.orderDate).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
            <UserIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Cliente</p>
              <p className="font-semibold text-gray-800">
                {pedido.user?.name || "Desconocido"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg md:col-span-2">
            <MapPinIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Dirección de envío</p>
              <p className="font-semibold text-gray-800">
                {pedido.address?.direccion1 || "-"}, {pedido.address?.ciudad || "-"}
                {pedido.address?.codigoPostal && ` (${pedido.address.codigoPostal})`}
              </p>
              <p className="text-sm mt-1 text-gray-600">
                <strong>Email:</strong> {pedido.address?.email || "-"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Teléfono:</strong> {pedido.address?.telefono || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <PackageIcon className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-gray-800">
              Productos ({pedido.orderItems.length})
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {pedido.orderItems.map((item) => {
              const nombre = item.product.name || "Producto";
              const precioUnitario = item.product.basePrice || 0;
              const subtotal = precioUnitario * item.cantidad;
              const image = item.product.image || "/images/default-product.avif";

              return (
                <li
                  key={item.id}
                  className="p-4 hover:bg-gray-50 transition-colors flex gap-4 items-center"
                >
                  <img
                    src={image}
                    alt={nombre}
                    className="w-16 h-16 rounded-md object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{nombre}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <div>
                        <span>Cantidad:</span>
                        {item.cantidad}
                      </div>
                      <div className="text-right ">
                        <span>P.unitario:</span>
                        {precioUnitario.toFixed(2)} €
                      </div>
                      <div className="col-span-2 pt-2 border-t border-gray-100 text-gray-800 font-semibold">
                        Subtotal: {subtotal.toFixed(2)} €
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

export default PedidoModificar;
