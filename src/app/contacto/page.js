'use client'

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';  // Keep useFormStatus from react-dom
import { submitContactForm } from '@/lib/actions';
import Link from "next/link";
import Image from 'next/image';
import { toast } from 'sonner';
import { MailIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react';



export default function PaginaContacto() {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);

    }
  }, [state]);

  return (
    <div>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-dark-500  py-2 rounded-md">Contacto</h1>

       

  

        <p className="mb-6">¿Tienes alguna duda? ¡Estamos aquí para ayudarte! Puedes contactarnos fácilmente:</p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
 
            Por email
          </h2>
          <p className="mb-4 flex items-center gap-2">
            <MailIcon className="w-4 h-4 text-blue-600" />
          Escribiéndonos un <strong>email</strong> a <a href="mailto:capturasdeana@gmail.com" className="text-stone-500 hover:underline">capturasdeana@gmail.com</a>, o bien completa el siguiente formulario de contacto
          </p>
          <p className="italic">Te contestaremos lo antes posible...</p>
          <p className="italic">¡Prometido!</p>
        </div>


        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Otras formas de contacto</h2>
          <p className="mb-2 flex items-center gap-2">
            <MessageCircleIcon className="w-4 h-4 text-green-600" />
            Si prefieres por WhatsApp puedes hacerlo en el número  <a href="https://wa.me/34686531854" className="text-stone-500 hover:underline">666 555 444</a>
          </p>
          <p className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-blue-600" />
            Si quieres comentarme algo, lo puedes hacer en el teléfono<a href="tel:646363765" className="text-stone-500 hover:underline">646 363 765</a>
          </p>
        </div>

        <form action={formAction} className="mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 font-medium">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 font-medium">Mensaje que nos quieras hacer llegar *</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-md"
            ></textarea>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mr-2"
            />
            <label htmlFor="privacy">He leído y acepto la política de privacidad.</label>
          </div>

          {state.message && (
            <div className={`mb-4 p-3 rounded-md ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
              {state.message}
            </div>
          )}

          <SubmitButton />
        </form>

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-2">
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <Link href="/cookies" className="hover:text-pink-200">POLÍTICA DE COOKIES</Link>
            <Link href="/privacidad" className="hover:text-pink-200">POLÍTICA DE PRIVACIDAD</Link>
            <Link href="/terminos" className="hover:text-pink-200">TÉRMINOS Y CONDICIONES</Link>
          </div>

          <div className="mt-4 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} Ana Ruano. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
    >
      {pending ? 'Enviando...' : 'Enviar mensaje'}
    </button>
  );
}