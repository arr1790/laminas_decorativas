"use client";
import { useState } from "react";

import Modal from "@/components/modal";
import ActualizarImagenUsuario from "@/components/ActualizarImagenUsuario";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import CerrarSesionButton from "@/app/perfil/CerrarSesionButton";

export default function PerfilUsuario({ sesion, pedidos, userImage }) {
  const [pedidoActivo, setPedidoActivo] = useState(null);


  return (
    <div className="max-w-7xl mx-auto py-16 px-6 text-gray-800 font-light">
      <div className="grid md:grid-cols-3 gap-12 items-start">
        {/* Historial de pedidos */}
        <div>
          <h2 className="text-xl font-medium mb-4">HISTORIAL DE PEDIDOS</h2>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="border p-4 rounded shadow mb-4 flex flex-col gap-2"
              >
                <div>
                  <p className="text-sm text-gray-700">Cliente: {pedido.user.name}</p>
                  <p className="text-sm text-gray-700">
                    Fecha: {new Date(pedido.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700">Estado: {pedido.status}</p>
                  <p className="text-sm text-gray-700">Dirección: {pedido.address?.direccion1}</p>
                </div>
                <button
                  onClick={() => setPedidoActivo(pedido)}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Ver detalles
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No has realizado ningún pedido aún.</p>
          )}
        </div>

        {/* Perfil */}
        <div className="text-center">
          <h1 className="text-3xl font-medium mb-4 tracking-widest">MI CUENTA</h1>
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img
              src={userImage}
              alt="Avatar"
              className="w-full h-full rounded-full border border-gray-300 object-cover"
            />
            <div className="absolute bottom-0 right-0">
              <Modal
                openElement={
                  <button className="bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100">
                    <PencilIcon className="w-4 h-4 text-gray-700" />
                  </button>
                }
              >
                <ActualizarImagenUsuario userId={sesion.user.id} />
              </Modal>
            </div>
          </div>
          <p className="uppercase text-xs tracking-wide text-gray-500">{sesion?.user.name}</p>
          <p className="text-sm text-gray-600">{sesion?.user.email}</p>
          <CerrarSesionButton />
        </div>

        {/* Dirección */}
        <div className="text-right">
          <h2 className="text-xl font-medium mb-2 tracking-wide">DETALLES DE LA CUENTA</h2>
          <p className="uppercase text-xs tracking-wide text-gray-500">{sesion?.user.name}</p>
          <p className="text-sm text-gray-600">España</p>
          <Link
            href="/direcciones"
            className="text-sm mt-2 text-indigo-500 hover:underline block"
          >
            Ver direcciones
          </Link>
        </div>
      </div>

      {/* Modal de pedido */}
      {pedidoActivo && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-center">
              Factura - Laminara
            </h2>

            <div className="flex justify-between mb-8 flex-wrap gap-6">
              {/* Datos del usuario */}
              <div className="flex-1 min-w-[280px]">
                <h3 className="text-xl font-semibold mb-4">Datos del Cliente</h3>
                <p><strong>Nombre:</strong> {pedidoActivo?.user.name}</p>
                <p><strong>Email:</strong> {pedidoActivo?.user.email}</p>
                <p><strong>Fecha:</strong> {new Date(pedidoActivo?.orderDate).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {pedidoActivo?.status}</p>
              </div>

              {/* Dirección de envío */}
              <div className="flex-1 min-w-[280px] text-right">
                <h3 className="text-xl font-semibold mb-4">Dirección de Envío</h3>
                <p>{pedidoActivo.address?.direccion1}</p>
                <p>{pedidoActivo.address?.direccion2}</p>
                <p>{pedidoActivo.address?.ciudad}, {pedidoActivo.address?.codigoPostal}</p>
                <p>{pedidoActivo.address?.pais}</p>
              </div>
            </div>

            <hr className="border-gray-300 mb-8" />

            <h3 className="text-2xl font-semibold mb-6">Detalles del Pedido</h3>
            <div className="space-y-6">
              {pedidoActivo?.orderItems.map((item) => (
                <div key={item.id} className="flex gap-6 items-center border-b border-gray-200 pb-4">
                  <img
                    className="w-28 h-28 object-cover rounded-lg"
                    src={item.product.image}
                    alt={item.product.name}
                  />
                  <div className="flex-grow">
                    <p className="text-lg font-semibold">{item.product.name}</p>
                    <p><strong>Cantidad:</strong> {item.cantidad}</p>
                    <p><strong>Precio:</strong> {item.product.basePrice.toFixed(2)} €</p>
                    <p><strong>Dimensiones:</strong> {item.product.dimensions}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-gray-300 pt-6">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  {pedidoActivo.orderItems
                    .reduce((total, item) => total + item.cantidad * (item.product.basePrice ?? 0), 0)
                    .toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Impuestos</span>
                <span>
                  {(
                    pedidoActivo.orderItems.reduce(
                      (total, item) => total + item.cantidad * (item.product.basePrice ?? 0),
                      0
                    ) * 0.21
                  ).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Gastos de envío</span>
                <span>Gratis</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>
                  {(
                    pedidoActivo.orderItems.reduce(
                      (total, item) => total + item.cantidad * (item.product.basePrice ?? 0),
                      0
                    ) * 1.21
                  ).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
                </span>
              </div>
            </div>
            <div className="text-center mt-10">
              <button
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition"
                onClick={() => setPedidoActivo(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
