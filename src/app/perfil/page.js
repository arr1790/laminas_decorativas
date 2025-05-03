import { auth } from "@/auth";
import CerrarSesionButton from "./CerrarSesionButton";

async function page() {
  const sesion = await auth();

  const userImage =
    sesion?.user.image ||
    "https://res.cloudinary.com/arr17/image/upload/v1741363264/1200px-User_icon_2.svg_dyrkao.png";

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 text-gray-800 font-light">
      <div className="grid md:grid-cols-3 gap-12 items-start">
        {/* Historial */}
        <div>
          <h2 className="text-xl font-medium mb-2 tracking-wide">HISTORIAL DE PEDIDOS</h2>
          <p className="text-sm text-gray-500 italic">No has realizado algún pedido aún.</p>
        </div>

        {/* Perfil */}
        <div className="text-center">
          <h1 className="text-3xl font-medium mb-4 tracking-widest">MI CUENTA</h1>
          <img
            src={userImage}
            alt="Avatar"
            className="mx-auto w-24 h-24 rounded-full border border-gray-300 object-cover mb-4"
          />
          <p className="uppercase text-xs tracking-wide text-gray-500">{sesion?.user.name}</p>
          <p className="text-sm text-gray-600">{sesion?.user.email}</p>

          <CerrarSesionButton />
        </div>

        {/* Dirección */}
        <div className="text-right">
          <h2 className="text-xl font-medium mb-2 tracking-wide">DETALLES DE LA CUENTA</h2>
          <p className="uppercase text-xs tracking-wide text-gray-500">{sesion?.user.name}</p>
          <p className="text-sm text-gray-600">España</p>
          <a href="#" className="text-sm mt-2 text-indigo-500 hover:underline block">
            Ver direcciones (1)
          </a>
        </div>
      </div>
    </div>
  );
}

export default page;
