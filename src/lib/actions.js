'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import {getUserByEmail } from '@/lib/data';
import { revalidatePath } from 'next/cache'



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

  if (matchPassword) {
      try {
          const result = await signIn('credentials', {
              redirect: false,
              email,
              password,
              callbackUrl: globalThis.callbackUrl || '/' // Usa '/' por defecto si no hay callbackUrl
          })

          if (result?.error) {
              return { error: 'Error en autenticación: ' + result.error }
          }

          return { success: 'Inicio de sesión correcto', redirectUrl: result.url }

      } catch (err) {
          return { error: 'Ocurrió un error en el proceso de inicio de sesión.' }
      }
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

try{
  await prisma.user.create({
    data: { name, email, password, role, active }
  })

  revalidatePath('/dashboard')
  return { success: "Registro correcto" }
}catch(error){
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

  try{
  await prisma.user.update({
    where: { id },
    data: { name, email, password, role, active }
  })

  revalidatePath('/dashboard')
  return { success: "Modificación correcta" }
}catch(error){
    return { error: "Error al modificar el usuario" }
}
}

export async function eliminarUsuario(formData) {
  const id = Number(formData.get('id'))

  try{
  await prisma.user.delete({
    where: { id }
  })

  revalidatePath('/dashboard')
  return { success: "Eliminación correcta" }
}catch(error){
    return { error: "Error al eliminar el usuario" }
}
}

// ------------------------ PRODUCTS ------------------------
export async function insertarProducto(formData) {
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
}

export async function modificarProducto(formData) {
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
}

export async function eliminarProducto(formData) {
  const id = Number(formData.get('id'))

  await prisma.product.delete({
    where: { id }
  })

  revalidatePath('/productos')
}

// ------------------------ ORDERS ------------------------
export async function insertarPedido(formData) {
  const userId = Number(formData.get('userId'))
  const productId = Number(formData.get('productId'))
  const designId = Number(formData.get('designId'))
  const total = parseFloat(formData.get('total'))
  const status = formData.get('status')

  await prisma.order.create({
    data: {
      userId,
      productId,
      designId,
      total,
      status
    }
  })

  revalidatePath('/pedidos')
}

export async function modificarPedido(formData) {
  const id = Number(formData.get('id'))
  const userId = Number(formData.get('userId'))
  const productId = Number(formData.get('productId'))
  const designId = Number(formData.get('designId'))
  const total = parseFloat(formData.get('total'))
  const status = formData.get('status')

  await prisma.order.update({
    where: { id },
    data: {
      userId,
      productId,
      designId,
      total,
      status
    }
  })

  revalidatePath('/pedidos')
}

export async function eliminarPedido(formData) {
  const id = Number(formData.get('id'))

  await prisma.order.delete({
    where: { id }
  })

  revalidatePath('/pedidos')
}

// ------------------------ CARTS ------------------------
export async function insertarCarrito(formData) {
  const userId = Number(formData.get('userId'))
  const productId = Number(formData.get('productId'))
  const designId = Number(formData.get('designId'))

  await prisma.cart.create({
    data: {
      userId,
      productId,
      designId
    }
  })

  revalidatePath('/carritos')
}

export async function modificarCarrito(formData) {
  const id = Number(formData.get('id'))
  const userId = Number(formData.get('userId'))
  const productId = Number(formData.get('productId'))
  const designId = Number(formData.get('designId'))

  await prisma.cart.update({
    where: { id },
    data: {
      userId,
      productId,
      designId
    }
  })

  revalidatePath('/carritos')
}

export async function eliminarCarrito(formData) {
  const id = Number(formData.get('id'))

  await prisma.cart.delete({
    where: { id }
  })

  revalidatePath('/carritos')
}

// ------------------------ CATEGORIES ------------------------
export async function insertarCategoria(formData) {
  const name = formData.get('name')

  await prisma.category.create({
    data: { name }
  })

  revalidatePath('/categorias')
}

export async function modificarCategoria(formData) {
  const id = Number(formData.get('id'))
  const name = formData.get('name')

  await prisma.category.update({
    where: { id },
    data: { name }
  })

  revalidatePath('/categorias')
}

export async function eliminarCategoria(formData) {
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
const nodemailer = require('nodemailer');

export async function submitContactForm(prevState, formData) {
  const name = formData.get('name')?.trim() || '';
  const email = formData.get('email')?.trim() || '';
  const phone = formData.get('phone')?.trim() || null;
  const message = formData.get('message')?.trim() || '';
  const privacyAccepted = formData.get('privacy') === 'on';

  // Validaciones básicas
  if (name.length < 2) return { error: 'Por favor, escribe tu nombre completo.' };
  if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return { error: 'Email inválido.' };
  if (message.length < 10) return { error: 'El mensaje debe tener al menos 10 caracteres.' };
  if (!privacyAccepted) return { error: 'Debes aceptar la política de privacidad.' };

  try {
    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes usar el servicio que prefieras (Ej. Gmail, SendGrid, etc.)
      auth: {
        user: 'anaruano1790@gmail.com',  // Tu correo electrónico
        pass: 'tu_contraseña',        // Tu contraseña o un token de acceso si es necesario
      },
    });

    // Crear el correo
    const mailOptions = {
      from: 'anaruano1790@gmail.com',
      to: 'anaruano1790@gmail.com', // El correo donde quieres recibir los mensajes
      subject: 'Nuevo mensaje de contacto',
      text: `
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone || 'No proporcionado'}
        Mensaje: ${message}
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    // Si todo va bien, guardar el mensaje en la base de datos
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        message,
        privacy: privacyAccepted
      }
    });

    return { success: 'Tu mensaje fue enviado con éxito.' };

  } catch (err) {
    console.error('Error al enviar el mensaje:', err);
    return { error: 'Ocurrió un error al enviar el mensaje. Intenta más tarde.' };
  } finally {
    await prisma.$disconnect();
  }
}
