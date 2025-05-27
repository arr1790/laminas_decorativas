// app/perfil/CerrarSesionButton.jsx
"use client";

import { signOut } from "next-auth/react";

export default function CerrarSesionButton() {
  return (
    <form action={signOut}>
    <button
     
      className="mt-6 border border-gray-300 px-4 py-2 text-sm tracking-wide hover:bg-gray-100 transition"
    >
      CERRAR SESIÓN
    </button>
    </form>
  );
}
