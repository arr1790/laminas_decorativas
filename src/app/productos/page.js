import Productos from "@/components/productos/lista";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default async function ProductosPage() {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return redirect('/');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Inicio</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-lg text-gray-600">Cargando productos...</p>
          </div>
        }>
          <Productos />
        </Suspense>
      </div>
    </div>
  );
}
