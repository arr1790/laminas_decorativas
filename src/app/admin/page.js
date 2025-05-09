import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Suspense } from "react"
import Mensajes from "@/components/mensajes/mensajes"
import { Shield, User, Mail, Key, MessageSquare, Mailbox } from "lucide-react"

async function PaginaAdmin() {
  const sesion = await auth()

  if (sesion && sesion?.user?.role === 'ADMIN')
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
         
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-lg text-gray-600">Gestión de mensajes recibidos</p>
          </div>


          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {sesion?.user.image && (
                  <img 
                    src={sesion?.user.image} 
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                  />
                )}
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    <p className="text-xl font-semibold">{sesion?.user.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <p className="text-gray-600">{sesion?.user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-blue-500" />
                    <p className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {sesion?.user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mailbox className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800">Mensajes Recibidos</h2>
            </div>
            
            <Suspense fallback={
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            }>
              <div className="grid gap-4">
                <Mensajes />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    )
  else redirect('/dashboard')
}

export default PaginaAdmin