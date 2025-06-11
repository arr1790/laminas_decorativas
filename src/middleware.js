// Run on edge
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig); // Se configura NextAuth con la configuración personalizada
// Middleware de autenticación
export default auth((req) => {
    // Mostrar por consola la ruta actual y el estado de autenticación del usuario
    console.log(' MIDDLEWARE', req.nextUrl.pathname, req.auth);
     // Si el usuario NO está autenticado
    if (!req.auth) {  
 // Construir la URL de retorno (callback) con la ruta actual
        let callbackUrl = req.nextUrl.pathname; // 
        if (req.nextUrl.search) {
            callbackUrl += req.nextUrl.search;
        }
         // Codifica la URL de retorno para pasarla como parámetro
         const encodedCallbackUrl = encodeURIComponent(callbackUrl);
       // Redirecciona al login, incluyendo la URL de retorno como parámetro
         return Response.redirect(req.nextUrl.origin
            + `/auth/login?callbackUrl=${encodedCallbackUrl}`)
    }

})

// Configuración del middleware: define qué rutas deben protegerse con autenticación
export const config = {
    matcher: [
        // asi es otra opcion que se podria hacer para proteger todas las rutas
        //  '/((?!api|auth|images|pwa|pedidos|perfil|direcciones|categorias|productos|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)',

       // Estas rutas están protegidas: solo se puede acceder si el usuario está autenticado
        "/pedidos(.*)",
        "/perfil(.*)",
        "/direcciones(.*)",
       
        

    ],
} 