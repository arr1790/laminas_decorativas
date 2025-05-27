// app/perfil/page.js
import { auth } from "@/auth";
import { getAllOrdersByUser } from "@/lib/actions";
import PerfilUsuario from "@/components/perfilUsuario";

export default async function Page() {
  const sesion = await auth();
  const pedidos = await getAllOrdersByUser(sesion.user.id);

  const userImage =
    sesion?.user.image ||
    "https://res.cloudinary.com/arr17/image/upload/v1741363264/1200px-User_icon_2.svg_dyrkao.png";

  return (
    <PerfilUsuario
      sesion={sesion}
      pedidos={pedidos}
      userImage={userImage}
    />
  );
}
