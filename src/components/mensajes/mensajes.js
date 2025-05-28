import { getMessages } from "@/lib/data";
import { User, Mail, Phone, MessageSquare, Calendar } from "lucide-react";
import { DeleteButton } from "./Eliminar";
import { BackButton } from "../BackButton";

async function Mensajes() {
  const mensajes = await getMessages();
  
  return ( 
    
    <div className="space-y-6">
      <BackButton />
      <div className="flex items-center gap-3 mb-8">
       
      
      </div>

      <div className="grid gap-5">
        {mensajes.map((message) => (
          <div 
            key={message.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
           
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{message.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                      <Mail className="w-4 h-4" />
                      {message.email}
                    </span>
                    {message.phone && (
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                        <Phone className="w-4 h-4" />
                        {message.phone}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {message.createdAt.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

          
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p className="text-gray-700 whitespace-pre-line">{message.message}</p>
              </div>

           <div className="flex justify-end gap-2 mt-4">
                <DeleteButton id={message.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {mensajes.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No hay mensajes recibidos</p>
        </div>
      )}
    </div>
  );
}

export default Mensajes;