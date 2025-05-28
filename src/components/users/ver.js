'use client';
import React from 'react';

function UserVer({ user }) {
  if (!user) return null;

  user.image = user.image || '/images/avatar-80.png';


  return (
    <div className="space-y-6 p-4 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <div className="grid md:grid-cols-[120px_auto] gap-6 items-center">
        <img
          src={user.image}
          alt="Imagen de usuario"
          width={192}
          height={192}
          className="rounded-full object-cover border-4 border-green-400"
        />

        <div>
          {user.active ? (
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">
              Cuenta activada
            </p>
          ) : (
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
              Cuenta desactivada
            </p>
          )}

          <h1 className="font-extrabold text-3xl text-gray-900">{user.name}</h1>
          <p className="mt-2 text-gray-600 italic">{user.email}</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">
          Pedidos realizados
        </h2>

       
        {user.orders && user.orders.length > 0 ? (
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {user.orders.map((pedido) => {
              console.log('Pedido orderItems:', pedido.orderItems);
              return (
                <div
                  key={pedido.id}
                  className="p-4 border rounded-lg bg-gray-50 hover:shadow-lg transition-shadow"
                >
                  <p className="flex justify-between font-semibold text-gray-800 mb-2">
                    <span>Pedido Nº {pedido.id}</span>
                    <time dateTime={pedido.orderDate}>
                      {new Date(pedido.orderDate).toLocaleString('es-ES', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                        timeZone: 'Europe/Madrid',
                      })}
                    </time>
                  </p>

                  <p className="font-semibold mb-1 text-gray-700">Productos:</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm max-h-32 overflow-y-auto">
                    {pedido.orderItems && pedido.orderItems.length > 0 ? (
                      pedido.orderItems.map((item) => {
                        const cantidad = item.quantity || 1;
                        const precio = item.product?.basePrice || 0;
                        const precioFinal = cantidad * precio;

                        return (
                          <li
                            key={item.id}
                            className="grid grid-cols-[1fr_auto_auto] gap-4 items-center truncate"
                          >
                            <span className="truncate">
                              {item.product?.name || 'Producto desconocido'}
                            </span>
                            <span className="text-gray-600 font-mono">x{cantidad}</span>
                            <span className="font-semibold text-right">
                              {precioFinal.toFixed(2)} €
                            </span>
                          </li>
                        );
                      })
                    ) : (
                      <li className="italic text-gray-400">
                        No hay productos en este pedido.
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 italic">No hay pedidos realizados.</p>
        )}
      </section>
    </div>
  );
}

export default UserVer;
