import { guardarOModificarDireccion } from '@/lib/actions';
import provincias from '@/lib/provincias';
import paisesUE from '@/lib/paisesUE';
import { auth } from '@/auth';
import { obtenerDireccionesPorUserId } from '@/lib/data';

export default async function DireccionPage() {
  const session = await auth();
  const user = session?.user;

  if (!session) {
    return (
      <p className="text-center text-red-400 mt-10">
        Debes iniciar sesión para acceder a esta página.
      </p>
    );
  }

  const direccion = await obtenerDireccionesPorUserId(user.id);

  return (
    <div className="max-w-2xl mx-auto mt-4 p-10 bg-white">
      <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-wider">
        {direccion ? 'EDITAR DIRECCIÓN' : 'AGREGAR DIRECCIÓN'}
      </h2>

      {!direccion && (
        <p className="text-left text-gray-600 mb-8">
          No tienes una dirección guardada. Por favor, rellena el siguiente formulario.
        </p>
      )}

      <form action={guardarOModificarDireccion} className="space-y-8">
        {direccion?.id && (
          <input type="hidden" name="id" value={direccion.id} />
        )}

        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="w-full">
            <label className="block text-xs uppercase text-gray-500 mb-1">Nombre</label>
            <input
              name="nombre"
              defaultValue={user?.name ?? ''}
              required
              className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
            />
          </div>
          <div className="w-full">
            <label className="block text-xs uppercase text-gray-500 mb-1">Apellido</label>
            <input
              name="apellido"
              defaultValue={direccion?.apellido ?? ''}
              required
              className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-500 mb-1">Dirección 1</label>
          <input
            name="direccion1"
            defaultValue={direccion?.direccion1 ?? ''}
            required
            className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-500 mb-1">Dirección 2 (opcional)</label>
          <input
            name="direccion2"
            defaultValue={direccion?.direccion2 ?? ''}
            className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-500 mb-1">Ciudad</label>
          <input
            name="ciudad"
            defaultValue={direccion?.ciudad ?? ''}
            required
            className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="w-full">
            <label className="block text-xs uppercase text-gray-500 mb-1">País</label>
            <select
              name="pais"
              defaultValue={direccion?.pais ?? 'España'}
              required
              className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
            >
              {paisesUE.map((pais) => (
                <option key={pais} value={pais}>{pais}</option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block text-xs uppercase text-gray-500 mb-1">Provincia</label>
            <select
              name="provincia"
              defaultValue={direccion?.provincia ?? 'Cordoba'}
              required
              className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
            >
              {provincias.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-500 mb-1">Código Postal</label>
          <input
            name="codigoPostal"
            defaultValue={direccion?.codigoPostal ?? ''}
            required
            className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block text-xs uppercase text-gray-500 mb-1">Teléfono</label>
          <input
            name="telefono"
            defaultValue={direccion?.telefono ?? ''}
            required
            pattern="^\d{9}$"
            title="El teléfono debe contener exactamente 9 números."
            className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 mt-8 hover:bg-gray-800 transition-colors"
        >
          Guardar Dirección
        </button>
      </form>
    </div>
  );
}
