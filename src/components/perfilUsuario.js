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
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
            <h2 className="text-xl font-bold mb-4">Factura del pedido</h2>
            <div>
              <p><strong>Nombre:</strong> {pedidoActivo?.user.name}</p>
              <p><strong>Email:</strong> {pedidoActivo?.user.email}</p>
              <p><strong>Fecha:</strong> {new Date(pedidoActivo?.orderDate).toLocaleDateString()}</p>
              <p><strong>Estado:</strong> {pedidoActivo?.status}</p>
            </div>
            {pedidoActivo?.orderItems.map((item) => (
              <div key={item.id}>
                <img className="w-32 h-32" src={ item.product[0].image} alt="" />
                <p><strong>cantidad:</strong> {item.cantidad}</p>
                  <p><strong>nombre:</strong> {item.product[0].name}</p>
                  <p><strong>precio:</strong> {item.product[0].basePrice} €</p>
                  <p><strong>Estado:</strong> {item.product[0].dimensions}</p>
              </div>
            ))}


            {/* Puedes mostrar más detalles aquí como productos, precio, etc. */}

            <button
              className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={() => setPedidoActivo(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
