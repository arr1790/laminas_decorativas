import { TrashIcon, PencilIcon, PlusIcon } from "lucide-react";
import { auth } from "@/auth";
import { getUsers } from "@/lib/data";
import Modal from '@/components/modal';
import UserVer from '@/components/users/ver';
import UserModificar from '@/components/users/modificar';
import UserEliminar from '@/components/users/eliminar';
import UserInsertar from "@/components/users/insertar";
import ActiveButton from "@/components/active-button";
import { activeUser } from "@/lib/actions";

async function Users() {
  const session = await auth();
  const users = await getUsers();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de usuarios</h1>
        <Modal
          openElement={
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
              <PlusIcon className="w-5 h-5" />
              Añadir usuario
            </button>
          }
        >
          <UserInsertar session={session} users={users} />
        </Modal>
      </div>

      {/* Lista de usuarios */}
      <div className="space-y-4">
        {users
          .filter(user => user.id !== session.user.id)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(user => (
            <div
              key={user.id}
              className="flex justify-between items-center bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 p-5"
            >
              {/* Info usuario */}
              <div className="flex items-center gap-5">
                {session.user?.role === 'ADMIN' && (
                  <form action={activeUser.bind(null, user)}>
                    <ActiveButton user={user} />
                  </form>
                )}

                <Modal openElement={
                  <p className="text-lg font-semibold text-gray-800 hover:underline cursor-pointer">
                    {user.name}
                  </p>
                }>
                  <UserVer user={user} pedidos={user.orders} />
                </Modal>
              </div>

              {/* Acciones */}
              {session?.user?.role === 'ADMIN' && (
                <div className="flex gap-2">
                  <Modal
                    openElement={
                      <button className="p-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-md transition border border-yellow-200">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    }
                  >
                    <UserModificar session={session} user={user} pedidos={user.pedidos} />
                  </Modal>

                  <Modal
                    openElement={
                      <button className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition border border-red-200">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    }
                  >
                    <UserEliminar user={user} pedidos={user.pedidos} />
                  </Modal>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Users;
