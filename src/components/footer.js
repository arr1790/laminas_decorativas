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
            <li><Link href="/sobre-mi" className="hover:underline">Sobre Mí</Link></li>
            <li><Link href="/aviso-legal" className="hover:underline">Aviso legal</Link></li>
            <li><Link href="/envios" className="hover:underline">Envíos y devoluciones</Link></li>
          </ul>
        </div>

        {/* Contacto y redes */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">Contacto</h3>
          <p className="text-gray-300 mb-4">
            ¡Estamos aquí para ayudarte! No dudes en contactarnos en el correo&nbsp;
            <a href="mailto:info@laminara.es" className="underline">info@laminara.es</a>.
          </p>

          <h3 className="text-xs font-semibold tracking-widest text-white uppercase mb-2">Redes Sociales</h3>
          <p className="text-gray-300">
            Síguenos en Instagram:&nbsp;
            <a
              href="https://www.instagram.com/capturasdeana/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
             
              @capturasdeana
            </a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} ANA RUANO. Todos los derechos reservados.
      </div>
    </footer>
  );
}
