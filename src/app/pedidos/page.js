import { auth } from "@/auth";
import { redirect } from "next/navigation";
import  Pedidos  from "@/components/pedidos/lista"; 
import { obtenerPedidos, obtenerProductos, getUsers } from "@/lib/data";
import { BackButton } from "@/components/BackButton";

export default async function PedidosPage() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }

  const pedidos = session.user.role === "ADMIN"
    ? await obtenerPedidos()
    : await obtenerPedidos(session.user.id);

  const productos = await obtenerProductos();
  const clientes = await getUsers();

  


  return (
    <div className="p-4">
      <BackButton />
      <Pedidos
        pedidos={pedidos}
        productos={productos}
        clientes={clientes}
        user={session.user}
      />
    </div>
  );
}