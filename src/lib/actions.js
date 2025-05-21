'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { agregarAlCarrito, getUserByEmail, obtenerCarrito } from '@/lib/data';
import { revalidatePath } from 'next/cache'
import slugify from 'slugify';
import { redirect } from 'next/navigation';
import { use } from 'react';



// REGISTER
export async function register(prevState, formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  // Asigna un rol predeterminado de 'user'
  const role = "user";  // O ajusta esto según lo que necesites

  // Comprobamos si el usuario ya está registrado
  const user = await getUserByEmail(email);

  if (user) {
    return { error: 'El email ya está registrado' }
  }

  // Encriptamos password 
  const hashedPassword = await bcrypt.hash(password, 10)

  // Guardamos credenciales en base datos
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role // Incluye el rol
    }
  })

  return { success: "Registro correcto" }
}


export async function login(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const user = await getUserByEmail(email)

  if (!user) {
    return { error: 'Usuario no registrado.' }
  }

  if (!user.active) {
    return { error: 'Usuario deshabilitado. Consulte al administrador de esta app.' }
  }

  let matchPassword = false

  if (!user.password) {
    matchPassword = true // Usuario sin contraseña (caso especial)
  } else {
    matchPassword = await bcrypt.compare(password, user.password)
  }

  if (user && matchPassword) {

    await signIn('credentials', {

      email,
      password,
      redirectTo: globalThis.callbackUrl
    })

    // if (result?.error) {
    //   return { error: 'Error en autenticación: ' + result.error }
    // }

    // return { success: 'Inicio de sesión correcto' }

  } else {
    return { error: 'Credenciales incorrectas.' }
  }
}




// LOGIN google
export async function loginGoogle() {
  try {
    await signIn('google', { redirectTo: globalThis.callbackUrl })
  } catch (error) {
    console.log(error);
    throw error
  }
}

// LOGIN github
export async function loginGithub() {
  try {
    await signIn('github', { redirectTo: globalThis.callbackUrl })
  } catch (error) {
    console.log(error);
    throw error
  }
}


// LOGIN discord
export async function loginDiscord() {
  try {
    await signIn('discord', { redirectTo: globalThis.callbackUrl })
  } catch (error) {
    console.log(error);
    throw error
  }
}


// LOGIN resend (Magic Link to email)
export async function loginResend(formData) {
  try {
    await signIn("resend", formData)
  } catch (error) {
    console.log(error);
    throw error
  }
}



// LOGOUT
export async function logout() {
  try {
    await signOut({ redirectTo: '/' })
  } catch (error) {
    throw error
  }
}

export async function activeUser(user, currentUser) {
  if (currentUser.role === 'admin') {  // Solo el admin puede cambiar el estado
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { active: !user.active },
      });
      revalidatePath("/dashboard");
      return { success: `Usuario ${user.active ? 'activado' : 'desactivado'} correctamente.` };
    } else {
      return { error: 'Usuario no encontrado.' };
    }
  } else {
    return { error: 'No tiene permisos para realizar esta acción.' };
  }
}


// ------------------------ USERS ------------------------
export async function insertarUsuario(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const role = formData.get('role')
  const active = Boolean(formData.get('active'))

  try {
    await prisma.user.create({
      data: { name, email, password, role, active }
    })

    revalidatePath('/dashboard')
    return { success: "Registro correcto" }
  } catch (error) {
    return { error: "Error al registrar el usuario" }
  }
}

export async function modificarUsuario(formData) {
  const id = Number(formData.get('id'))
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const role = formData.get('role')
  const active = Boolean(formData.get('active'))

  try {
    await prisma.user.update({
      where: { id },
      data: { name, email, password, role, active }
    })

    revalidatePath('/dashboard')
    return { success: "Modificación correcta" }
  } catch (error) {
    return { error: "Error al modificar el usuario" }
  }
}

export async function eliminarUsuario(formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.user.delete({
      where: { id }
    })

    revalidatePath('/dashboard')
    return { success: "Eliminación correcta" }
  } catch (error) {
    return { error: "Error al eliminar el usuario" }
  }
}

