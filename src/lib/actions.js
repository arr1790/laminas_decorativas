'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { agregarAlCarrito, getUserByEmail, obtenerCarrito } from '@/lib/data';
import { revalidatePath } from 'next/cache'
import slugify from 'slugify';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';




// REGISTER
export async function register(prevState, formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')


  const role = "user";
  const user = await getUserByEmail(email);

  if (user) {
    return { error: 'El email ya está registrado' }
  }
  const regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;

  if (!regexp_password.test(password)) {
    return { error: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.' }
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


export async function modificarUsuario(prevState, formData) {
  const id = formData.get('id'); // string, correcto
  const name = formData.get('name');
  const role = formData.get('role');
  const active = formData.get('active') === 'on';

  if (!id || typeof id !== 'string') {
    return { error: 'ID inválido' };
  }

  try {
    await prisma.user.update({
      where: { id },
      data: { name, role, active },
    });

    revalidatePath('/dashboard');
    return { success: 'Modificación correcta' };
  } catch (error) {
    console.error('MODIFICAR USUARIO ERROR:', error);
    return { error: 'Error al modificar el usuario: ' + error.message };
  }
}
export async function eliminarUsuario(prevState, formData) {
  const id = formData.get('id');

  if (!id || typeof id !== 'string') {
    return { error: 'ID inválido para eliminar' };
  }

  try {
    // Borra los carts relacionados (y otras tablas si hace falta)
    await prisma.cart.deleteMany({
      where: { userId: id },
    });

    // Elimina el usuario
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath('/');
    return { success: 'Eliminación correcta' };
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    return { error: 'Error al eliminar el usuario: ' + error.message };
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

export async function insertarOrder(formData) {
  const userId = formData.get("userId");

  const carrito = await obtenerCarrito(userId);

  if (!carrito) {
    throw new Error("Carrito no encontrado para el usuario " + userId);
  }

  const nombre = formData.get("nombre")?.toString() || "";
  const apellido = formData.get("apellido")?.toString() || "";
  const direccion1 = formData.get("direccion1")?.toString() || "";
  const direccion2 = formData.get("direccion2")?.toString() || "";
  const ciudad = formData.get("ciudad")?.toString() || "";
  const pais = formData.get("pais")?.toString() || "";
  const provincia = formData.get("provincia")?.toString() || "";
  const codigoPostal = formData.get("codigoPostal")?.toString() || "";
  const telefono = formData.get("telefono")?.toString() || "";
  const email = formData.get("email")?.toString() || "";

  const direccion = await prisma.address.upsert({
    where: { userId },
    update: {
      nombre,
      apellido,
      direccion1,
      direccion2,
      ciudad,
      pais,
      provincia,
      codigoPostal,
      telefono,
      email,
    },
    create: {
      userId,
      nombre,
      apellido,
      direccion1,
      direccion2,
      ciudad,
      pais,
      provincia,
      codigoPostal,
      telefono,
      email,
    },
  });

  const total = carrito.orderItems.reduce(
    (sum, item) => sum + Number(item.product.basePrice) * item.cantidad,
    0
  );

  const nuevoPedido = await prisma.order.create({
    data: {
      status: "pendiente",
      total: total,
      address: {
        connect: { id: direccion.id },
      },
      user: {
        connect: { id: userId },
      },
      orderItems: {
        create: carrito.orderItems.map((item) => ({
          cantidad: item.cantidad,
          product: {
            connect: { id: item.productId },
          },
        })),
      },
    },
  });



  await prisma.orderItem.updateMany({
    where: { cartId: carrito.id },
    data: { cartId: null },
  });

  redirect("/perfil");
}


export async function getAllOrdersByUser(userId) {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      user: true,
      address: true,
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


export async function deleteOrder(prevState, formData) {
  const id = Number(formData.get('id'))
  const order = await prisma.order.delete({
    where: { id }
  })

  revalidatePath('/perfil')
  return { success: "Pedido eliminado correctamente" }


}

export async function modificarOrder(prevState, formData) {
  const id = Number(formData.get('id'))
  const status = formData.get('status')

  await prisma.order.update({
    where: { id },
    data: { status }
  })

  revalidatePath('/pedidos')
  return { success: "Pedido modificado correctamente" }
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


  const item = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
    select: { cantidad: true }
  })

  if (!item) return

  if (item.cantidad <= 1) {

    await prisma.orderItem.delete({
      where: { id: orderItemId }
    })
  } else {
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





// ------------------------ CONTACT FORM ------------------------ 


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

// ------------------------ MODIFICAR IMAGEN DEL USUARIO ------------------------ 

export async function actualizarImagenUsuario(userId, imageUrl) {
  await prisma.user.update({
    where: { id: userId },
    data: { image: imageUrl }
  });
}


// ------------------------ ADRESS ------------------------ 

export async function guardarDireccion(data) {
  const session = await auth();
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
        telefono: data.telefono || '',
        email: user.email || '',
      },
    });

    return { ok: true, direccion: nuevaDireccion };
  } catch (error) {
    console.error('Error al guardar dirección:', error);
    return { ok: false, error: 'No se pudo guardar la dirección' };
  }
}




export async function guardarOModificarDireccion(formData) {
  const id = formData.get('id');
  const nombre = formData.get('nombre');
  const apellido = formData.get('apellido');
  const direccion1 = formData.get('direccion1');
  const direccion2 = formData.get('direccion2');
  const ciudad = formData.get('ciudad');
  const pais = formData.get('pais');
  const provincia = formData.get('provincia');
  const codigoPostal = formData.get('codigoPostal');
  const telefono = formData.get('telefono');

  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    throw new Error('No has iniciado sesión');
  }

  if (id) {

    const idNum = Number(id);
    const existing = await prisma.address.findUnique({ where: { id: idNum } });
    if (!existing) {
      return { ok: false, error: 'Dirección no encontrada' };
    }

    await prisma.address.update({
      where: { id: idNum },
      data: {
        nombre,
        apellido,
        direccion1,
        direccion2,
        ciudad,
        pais,
        provincia,
        codigoPostal,
        telefono,
      },
    });
  } else {

    await prisma.address.create({
      data: {
        userId: user.id,
        email: user.email || '',
        nombre,
        apellido,
        direccion1,
        direccion2,
        ciudad,
        pais,
        provincia,
        codigoPostal,
        telefono,
      },
    });
  }

  revalidatePath('/perfil/direccion');
  return { ok: true };
}

// ------------------------ SEARCH ------------------------ 

export async function busqueda(query) {
  const productos = await prisma.product.findMany({


    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { category:{is : {name: { contains: query, mode: 'insensitive' } } } },
      ],
    },
    include: {
      category: true
    } 
  })

  return productos
}






