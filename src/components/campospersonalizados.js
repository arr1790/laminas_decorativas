'use client';
import React from "react";

export default function CamposPersonalizados({ categoria, nombre, setNombre, textoPersonalizado, setTextoPersonalizado }) {
  switch (categoria) {
    case "cumpleanos":
      return (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">NOMBRE DEL CUMPLEAÑERO/A *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nombre"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">FECHA DEL CUMPLEAÑOS *</label>
            <input
              type="text"
              value={textoPersonalizado}
              onChange={(e) => setTextoPersonalizado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="DD/MM/AAAA"
            />
          </div>
        </>
      );

    case "personalizada":
      return (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">NOMBRES *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej. Ana y Luis"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">HISTORIA / TEXTO PERSONALIZADO</label>
            <textarea
              value={textoPersonalizado}
              onChange={(e) => setTextoPersonalizado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Cuenta su historia, frase o dedicatoria"
            />
          </div>
        </>
      );

    default:
      return (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">NOMBRE(S) *</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Escribe los nombres"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">TEXTO (OPCIONAL)</label>
            <input
              type="text"
              value={textoPersonalizado}
              onChange={(e) => setTextoPersonalizado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Añade un texto especial"
            />
          </div>
        </>
      );
  }
}
