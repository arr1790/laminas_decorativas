// components/Header.js
import Link from 'next/link'
import { auth } from "@/auth"
import { logout } from '@/lib/actions'

async function Header() {
    const session = await auth()

    return (
        <header className="w-full">
            {/* Barra superior - Menú principal */}
            <div className="bg-blue-600 text-white px-4 py-3">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
                    {/* Primera línea - Enlaces principales */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
                        <Link href="/mi-cuenta" className="hover:text-blue-200 transition whitespace-nowrap">MI CUENTA</Link>
                        <Link href="/envios" className="hover:text-blue-200 transition whitespace-nowrap">ENVÍOS Y DEVOLUCIONES</Link>
                        <Link href="/contacto" className="hover:text-blue-200 transition whitespace-nowrap">CONTACTO</Link>
                        <Link href="/calendario" className="hover:text-blue-200 transition whitespace-nowrap">CALENDARIO EVENTOS 2025</Link>
                    </div>
                    
                    {/* Carrito y autenticación */}
                    <div className="flex items-center gap-4">
                        <Link href="/carrito" className="hover:text-blue-200 transition text-xs md:text-sm whitespace-nowrap">
                            CARRITO (0 PRODUCTOS - 0,00€)
                        </Link>
                        
                        {session?.user?.role === 'ADMIN' && (
                            <Link href="/admin" className="hover:text-blue-200 text-sm whitespace-nowrap">Admin Panel</Link>
                        )}
                        
                        {session ? (
                            <form>
                                <button 
                                    formAction={logout} 
                                    className="hover:text-blue-200 text-sm whitespace-nowrap"
                                >
                                    Cerrar sesión
                                </button>
                            </form>
                        ) : (
                            <Link href="/auth/login" className="hover:text-blue-200 text-sm whitespace-nowrap">Iniciar sesión</Link>
                        )}
                    </div>
                </div>
            </div>

       
        </header>
    )
}

export default Header