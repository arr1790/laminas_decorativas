'use server'

import prisma from "@/lib/prisma"

// ----------------------------  USERS ---------------------------

export async function getUsers() {
    const users = await prisma.user.findMany({
        include: { pedidos: true }
    });
    return users
}



export async function getUserById(id) {

    const user = await prisma.user.findUnique({
        where: { id }
    });
    return user
}





export async function getUserByEmail(email) {
  if (!email) {
    throw new Error("El email es obligatorio.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error("Error al obtener el usuario por email:", error);
    throw error;
  }
}





// ---------------------   CUENTAS -----------------------

export async function obtenerCuentas(userId) {
    const cuentas = await prisma.account.findMany({
        where: { userId }
    });
    return cuentas;
}

// ---------------------   CARRITOS -----------------------

export async function obtenerCarritos(userId) {
    const carritos = await prisma.cart.findMany({
        where: { userId },
        include: {
            product: true,  
            design: true    
        }
    });
    return carritos;
}

export async function obtenerCarritoPorId(id) {
    const carrito = await prisma.cart.findUnique({
        where: { id },
        include: {
            product: true,  
            design: true    
        }
    });
    return carrito;
}

// ---------------------   PEDIDOS -----------------------

export async function obtenerPedidos(userId) {
    const pedidos = await prisma.order.findMany({
        where: { userId },
        include: {
            product: true,  
            design: true   
        }
    });
    return pedidos;
}

export async function obtenerPedidoPorId(id) {
    const pedido = await prisma.order.findUnique({
        where: { id },
        include: {
            product: true,  
            design: true   
        }
    });
    return pedido;
}

// ---------------------   PRODUCTOS -----------------------

export async function obtenerProductos() {
    const productos = await prisma.product.findMany({
        include: {
            category: true  
        }
    });
    return productos;
}

export async function obtenerProductoPorId(id) {
    const producto = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true  
        }
    });
    return producto;
}

// ---------------------   CATEGORÍAS -----------------------

export async function obtenerCategorias() {
    const categorias = await prisma.category.findMany();
    return categorias;
}

export async function obtenerCategoriaPorId(id) {
    const categoria = await prisma.category.findUnique({
        where: { id }
    });
    return categoria;
}

// ---------------------   DISEÑOS PERSONALIZADOS -----------------------

export async function obtenerDiseñosPersonalizados(userId) {
    const diseñosPersonalizados = await prisma.customDesign.findMany({
        where: { userId },
        include: {
            product: true  
        }
    });
    return diseñosPersonalizados;
}

export async function obtenerDiseñoPersonalizadoPorId(id) {
    const diseñoPersonalizado = await prisma.customDesign.findUnique({
        where: { id },
        include: {
            product: true  
        }
    });
    return diseñoPersonalizado;
}
