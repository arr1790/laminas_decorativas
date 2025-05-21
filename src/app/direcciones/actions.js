'use server';

import { guardarDireccion } from '@/lib/actions';

export async function handleSubmit(formData) {
  try {
    await guardarDireccion(formData);
  } catch (error) {
    console.error(error);
  }
}
