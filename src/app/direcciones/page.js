'use client';

import { useState, useEffect } from 'react';
import  provincias  from '@/lib/provincias';
import  paisesUE  from '@/lib/paisesUE';

export default function EditarDireccion({ user }) {
  console.log("Provincias:", provincias); 
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    compania: '',
    direccion1: '',
    direccion2: '',
    ciudad: '',
    pais: 'España',
    provincia: 'La Coruña',
    codigoPostal: '',
    telefono: '',
    porDefecto: true
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nombre: user.nombre || '',
        apellido: user.apellido || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos a guardar:', formData);
    alert('Dirección actualizada correctamente');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Sección de dirección actual */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-6">SUS DIRECCIONES</h1>

        <button className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
          AGREGAR UNA NUEVA DIRECCIÓN
        </button>

        <div className="border p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">POR DEFECTO</p>
              <p className="text-lg mt-2">{formData.nombre} {formData.apellido}</p>
              <p className="text-gray-600">{formData.pais}</p>
            </div>
            <div className="flex gap-4">
              <button className="text-blue-600 hover:underline">EDITAR</button>
              <button className="text-red-600 hover:underline">ELIMINAR</button>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de edición */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-6">EDITAR DIRECCIÓN</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">NOMBRE</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">APELLIDO</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">COMPAÑÍA (opcional)</label>
            <input
              type="text"
              name="compania"
              value={formData.compania}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">DIRECCIÓN 1</label>
            <input
              type="text"
              name="direccion1"
              value={formData.direccion1}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">DIRECCIÓN 2 (opcional)</label>
            <input
              type="text"
              name="direccion2"
              value={formData.direccion2}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CIUDAD</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">PAÍS</label>
              <select name="pais">
                {paisesUE?.map((pais) => (  // ✅ "?." previene errores si paisesUE es undefined
                  <option key={pais} value={pais}>{pais}</option>
                ))}
              </select>

            </div>

            <div>
              <label className="block text-sm font-medium mb-1">PROVINCIA</label>
              <select name="provincia">
                {provincias?.map((provincia) => (  // ✅ Seguro incluso si provincias no carga
                  <option key={provincia} value={provincia}>{provincia}</option>
                ))}
              </select>

            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CÓDIGO POSTAL</label>
              <input
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">TELÉFONO</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="porDefecto"
              name="porDefecto"
              checked={formData.porDefecto}
              onChange={handleChange}
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label htmlFor="porDefecto" className="ml-2 block text-sm text-gray-900">
              Fijar como dirección por defecto
            </label>
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              ACTUALIZAR DIRECCIÓN
            </button>

            <button
              type="button"
              className="px-6 py-3 text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
