'use client'
import { LoaderCircleIcon, UserRoundIcon } from "lucide-react";
import { useFormStatus } from "react-dom";



function ActiveButton({ user }) {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending}
            className={`${user.active ? 'bg-slate-600' : 'bg-slate-300'} disabled:bg-stone-700 p-0 rounded-full self-end hover:bg-slate-400 `}
            title={`${user.active ? 'Desactivar usuario' : 'Activar usuario'}`}>
            {pending
                ? <LoaderCircleIcon className={`text-white size-4 animate-spin`} />
                : user.image ? <img src={user.image} alt={user.name} className="size-8 rounded-full" /> : <UserRoundIcon className={`text-white size-8  `} />
            }

        </button>
    );
}

export default ActiveButton