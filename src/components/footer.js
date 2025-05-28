// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 mt-12 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Soporte */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">Soporte</h3>
          <ul className="space-y-2">
            <li><Link href="/sobre-mi" className="hover:underline">Sobre Mi</Link></li>
            <li><Link href="/aviso-legal" className="hover:underline">Aviso legal</Link></li>
            <li><Link href="/envios" className="hover:underline">Envíos y devoluciones</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">Contacto</h3>
          <p className="text-gray-300">
            ¡Estamos aquí para ayudarte! No dudes en contactar con nosotros para cualquier cosa que necesites en el correo <a href="mailto:laminara@gmail.es" className="underline">info@laminara.es</a>
          </p>
        </div>
      </div>

      

      {/* Copyright */}
      <div className="mt-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} ANA RUANO . Todos los derechos reservados.
      </div>
    </footer>
  );
}
