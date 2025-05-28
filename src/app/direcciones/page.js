import { handleSubmit } from './actions';
import provincias from '@/lib/provincias';
import paisesUE from '@/lib/paisesUE';
import { auth } from '@/auth';
import { obtenerDireccionesPorUserId } from '@/lib/data';

export default async function DireccionPage() {
  const session = await auth();
  const user = session?.user;
  const direccion = await obtenerDireccionesPorUserId(user.id); // Suponemos que devuelve un objeto (no array)

  if (!session) {
    return <p className="text-center text-red-400 mt-10">Debes iniciar sesión para acceder a esta página.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-tr from-white via-blue-50 to-gray-100 rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">Editar Dirección</h2>

      <form action={handleSubmit} className="space-y-6">
        {/* Si necesitas identificar la dirección en el backend */}
        {direccion?.id && (
          <input type="hidden" name="id" value={direccion.id} />
        )}

        <div className="flex gap-4">
          <input
            defaultValue={user?.name ?? ''}
            name="nombre"
            placeholder="Nombre"
            required
            className="flex-1 bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:ring-2"
          />
          <input
            defaultValue={direccion?.apellido ?? ''}
            name="apellido"
            placeholder="Apellido"
            required
            className="flex-1 bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:ring-2"
          />
        </div>

        <input
          name="direccion1"
          defaultValue={direccion?.direccion1 ?? ''}
          placeholder="Dirección 1"
          required
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:ring-2"
        />
        <input
          name="direccion2"
          defaultValue={direccion?.direccion2 ?? ''}
          placeholder="Dirección 2"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:ring-2"
        />

        <input
          name="ciudad"
          defaultValue={direccion?.ciudad ?? ''}
          placeholder="Ciudad"
          required
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3 focus:ring-2"
        />

        <div className="flex gap-4">
          <select
            name="pais"
            defaultValue={direccion?.pais ?? 'España'}
            required
            className="flex-1 bg-white text-gray-800 border border-gray-300 rounded-md p-3"
          >
            {paisesUE.map((pais) => (
              <option key={pais} value={pais}>{pais}</option>
            ))}
          </select>

          <select
            name="provincia"
            defaultValue={direccion?.provincia ?? 'La Coruña'}
            required
            className="flex-1 bg-white text-gray-800 border border-gray-300 rounded-md p-3"
          >
            {provincias.map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        <input
          name="codigoPostal"
          defaultValue={direccion?.codigoPostal ?? ''}
          placeholder="Código Postal"
          required
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3"
        />

        <input
          name="telefono"
          defaultValue={direccion?.telefono ?? ''}
          placeholder="Teléfono"
          className="w-full bg-white text-gray-800 border border-gray-300 rounded-md p-3"
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
