'use server'

import prisma from "@/lib/prisma"

// ----------------------------  USUARIOS ---------------------------

export async function obtenerUsuarios() {
    const usuarios = await prisma.user.findMany({
        include: { orders: true }
    });
    return usuarios;
}

export async function obtenerUsuarioPorId(id) {
    const usuario = await prisma.user.findUnique({
        where: { id },
        include: { orders: true }
    });
    return usuario;
}

export async function obtenerUsuarioPorEmail(email) {
    const usuario = await prisma.user.findUnique({
        where: { email },
        include: { orders: true }
    });
    return usuario;
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
            product: true,  // Relación con 'product'
            design: true    // Relación con 'customDesign'
        }
    });
    return carritos;
}

export async function obtenerCarritoPorId(id) {
    const carrito = await prisma.cart.findUnique({
        where: { id },
        include: {
            product: true,  // Relación con 'product'
            design: true    // Relación con 'customDesign'
        }
    });
    return carrito;
}

// ---------------------   PEDIDOS -----------------------

export async function obtenerPedidos(userId) {
    const pedidos = await prisma.order.findMany({
        where: { userId },
        include: {
            product: true,  // Relación con 'product'
            design: true    // Relación con 'customDesign'
        }
    });
    return pedidos;
}

export async function obtenerPedidoPorId(id) {
    const pedido = await prisma.order.findUnique({
        where: { id },
        include: {
            product: true,  // Relación con 'product'
            design: true    // Relación con 'customDesign'
        }
    });
    return pedido;
}

// ---------------------   PRODUCTOS -----------------------

export async function obtenerProductos() {
    const productos = await prisma.product.findMany({
        include: {
            category: true  // Relación con 'category'
        }
    });
    return productos;
}

export async function obtenerProductoPorId(id) {
    const producto = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true  // Relación con 'category'
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
            product: true  // Relación con 'product'
        }
    });
    return diseñosPersonalizados;
}

export async function obtenerDiseñoPersonalizadoPorId(id) {
    const diseñoPersonalizado = await prisma.customDesign.findUnique({
        where: { id },
        include: {
            product: true  // Relación con 'product'
        }
    });
    return diseñoPersonalizado;
}
