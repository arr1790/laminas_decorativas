
import  { obtenerCategoria } from "@/lib/data";
import Categoria from "@/components/categorias/item";

export default async function Page({ params }) {

  const id = params?.id;

  if (!id) {
    return <div>Error: Categoría no encontrada.</div>;
  }

  const categoria = await obtenerCategoria(id);

  return <Categoria categoria={categoria} />;
}
