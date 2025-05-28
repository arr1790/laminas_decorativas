'use client'

import { useState } from "react";
import { actualizarImagenUsuario } from "@/lib/actions";

export default function ActualizarImagenUsuario({ userId }) {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarImagenUsuario(userId, imageUrl);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 w-72">
      <h2 className="text-lg font-bold">Cambiar imagen</h2>
      <input
        type="text"
        placeholder="URL de la nueva imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Guardar
      </button>
    </form>
  );
}
