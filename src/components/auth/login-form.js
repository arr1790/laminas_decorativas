'use client';
import { useActionState } from 'react';
import { login } from '@/lib/actions';

export function LoginForm({ className }) {
  const [state, action, pending] = useActionState(login, {});

  return (
    <div className={` mt-10 ${className}`}>
      <form
        action={action}
       
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Accede</h1>

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
          className="w-full h-12 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {pending ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

       
        {state?.error && (
          <p className="text-red-500 text-center font-medium mt-4">{state.error}</p>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
