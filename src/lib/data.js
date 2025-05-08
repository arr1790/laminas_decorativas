'use server'

import prisma from "@/lib/prisma"

// ----------------------------  USERS ---------------------------

export async function getUsers() {
    const users = await prisma.user.findMany({
        include: {
            orders: true,
            addresses: true
        }
    });
    return users
}



export async function getUserById(id) {

    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            addresses: true, 
            orders: true
        }

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


export async function obtenerCategoria(id) {
    return await prisma.category.findUnique({
      where: { id: Number(id) }, 
      include: { products: true }
    })
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

// ---------------------   DIRECCIONES -----------------------

export async function obtenerDirecciones(userId) {
    const direcciones = await prisma.address.findMany({
        where: { userId },
        orderBy: { porDefecto: 'desc' }
    });
    return direcciones;
}

export async function obtenerDireccionPorId(id) {
    const direccion = await prisma.address.findUnique({
        where: { id: Number(id) }
    });
    return direccion;
}

export async function crearDireccion(data) {
    const nuevaDireccion = await prisma.address.create({
        data: {
            ...data,
            porDefecto: data.porDefecto || false
        }
    });
    return nuevaDireccion;
}

export async function actualizarDireccion(id, data) {
    const direccionActualizada = await prisma.address.update({
        where: { id: Number(id) },
        data
    });
    return direccionActualizada;
}

export async function eliminarDireccion(id) {
    const direccionEliminada = await prisma.address.delete({
        where: { id: Number(id) }
    });
    return direccionEliminada;
}

export async function establecerDireccionPorDefecto(userId, direccionId) {

    await prisma.address.updateMany({
        where: { userId },
        data: { porDefecto: false }
    });

  
    const direccionPorDefecto = await prisma.address.update({
        where: { id: Number(direccionId) },
        data: { porDefecto: true }
    });

    return direccionPorDefecto;
}
export async function getMessages() {
    const contactMessages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
       
    });
    return contactMessages;
}