// ------------------------ PRODUCTS ------------------------
export async function insertarProducto(prevState, formData) {
  const name = formData.get('name')
  const description = formData.get('description')
  const basePrice = parseFloat(formData.get('basePrice'))
  const dimensions = formData.get('dimensions')
  const withFrame = formData.get('withFrame') === 'true'
  const image = formData.get('image')
  const categoryId = Number(formData.get('categoryId'))

  await prisma.product.create({
    data: {
      name,
      description,
      basePrice,
      dimensions,
      withFrame,
      image,
      categoryId
    }
  })

  revalidatePath('/productos')
  return { success: "Producto insertado correcto" }
}

export async function modificarProducto(prevState, formData) {
  const id = Number(formData.get('id'))
  const name = formData.get('name')
  const description = formData.get('description')
  const basePrice = parseFloat(formData.get('basePrice'))
  const dimensions = formData.get('dimensions')
  const withFrame = formData.get('withFrame') === 'true'
  const image = formData.get('image')
  const categoryId = Number(formData.get('categoryId'))

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      basePrice,
      dimensions,
      withFrame,
      image,
      categoryId
    }
  })

  revalidatePath('/productos')
  return { success: "Producto modificado correcto" }
}

export async function eliminarProducto(prevState, formData) {
  const id = Number(formData.get('id'))

  await prisma.product.delete({
    where: { id }
  })

  revalidatePath('/productos')
  return { success: "Producto eliminado correctamente" }
}

// ------------------------ ORDERS ------------------------


export async function insertarOrden(formData) {
  const userId = formData.get('userId');

  const carrito = await obtenerCarrito(userId);

  console.log("Carrito desde la acción:", carrito);

  // Calcula el total del pedido
  const total = carrito.orderItems.reduce(
    (sum, item) => sum + Number(item.product[0].basePrice) * item.cantidad,
    0
  );

  const nuevoPedido = await prisma.order.create({
    data: {
      status: 'pendiente',
      total: total,
      user: {
        connect: { id: userId },
      },
      orderItems: {
        create: carrito.orderItems.map(item => ({
          cantidad: item.cantidad,
          product: {
            connect: { id: item.productId },
          },
          productId: item.productId,
        })),
      },
    },
  });

  // Limpiar el carrito
  await prisma.orderItem.updateMany({
  where: { cartId: carrito.id },
  data: { cartId: null },
});

  redirect('/perfil');
}



export async function getAllOrdersByUser(userId) {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return orders;
}

export async function getAllOrders() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return orders;
}


export async function deleteOrder(formData) {
  const id = Number(formData.get('id'))
  const order = await prisma.order.delete({
    where: { id }
  })

  revalidatePath('/perfil')
  return { success: "Pedido eliminado correctamente" }
}

// ------------------------ CARTS ------------------------
export async function insertarCarrito(formData) {
  const userId = formData.get('userId')
  const productId = Number(formData.get('productId'))
  const text1 = formData.get('text1')
  const text2 = formData.get('text2')

  console.log(userId, productId, text1, text2)
  console.log("insertarCarrito", formData);

  await agregarAlCarrito(userId, productId, text1, text2)
  revalidatePath('/');
}

export async function sumarAlCarrito(formData) {
  const OrderItemId = Number(formData.get('orderItemId'))

  await prisma.orderItem.update({
    where: { id: OrderItemId },
    data: { cantidad: { increment: 1 } }
  })

  revalidatePath('/')

}
export async function restarAlCarrito(formData) {
  const orderItemId = Number(formData.get('orderItemId'))

  // Obtener el item actual para saber su cantidad
  const item = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
    select: { cantidad: true }
  })

  if (!item) return

  if (item.cantidad <= 1) {
    // Si la cantidad es 1 o menos, eliminar el item
    await prisma.orderItem.delete({
      where: { id: orderItemId }
    })
  } else {
    // Si hay más de 1, simplemente restar 1
    await prisma.orderItem.update({
      where: { id: orderItemId },
      data: { cantidad: { decrement: 1 } }
    })
  }

  revalidatePath('/')
}


