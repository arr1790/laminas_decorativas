// components/Header.js
import Link from 'next/link'
import { auth } from "@/auth"
import { ChevronDown, User, ShoppingCart, Mail, Package } from "lucide-react"
import DropdownCategorias from './DropdownCategorias'
import MobileMenu from './dropdownMobileButon'
import { obtenerCategorias } from '@/lib/data'
import { obtenerCarrito } from '@/lib/data'
import ModalCarrito from './carrito/modal-carrito'
import Search from './search'


async function Header() {
    const session = await auth()
    const categories = await obtenerCategorias()
    const carrito = session ? await obtenerCarrito(session.user.id) : []


    return (
        <header className="w-full bg-stone-200 text-black">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo */}
                    <div className="text-2xl font-bold">
                        <Link href="/" className="hover:text-gray-600 transition-colors cursor-pointer inline-block">
                            LAMINARA
                        </Link>
                    </div>

                    {/* Menú móvil */}
                    <div className="absolute top-4 right-4 md:hidden">
                        <MobileMenu categories={categories} />
                    </div>

                    {/* Menú principal */}
                    <nav className="hidden md:block">
                        <div className="flex justify-center py-2 px-2">
                            <DropdownCategorias />
                        </div>
                    </nav>
                    <Search />

                    {/* Iconos */}
                    <div className="flex items-center gap-4">
                        <ModalCarrito carrito={carrito} session={session} />

                        <Link href="/contacto" className="hover:text-shadow-neutral-500">
                            <Mail className="w-5 h-5" />
                        </Link>

                        {/* {session?.user.role === 'ADMIN' && (
                    <Link href="/todospedidos" className="hover:text-pink-200">
                        <Package className="w-5 h-5" />
                    </Link>
                )} */}

                        {session?.user.role === 'ADMIN' && (
                            <Link href="/admin" className="hover:text-shadow-neutral-500">
                                <ChevronDown className="w-5 h-5" />
                            </Link>
                        )}

                        <Link href={session ? "/perfil" : "/auth/login"} className="hover:text-shadow-neutral-500">
                            <User className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="bg-black text-white text-center py-2 text-xs">
                <p>ENVÍOS A TODA ESPAÑA. ENTREGA ENTRE 4 Y 9 DÍAS LABORALES.</p>
            </div>
        </header>
    )
}

export default Header