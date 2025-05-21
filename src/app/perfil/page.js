import Link from 'next/link'; // Importa Link de Next.js
import { auth } from "@/auth";
import CerrarSesionButton from "./CerrarSesionButton";
import { PencilIcon } from "lucide-react"; // Importa el icono de lápiz
import Modal from "@/components/modal"; // Importa el componente Modal
import ActualizarImagenUsuario from '@/components/ActualizarImagenUsuario';
import { deleteOrder, getAllOrdersByUser } from '@/lib/actions';

async function page() {
    const sesion = await auth();
    const pedidos = await getAllOrdersByUser(sesion.user.id);

    const userImage =
        sesion?.user.image ||
        "https://res.cloudinary.com/arr17/image/upload/v1741363264/1200px-User_icon_2.svg_dyrkao.png";

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 text-gray-800 font-light">
            <div className="grid md:grid-cols-3 gap-12 items-start">
                {/* Historial */}
                <div>
                    <h2 className="text-xl font-medium mb-2 tracking-wide">HISTORIAL DE PEDIDOS</h2>
                    
                    
{pedidos.length > 0 ? (
  pedidos.map((pedido) => (
    <div key={pedido.id} className="flex items-center justify-between border p-4 rounded shadow mb-4">
      <div>
        <p className="text-sm text-gray-700">ID: {pedido.user.name}</p>
        <p className="text-sm text-gray-700">
          Fecha: {new Date(pedido.orderDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-700">Estado: {pedido.status}</p>
      </div>
      <form action={deleteOrder}>
        <input type="hidden" name="id" value={pedido.id} />
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        eliminar
      </button>
      </form>
    </div>
  ))
) : (
  <p className="text-sm text-gray-500 italic">No has realizado algún pedido aún.</p>
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
                            <Modal openElement={
                                <button className="bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100">
                                    <PencilIcon className="w-4 h-4 text-gray-700" />
                                </button>
                            }>
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

                    {/* Enlace a la página de direcciones */}
                    <Link href="/direcciones" className="text-sm mt-2 text-indigo-500 hover:underline block">
                        Ver direcciones
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default page;
