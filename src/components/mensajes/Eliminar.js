"use client"; 

import { deleteMessage } from "@/lib/actions"; 

export function DeleteButton({ id }) {
  return (
    <form action={deleteMessage}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        className="text-sm text-red-600 hover:text-red-800"
      >
        Eliminar
      </button>
    </form>
  );
}