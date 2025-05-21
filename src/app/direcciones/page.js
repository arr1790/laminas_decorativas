import { handleSubmit } from './actions';
import provincias from '@/lib/provincias';
import paisesUE from '@/lib/paisesUE';
import { auth } from '@/auth';

export default async function DireccionPage() {
  const session = await auth();

  if (!session) {
    return <p className="text-center text-red-400 mt-10">Debes iniciar sesión para acceder a esta página.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-tr from-white via-blue-50 to-gray-100 rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">Editar Dirección</h2>
      <form action={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <input
            name="nombre"
            placeholder="Nombre"
            required
            className="flex-1 bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <input
            name="apellido"
            placeholder="Apellido"
            required
            className="flex-1 bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        <input
          name="direccion1"
          placeholder="Dirección 1"
          required
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
        <input
          name="direccion2"
          placeholder="Dirección 2"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />

        <input
          name="ciudad"
          placeholder="Ciudad"
          required
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />

        <div className="flex gap-4">
          <select
            name="pais"
            defaultValue="España"
            required
            className="flex-1 bg-white text-gray-800 border border-gray-300 rounded-md p-3 appearance-none focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            {paisesUE.map((pais) => (
              <option key={pais} value={pais}>{pais}</option>
            ))}
          </select>

          <select
            name="provincia"
            defaultValue="La Coruña"
            required
            className="flex-1 bg-white text-gray-800 border border-gray-300 rounded-md p-3 appearance-none focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            {provincias.map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        <input
          name="codigoPostal"
          placeholder="Código Postal"
          required
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-brown-500 text-white font-semibold py-3 rounded-md shadow-lg transition duration-300"
        >
          Guardar Dirección
        </button>
      </form>
    </div>
  );
}