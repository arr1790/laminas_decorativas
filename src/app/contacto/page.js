'use client'

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/lib/actions';
import Link from "next/link";
import { toast } from 'sonner';
import { MailIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react';
import Footer from '@/components/footer';

export default function PaginaContacto() {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || 'Mensaje enviado correctamente');
    }
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-8 max-w-4xl flex-grow">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 py-2 rounded-md">
          Contacto
        </h1>

        <p className="mb-6 text-base sm:text-lg leading-relaxed">
          ¿Tienes alguna duda? ¡Estamos aquí para ayudarte! Puedes contactarnos fácilmente:
        </p>

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
            Por email
          </h2>
          <p className="mb-4 text-sm sm:text-base">
            <MailIcon className="inline-block w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
            Escribiéndonos un <strong>email</strong> a{' '}
            <a href="mailto:capturasdeana@gmail.com" className="text-stone-500 hover:underline break-words">
              capturasdeana@gmail.com
            </a>
            , o bien formulario de contacto
          </p>
          <p className="italic text-sm sm:text-base break-words">Te contestaremos lo antes posible...</p>
          <p className="italic text-sm sm:text-base break-words">¡Prometido!</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Otras formas de contacto</h2>
          <p className="mb-2 flex items-center gap-2 text-sm sm:text-base break-words">
            <MessageCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
            Si prefieres por WhatsApp
            <a href="https://wa.me/34686531854" className="text-stone-500 hover:underline break-words">
              666 555 444
            </a>
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base break-words">
            <PhoneIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
            Si quieres comentarme algo,
            <a href="tel:646363765" className="text-stone-500 hover:underline break-words">
              646 363 765
            </a>
          </p>
        </div>
        <form action={formAction} className="mb-8 space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-sm sm:text-base">
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-sm sm:text-base">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tuemail@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 font-medium text-sm sm:text-base">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Opcional"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-medium text-sm sm:text-base">
              Mensaje que nos quieras hacer llegar *
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full px-4 py-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          <div className="flex items-center text-sm sm:text-base">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mr-2"
            />
            <label htmlFor="privacy" className="select-none">
              He leído y acepto la política de privacidad.
            </label>
          </div>

          {state.message && (
            <div
              className={`p-3 rounded-md mt-4 ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
            >
              {state.message}
            </div>
          )}

          <SubmitButton />
        </form>
      </main>

      <Footer />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50 text-sm sm:text-base"
    >
      {pending ? 'Enviando...' : 'Enviar mensaje'}
    </button>
  );
}
