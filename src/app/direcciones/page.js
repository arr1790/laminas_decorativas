'use client';

import { useState, useEffect } from 'react';
import provincias from '@/lib/provincias';
import paisesUE from '@/lib/paisesUE';

export default function EditarDireccion({ user }) {
  // Estado inicial con valores por defecto
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    image: user?.image || '',
    direccion1: '',
    direccion2: '',
    ciudad: '',
    pais: 'España',
    provincia: 'La Coruña',
    codigoPostal: '',
    telefono: '',
    porDefecto: true
  });

  // Efecto para depuración
  useEffect(() => {
    console.log('Datos del usuario recibidos:', user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Datos a guardar:', formData);
      alert('Dirección actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar la dirección');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Sección de usuario */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-6">TUS DIRECCIONES</h1>

        <div className="border p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user?.image && (
                <img
                  src={user.image}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">USUARIO</p>
                <p className="text-lg mt-1">
                  {user?.name || 'Usuario no identificado'}
                </p>
              </div>
            </div>
            <button className="text-blue-600 hover:underline">EDITAR</button>
          </div>
        </div>
      </div>

      {/* Formulario completo */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-6">
          {user?.addresses?.length > 0 ? 'EDITAR DIRECCIÓN' : 'AÑADIR DIRECCIÓN'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">NOMBRE *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">APELLIDO *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
            <label className="block text-sm font-medium mb-1">EMAIL *</label>
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
            <label className="block text-sm font-medium mb-1">DIRECCIÓN (CALLE Y NÚMERO) *</label>
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
            <label className="block text-sm font-medium mb-1">DIRECCIÓN 2 (BLOQUE, ESCALERA, PISO, PUERTA)</label>
            <input
              type="text"
              name="direccion2"
              value={formData.direccion2}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CIUDAD *</label>
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
              <label className="block text-sm font-medium mb-1">PAÍS *</label>
              <select
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                {paisesUE?.map((pais) => (
                  <option key={pais} value={pais}>{pais}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">PROVINCIA *</label>
              <select
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                {provincias?.map((provincia) => (
                  <option key={provincia} value={provincia}>{provincia}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CÓDIGO POSTAL *</label>
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
              Establecer como dirección principal
            </label>
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              {user?.addresses?.length > 0 ? 'ACTUALIZAR DIRECCIÓN' : 'GUARDAR DIRECCIÓN'}
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