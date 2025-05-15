// components/Header.js
import Link from 'next/link'
import { auth } from "@/auth"
import { logout } from '@/lib/actions'
import { ChevronDown, User, ShoppingCart, Mail } from "lucide-react"
import DropdownCategorias from "./DropdownCategorias"

async function Header() {
    const session = await auth()

    return (
        <header className="w-full bg-white text-black">
            {/* Barra única negra con todos los elementos */}
            <nav className="container mx-auto px-4 py-3">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo */}
                    <div className="text-2xl font-bold">LAMINARA</div>


                    {/* Menú principal */}
                    <nav className="bg-white border-y border-gray-200 mt-0">
                        <div className="flex justify-center py-2 px-2">
                            <DropdownCategorias />
                        </div>
                    </nav>

                    {/* Iconos de carrito y perfil */}
                    <div className="flex items-center gap-4">
                        <Link href="/carrito" className="hover:text-pink-200 transition">
                            <ShoppingCart className="w-5 h-5" />
                        </Link>


                        <Link href="/contacto" className="hover:text-pink-200">
                            <Mail className="w-5 h-5" />
                        </Link>



                        {session && session.user.role === 'ADMIN' && (
                            <Link href="/admin" className="hover:text-pink-200">
                                <ChevronDown className="w-5 h-5" />
                            </Link>
                        )}

                        <Link href={session ? "/perfil" : "/auth/login"} className="hover:text-pink-200">
                            <User className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Barra de información de envíos */}
            <div className="bg-black text-white text-center py-2 text-xs">
                <p>ENVÍOS A TODA ESPAÑA. ENTREGA ENTRE 4 Y 9 DÍAS LABORALES.</p>
            </div>
        </header >
    )
}

export default Header