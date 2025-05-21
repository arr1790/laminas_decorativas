'use client';
import { useActionState } from 'react';
import { login } from '@/lib/actions';

export function LoginForm({ className }) {
  const [state, action, pending] = useActionState(login, {});

  return (
    <div className={` flex items-center justify-center bg-black0 ${className}`}>
      <form
        action={action}
        className="relative bg-white p-8 md:p-16 rounded-lg shadow-2xl w-80 z-10 transform transition duration-500 ease-in-out"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Iniciar sesión</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-4 w-full h-12 border border-gray-800 px-3 rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 w-full h-12 border border-gray-800 px-3 rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={pending}
          className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {pending ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 hover:text-blue-800 text-sm">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {state?.error && (
          <p className="text-red-500 text-center font-medium mt-4">{state.error}</p>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
