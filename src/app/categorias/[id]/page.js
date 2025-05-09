import { obtenerCategoria } from "@/lib/data";
import Categoria from "@/components/categorias/item";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const session = await auth();
  
  // // Redirigir si no es ADMIN
  // if(session?.user.role !== 'ADMIN') {
  //   redirect('/');
  //   return null; // Esto es importante para evitar renderizado adicional
  // }

  const { id } = await params; // Acceder directamente a params

  if (!id) {
    return <div>Error: Categoría no encontrada.</div>;
  }

  try {
    const categoria = await obtenerCategoria(id);
    
    if (!categoria) {
      return <div>Error: Categoría no existe.</div>;
    }

    return <Categoria categoria={categoria} />;
  } catch (error) {
    console.error("Error al obtener categoría:", error);
    return <div>Error al cargar la categoría.</div>;
  }
}