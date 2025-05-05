'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';  // Keep useFormStatus from react-dom
import { submitContactForm } from '@/lib/actions';
import Link from "next/link";
import Image from 'next/image';

export default function PaginaContacto() {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    message: '',
  });

  return (
    <div>
      {/* Header con logo */}
      <header className="bg-white pt-4 pb-2">
        <div className="flex justify-center">
          <Link href="/">
            <Image 
              src="/CapturadeAna.png" 
              alt="Logo de la tienda"
              width={300}
              height={75}
              className="w-[280px] md:w-[300px] h-auto"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Barra de navegación superior */}
      <nav className="bg-white border-y border-gray-200">
        <div className="flex flex-wrap justify-center gap-4 py-3 px-2">
          <Link href="/boda" className="hover:text-pink-200 text-sm font-medium">BODA</Link>
          <Link href="/comunion" className="hover:text-pink-200 text-sm font-medium">COMUNIÓN</Link>
          <Link href="/bautizo" className="hover:text-pink-200 text-sm font-medium">BAUTIZO Y FIESTA BEBÉ</Link>
          <Link href="/cumpleanos" className="hover:text-pink-200 text-sm font-medium">CUMPLEAÑOS</Link>
          <Link href="/laminas" className="hover:text-pink-200 text-sm font-medium">PERSONALIZADAS</Link>
          <Link href="/outlet" className="hover:text-pink-200 text-sm font-medium">DECORATIVAS</Link>
        </div>
      </nav>

      {/* Contenido de la página de contacto */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-pink-500 px-4 py-2 rounded-md">Contacto</h1>
        
        <p className="mb-6">¿Tienes alguna duda? ¡Estamos aquí para ayudarte! Puedes contactarnos fácilmente:</p>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Por email</h2>
          <p className="mb-4">- escribiéndonos un <strong>email</strong> a <a href="mailto:capturasdeana@gmail.com" className="text-blue-600 hover:underline">capturasdeana@gmail.com</a>, o bien completa el siguiente formulario de contacto</p>
          <p className="italic">Te contestaremos lo antes posible...</p>
          <p className="italic">¡Prometido!</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Otras formas de contacto</h2>
          <p className="mb-2">- si prefieres por WhatsApp puedes hacerlo en el número <a href="https://wa.me/34686531854" className="text-blue-600 hover:underline">666 555 444</a></p>
          <p>- y si quieres comentarme algo, lo puedes hacer en el teléfono <a href="tel:646363765" className="text-blue-600 hover:underline">646 363 765</a></p>
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
            <div className={`mb-4 p-3 rounded-md ${
              state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
      className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition disabled:opacity-50"
    >
      {pending ? 'Enviando...' : 'Enviar mensaje'}
    </button>
  );
}