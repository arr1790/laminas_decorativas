'use client'
import { useActionState } from 'react'
import { login } from '@/lib/actions'

export function LoginForm({ className }) {
    const [state, action, pending] = useActionState(login, {})

    return (
        <form action={action} className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-200 ${className}`}>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Iniciar sesión</h1>

            <div className='flex flex-col gap-5'>
                <label className="text-gray-700 font-semibold">
                    Email
                    <input 
                        type='email'
                        name='email'
                        defaultValue={state.fields?.email || ''}
                        placeholder="john.doe@example.com"
                        className='peer w-full mt-2 p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all outline-none'
                        required
                    />
                    <p className="text-red-500 text-sm mt-1 hidden peer-invalid:block">
            
                    </p>
                </label>

                <label className="text-gray-700 font-semibold">
                    Contraseña
                    <input 
                        type="password"
                        name='password'
                        defaultValue={state.fields?.password || ''}
                        placeholder="******"
                        className='w-full mt-2 p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all outline-none'
                        required
                    />
                </label>

                <button 
                    type="submit" 
                    disabled={pending} 
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {pending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>

                {state?.error && <p className="text-red-500 text-center font-medium mt-3">{state.error}</p>}
            </div>
        </form>
    )
}

export default LoginForm;
