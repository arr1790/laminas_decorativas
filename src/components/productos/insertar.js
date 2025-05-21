'use client'
import { insertarOrden } from "@/lib/actions";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";


function PedidoInsertar({ user, products }) {
    const formId = useId()
    const [state, action, pending] = useActionState(insertarOrden, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state])

    return (
        <form id={formId} action={action} className="flex flex-col gap-4">
            <button 
                type="submit" 
                disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline' /> Guardar </div>
                }
            </button>

            <label> Fecha y hora:
                <input
                    name="fecha_hora"
                    type="datetime-local"
                    defaultValue={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('.')[0]} 
                />
            </label>

            <input type='hidden' name="userId" defaultValue={user.id} />

            <p className="font-bold">Productos</p>
            <div className="grid gap-4 place-items-center grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
                {products.map(product => (
                    <CheckBox
                        key={product.id}
                        name={`product${product.id}`}
                        className="place-items-center has-checked:bg-lime-100 has-checked:border has-checked:border-green-500 p-4 rounded-md"
                    >
                        <img 
                            src={product.image || '/images/default-product.avif'} 
                            alt={product.name} 
                            className="w-full h-auto"
                        />
                        <span>{product.name}</span>
                        <span>${product.basePrice}</span>
                    </CheckBox>
                ))}
            </div>

            <label>
                Dirección de envío:
                <select name="addressId" required>
                    {user.addresses?.map(address => (
                        <option key={address.id} value={address.id}>
                            {address.direccion1}, {address.ciudad}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Estado del pedido:
                <select name="status" defaultValue="PENDIENTE">
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="EN_PROCESO">En proceso</option>
                    <option value="ENVIADO">Enviado</option>
                    <option value="ENTREGADO">Entregado</option>
                    <option value="CANCELADO">Cancelado</option>
                </select>
            </label>
        </form>
    );
}

export default PedidoInsertar;