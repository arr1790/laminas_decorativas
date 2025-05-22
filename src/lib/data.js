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

// lib/data.js
export async function obtenerCarrito(userId) {
  try {
    let carrito = await prisma.cart.findFirst({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // Si no existe, lo creamos
    if (!carrito) {
      await prisma.cart.create({
        data: { userId },
      });

      // Volvemos a buscarlo con los includes
      carrito = await prisma.cart.findFirst({
        where: { userId },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      console.log('Nuevo carrito creado:', carrito);
    }

    return carrito;
  } catch (error) {
    console.error('Error al obtener o crear carrito:', error);
    return null;
  }
}





export async function agregarAlCarrito(userId, productId, text1, text2, quantity = 1) {

    const carrito = await obtenerCarrito(userId)

    console.log('Carrito:', carrito)
    const nuevoProducto = await prisma.orderItem.create({
        data: {
            product :{connect: { id: productId }},
            productId: productId,
            texto1: text1,
            texto2: text2,
            cantidad:quantity,
            cartId: carrito.id
        }
    })



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
        where: { id: parseInt (id) },
        include: {
            category: true
        }
    });
    return producto;
}



export async function obtenerProductosRelacionados(categoriaId, productoId) {
  return await prisma.product.findMany({
    where: {
      categoryId: categoriaId, // Filtramos por la categoría
      NOT: { id: parseInt(productoId) },  // Excluimos el producto actual
    },
    take: 4, // Limitamos la cantidad de productos a 4
  });
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

  export async function obtenerCategoriaPorSlug (slug) {
    return await prisma.category.findUnique({
      where: { slug },
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

// ---------------------   MENSAJES DE CONTACTO -----------------------
export async function getMessages() {
    const contactMessages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
       
    });
    return contactMessages;
}



