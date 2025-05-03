'use client'
import { useActionState } from 'react'
import { register } from '@/lib/actions'

function RegisterForm({ className }) {
    const [state, action, pending] = useActionState(register, {})

    return (
        <form action={action} className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-200 ${className}`}>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Crear una cuenta</h1>

            <div className='flex flex-col gap-5'>
                <label className="text-gray-700 font-semibold">
                    Nombre
                    <input 
                        type='text'
                        name='name'
                        // defaultValue={state.fields?.name || ''}
                        placeholder="John Doe"
                        className='w-full mt-2 p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all outline-none'
                        required
                    />
                </label>

                <label className="text-gray-700 font-semibold">
                    Email
                    <input 
                        type='email'
                        name='email'
                        // defaultValue={state.fields?.email || ''}
                        placeholder="john.doe@example.com"
                        className='peer w-full mt-2 p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all outline-none'
                    />
                    <p className="text-red-500 text-sm mt-1 hidden peer-invalid:block">
                        ⚠️ Por favor, introduce un email válido.
                    </p>
                </label>

                <label className="text-gray-700 font-semibold">
                    Contraseña
                    <input 
                        type="password"
                        name='password'
                        // defaultValue={state.fields?.password || ''}
                        // placeholder="******"
                        className='w-full mt-2 p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all outline-none'
                    />
                </label>

                <button 
                    type="submit" 
                    disabled={pending} 
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {pending ? 'Creando cuenta...' : 'Registrarse'}
                </button>

                {state?.success && <p className="text-green-500 text-center font-medium mt-3">{state.success}</p>}
                {state?.error && <p className="text-red-500 text-center font-medium mt-3">{state.error}</p>}
            </div>
        </form>
    )
}

export default RegisterForm;
