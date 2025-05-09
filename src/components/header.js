// components/Header.js
import Link from 'next/link'
import { auth } from "@/auth"
import { logout } from '@/lib/actions'
import { ChevronDown } from "lucide-react"

async function Header() {
    const session = await auth()

    return (
        <header className="w-full">
            {/* Barra superior - Menú principal */}
            <div className="bg-black text-white px-4 py-3">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
                    {/* Primera línea - Enlaces principales */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
                        <Link href={session ? "/perfil" : "/auth/login"} className="hover:text-pink-200 transition whitespace-nowrap">
                            {session ? "PERFIL" : "INICIAR SESIÓN/CUENTA"}
                        </Link>
                        <Link href="/envios" className="hover:text-pink-200 transition whitespace-nowrap">ENVÍOS Y DEVOLUCIONES</Link>
                        <Link href="/contacto" className="hover:text-pink-200 transition whitespace-nowrap">CONTACTO</Link>
                        <Link href="/calendario" className="hover:text-pink-200 transition whitespace-nowrap">CALENDARIO EVENTOS 2025</Link>
                    </div>

                     {/* Botón de categorías solo para ADMIN */}
                  {/* Menú desplegable para ADMIN */}
                  {session?.user?.role === 'ADMIN' && (
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-pink-200 transition whitespace-nowrap text-sm">
                                ADMINISTRACIÓN <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Menú desplegable */}
                            <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-50">
                                <div className="py-1">
                                    <Link href="/categorias" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Gestionar Categorías
                                    </Link>
                                    <Link href="/productos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Gestionar Productos
                                    </Link>
                                    <Link href="/pedidos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Gestionar Pedidos
                                    </Link>
                                    <Link href="/usuarios" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Gestionar Usuarios
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
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
                                    className="hover:text-pink-200 text-sm whitespace-nowrap"
                                >
                                    Cerrar sesión
                                </button>
                            </form>
                        ) : (
                            <Link href="/auth/login" className="hover:text-pink-200 text-sm whitespace-nowrap">
                              
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header