export async function eliminarDelCarrito(formData) {

  console.log("eliminarDelCarrito", formData);

  const orderItemId = Number(formData.get('orderItemId'));

  await prisma.orderItem.delete({
    where: { id: orderItemId }
  })

  revalidatePath('/');
}


export async function eliminarCarrito(formData) {
  const id = Number(formData.get('id'))

  await prisma.cart.delete({
    where: { id }
  })

  revalidatePath('/carritos')
}

// ------------------------ CATEGORIES ------------------------
export async function insertarCategoria(prevState, formData) {
  const name = formData.get('name')
  const slug = slugify(name)

  await prisma.category.create({
    data: { name, slug }
  })

  revalidatePath('/categorias')
  return { success: "Categoria insertada" }
}

export async function modificarCategoria(prevState, formData) {
  const id = Number(formData.get('id'))
  const name = formData.get('name')
  const slug = slugify(name)

  await prisma.category.update({
    where: { id },
    data: { name, slug }
  })

  revalidatePath('/categorias')
  return { success: "Categoria modificada" }
}

export async function eliminarCategoria(prevState, formData) {
  const id = Number(formData.get('id'))

  await prisma.category.delete({
    where: { id }
  })

  revalidatePath('/categorias')
}



// ------------------------ CUSTOM DESIGNS ------------------------
export async function insertarDiseno(formData) {
  const userId = Number(formData.get('userId'))
  const productId = Number(formData.get('productId'))
  const designName = formData.get('designName')
  const designImage = formData.get('designImage')

  await prisma.customDesign.create({
    data: {
      userId,
      productId,
      designName,
      designImage
    }
  })

  revalidatePath('/disenos')
}

export async function modificarDiseno(formData) {
  const id = Number(formData.get('id'))
  const userId = Number(formData.get('userId'))
  const productId = Number(formData.get('productId'))
  const designName = formData.get('designName')
  const designImage = formData.get('designImage')

  await prisma.customDesign.update({
    where: { id },
    data: {
      userId,
      productId,
      designName,
      designImage
    }
  })

  revalidatePath('/disenos')
}

export async function eliminarDiseno(formData) {
  const id = Number(formData.get('id'))

  await prisma.customDesign.delete({
    where: { id }
  })

  revalidatePath('/disenos')
}



// ------------------------ CONTACT FORM ------------------------ 
// const nodemailer = require('nodemailer');

export async function submitContactForm(prevState, formData) {
  const name = formData.get('name')?.trim() || '';
  const email = formData.get('email')?.trim() || '';
  const phone = formData.get('phone')?.trim() || null;
  const message = formData.get('message')?.trim() || '';
  const privacyAccepted = formData.get('privacy') === 'on';

  try {

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        message,
        // privacy: privacyAccepted
      }
    });

    return { success: 'Tu mensaje fue enviado con éxito.' };

  } catch (err) {

    return { error: 'Ocurrió un error al registrar el mensaje. Intenta más tarde.' };
  }
}

export async function deleteMessage(formData) {
  const id = Number(formData.get('id'))

  await prisma.contactMessage.delete({
    where: { id }
  })

  revalidatePath('/mensajes')
}

export async function actualizarImagenUsuario(userId, imageUrl) {
  await prisma.user.update({
    where: { id: userId },
    data: { image: imageUrl }
  });
}
export async function guardarDireccion(data) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !user.id) {
    throw new Error('No se ha iniciado sesión');
  }

  try {
    const nuevaDireccion = await prisma.address.create({
      data: {
        userId: user.id,
        nombre: data.nombre,
        apellido: data.apellido,
        direccion1: data.direccion1,
        direccion2: data.direccion2 || '',
        ciudad: data.ciudad,
        pais: data.pais,
        provincia: data.provincia,
        codigoPostal: data.codigoPostal,
        telefono: data.telefono,
      },
    });

    return { ok: true, direccion: nuevaDireccion };
  } catch (error) {
    console.error('Error al guardar dirección:', error);
    return { ok: false, error: 'No se pudo guardar la dirección' };
  }
}








