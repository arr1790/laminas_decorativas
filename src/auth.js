import NextAuth from "next-auth"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/lib/data"
import authConfig from "@/auth.config"


export const options = {
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error'
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async session({ session, token }) {
            // Asignar el ID de usuario y el rol desde el token
            session.user.id = token?.sub;  // Asigna el ID del usuario
            session.user.role = token?.role;  // Asigna el rol del usuario
    
            // Obtener la información actualizada del usuario en cada petición
            const updatedUser = await getUserById(session.user.id);  // Función que obtiene el usuario por ID
    
            if (updatedUser) {
                session.user.name = updatedUser.name;  // Actualiza el nombre en la sesión
                session.user.email = updatedUser.email;  // Actualiza el email en la sesión
            }
    
            return session;  // Retorna la sesión modificada
        },
    
                  
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await getUserById(token.sub)
            if (!user) return token;

            token.role = user?.role
            return token
        }
    },

}



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...options, ...authConfig })