
import  { obtenerCategoria } from "@/lib/data";
import Categoria from "@/components/categorias/item";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function Page({ params }) {

    const session = await auth();
    if(session?.user.role !== 'ADMIN') return redirect('/');

  const {id} = await params

  if (!id) {
    return <div>Error: Categoría no encontrada.</div>;
  }

  const categoria = await obtenerCategoria(id);

  return <Categoria categoria={categoria} />;
}
