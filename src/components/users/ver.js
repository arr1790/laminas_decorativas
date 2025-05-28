'use client';
import React from 'react';

function UserVer({ user }) {
  if (!user) return null; // Evitar errores si no hay usuario

user.image = user.image || '/images/avatar-80.png';

  return (
    <div>
      <div className="grid md:grid-cols-[120px_auto] gap-4">
        
        <img 
          src={user.image || '/images/avatar-80.png'} 
          alt="Imagen de usuario" 
          width={192} 
          height={192}
          className="rounded-full object-cover"
        />

        <div>
          {user.active ? (
            <p className="text-xs text-green-700">Cuenta activada</p>
          ) : (
            <p className="text-xs text-red-700">Cuenta desactivada</p>
          )}

          <h1 className="font-bold text-2xl">{user.name}</h1>
          <p className="text-gray-500">email: {user.email}</p>
          
        </div>
      </div>

      <h2 className="font-bold mt-4">Pedidos realizados</h2>
      <div className="flex flex-col gap-1">
        {(user.pedidos ?? []).map(pedido => (
          <p key={pedido.id} className="flex gap-4">
            <span>Nº {pedido.id}</span>
            <span>
              {new Date(pedido.fecha_hora).toLocaleString("es-ES", {
                dateStyle: "full",
                timeStyle: "long",
                timeZone: "Europe/Madrid",
              })}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default UserVer;
