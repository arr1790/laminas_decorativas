import { obtenerPedidoPorId } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Pedido({ id }) {
  const pedido = await obtenerPedidoPorId(id);
 
  if (!pedido) notFound();

  return (
    <>
      <div className="flex gap-4 text-2xl font-bold mb-4">
        <span>Nº {pedido.id}</span>
        <span>
          {new Intl.DateTimeFormat("es-ES", {
            dateStyle: "full",
            timeStyle: "long",
            timeZone: "Europe/Madrid",
          }).format(new Date(pedido.orderDate))}
        </span>
      </div>

      <div className="mb-2">
        <p>
          <strong>Nombre del cliente:</strong> {pedido.user?.name}
        </p>
        {pedido.address && (
          <>
            <p>
              <strong>Dirección:</strong> {pedido.address.direccion1},{" "}
              {pedido.address.ciudad}, {pedido.address.pais}
            </p>
            <p>
              <strong>Teléfono:</strong> {pedido.address.telefono}
            </p>
            <p>
              <strong>Email:</strong> {pedido.address.email}
            </p>
          </>
        )}
      </div>

      <div className="pt-5 max-w-md">
        <h2 className="font-bold text-lg mb-2">Productos</h2>
        {pedido.orderItems.map((item) => (
          <p key={item.id} className="flex justify-between">
            <span>{item.product.name} x {item.cantidad}</span>
            <span>
              € {(item.product.basePrice * item.cantidad).toFixed(2)}
            </span>
          </p>
        ))}

        <h3 className="flex justify-between font-bold border-t pt-2 mt-4">
          <span>TOTAL (€)</span>
          <span>{pedido.total.toFixed(2)}</span>
        </h3>
      </div>
    </>
  );
}
