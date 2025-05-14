import ProductoItem from "@/components/productos/item";
import { obtenerProductoPorId, obtenerProductosRelacionados } from "@/lib/data";


export default async function Page({ params }) {
  const { id } = await params;

  const producto = await obtenerProductoPorId(id);
  if (!producto) return <div>Producto no encontrado</div>;

  const relacionados = await obtenerProductosRelacionados(producto.categoryId, id);

  return <ProductoItem producto={producto} relacionados={relacionados} />;
}
