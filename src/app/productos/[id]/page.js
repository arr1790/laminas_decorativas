import { auth } from "@/auth";
import ProductoItem from "@/components/productos/item";
import { obtenerProductoPorId, obtenerProductosRelacionados } from "@/lib/data";


export default async function Page({ params }) {
  const { id } = await params;
  const session = await auth();

  const producto = await obtenerProductoPorId(id);
  if (!producto) return <div>Producto no encontrado</div>;

  const relacionados = await obtenerProductosRelacionados(producto.categoryId, id);

  return <ProductoItem producto={producto} user={session?.user} relacionados={relacionados} />;
}
