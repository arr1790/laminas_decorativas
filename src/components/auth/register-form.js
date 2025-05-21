'use client';

import { useActionState } from 'react';
import { register } from '@/lib/actions';

function RegisterForm({ className }) {
  const [state, action, pending] = useActionState(register, {});

  return (
    <div className={`flex items-center justify-center bg-black ${className}`}>
      <form
        action={action}
        className="relative bg-white p-8 md:p-16 rounded-lg shadow-2xl w-80 z-10 transform transition duration-500 ease-in-out"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Crear cuenta</h1>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          className="mb-4 w-full h-12 border border-gray-800 px-3 rounded-lg"
          required
        />

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
          placeholder="Contraseña"
          className="mb-4 w-full h-12 border border-gray-800 px-3 rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={pending}
          className="w-full h-12 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {pending ? 'Registrando...' : 'Registrarse'}
        </button>

        {state?.success && (
          <p className="text-green-500 text-center font-medium mt-4">{state.success}</p>
        )}
        {state?.error && (
          <p className="text-red-500 text-center font-medium mt-4">{state.error}</p>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
