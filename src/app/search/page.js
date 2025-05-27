import { busqueda } from "@/lib/actions";
import PaginatedList from "@/lib/paginated-list";
import { ProductCard } from "./tarjetaItem";

async function Page({ searchParams }) {
  const params = await searchParams;
  const query = params.query;
  const productos = await busqueda(query);
  console.log(productos);

  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <img src="/mujer.png" alt="No hay productos" className="w-120 h-100 mb-4" />
        <div className="text-center text-lg font-semibold">No se encontraron productos con la palabra: <span className="text-indigo-600">{query}</span></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Resultados de búsqueda para: <span className="text-indigo-600">{query}</span></h1>
      <PaginatedList items={productos?.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))} />
    </div>
  );
}

export default Page;
