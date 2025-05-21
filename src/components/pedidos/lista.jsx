import { getUsers, obtenerPedidos, obtenerProductos, obtenerRepartidores } from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/modal";
import PedidoInsertar from "./insertar";
import PedidoModificar from "./modificar";
import PedidoEliminar from "./eliminar";
import { PencilIcon, PlusIcon, TrashIcon, UserIcon, PhoneIcon, MapPinIcon, ClockIcon, FrameIcon } from "lucide-react";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function Pedidos() {
    const session = await auth();
    
    const pedidos = session?.user.role === 'ADMIN' 
        ? await obtenerPedidos() 
        : await obtenerPedidos(session?.user.id);

    const repartidores = await obtenerRepartidores();
    const productos = await obtenerProductos();
    const clientes = await getUsers();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const formatShortDate = (date) => {
        return new Intl.DateTimeFormat("es-ES", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    {session?.user.role === 'ADMIN' ? 'Historial de Pedidos' : 'Mis Pedidos'}
                </h1>
                
                <Modal 
                    openElement={
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow">
                            <PlusIcon className="size-4" />
                            <span className="hidden sm:inline">Nuevo Pedido</span>
                        </button>
                    }
                >
                    <PedidoInsertar 
                        user={session?.user} 
                        clientes={clientes} 
                        repartidores={repartidores} 
                        productos={productos} 
                    />
                </Modal>
            </div>

            {pedidos.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No hay pedidos registrados</p>
                    <p className="text-gray-400 mt-2">Tus cuadros personalizados aparecerán aquí</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pedidos
                        .sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora))
                        .map(pedido => (
                            <div 
                                key={pedido.id} 
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-700">Pedido #{pedido.id}</span>
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            <ClockIcon className="size-3" />
                                            {formatShortDate(new Date(pedido.fecha_hora))}
                                        </Badge>
                                    </div>
                                    
                                    {session?.user.role === 'ADMIN' && (
                                        <div className="flex gap-2">
                                            <Modal 
                                                openElement={
                                                    <button className="p-1.5 rounded-full hover:bg-blue-50 text-blue-600 transition-colors">
                                                        <PencilIcon className="size-4" />
                                                    </button>
                                                }
                                            >
                                                <PedidoModificar 
                                                    user={session?.user} 
                                                    pedido={pedido} 
                                                    clientes={clientes} 
                                                    repartidores={repartidores} 
                                                    productos={productos} 
                                                />
                                            </Modal>

                                            <Modal 
                                                openElement={
                                                    <button className="p-1.5 rounded-full hover:bg-red-50 text-red-600 transition-colors">
                                                        <TrashIcon className="size-4" />
                                                    </button>
                                                }
                                            >
                                                <PedidoEliminar pedido={pedido} />
                                            </Modal>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    {session?.user.role === 'ADMIN' && (
                                        <div className="mb-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <UserIcon className="size-4 text-gray-500" />
                                                <span className="font-medium">{pedido.cliente?.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <PhoneIcon className="size-4 text-gray-500" />
                                                <span>{pedido.cliente?.phone || 'No especificado'}</span>
                                            </div>
                                            <div className="flex items-start gap-2 text-sm">
                                                <MapPinIcon className="size-4 text-gray-500 mt-0.5" />
                                                <span>{pedido.cliente?.address || 'No especificada'}</span>
                                            </div>
                                        </div>
                                    )}

                                    <h3 className="font-bold text-lg mb-2">Productos</h3>
                                    <ul className="space-y-3 mb-4">
                                        {pedido.productos.map(producto => (
                                            <li key={producto.id} className="flex gap-3 items-start">
                                                <div className="relative w-16 h-16 flex-shrink-0 border rounded-md overflow-hidden">
                                                    <Image
                                                        src={producto.image || '/images/default-product.avif'}
                                                        alt={producto.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <span className="font-medium text-gray-800">{producto.name}</span>
                                                        <span className="font-medium">{formatCurrency(producto.basePrice)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                        <span>{producto.dimensions}</span>
                                                        {producto.withFrame && (
                                                            <span className="flex items-center gap-1">
                                                                <FrameIcon className="size-3" />
                                                                Con marco
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                                        <span className="font-bold">Total:</span>
                                        <span className="font-bold text-lg">
                                            {formatCurrency(pedido.productos.reduce((acc, p) => acc + p.basePrice, 0))}
                                        </span>
                                    </div>
                                </div>

                                <Link 
                                    href={`/pedidos/${pedido.id}`} 
                                    className="block text-center py-2 bg-gray-50 text-blue-600 hover:bg-gray-100 transition-colors text-sm font-medium"
                                >
                                    Ver detalles del pedido
                                </Link>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}