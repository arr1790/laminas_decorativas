"use client";
import { eliminarDelCarrito, restarAlCarrito, sumarAlCarrito } from '@/lib/actions';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

function ModalCarrito( {carrito }) {

  console.log(carrito, "- carrito desde modal carrito")

  const precioTotal = carrito.orderItems.reduce((total, item) => {
  return total + item.product[0].basePrice * item.cantidad;
}, 0);

const totalItems = carrito.orderItems.reduce(
    (total, item) => total + item.cantidad,
    0
  );
  const [abierto, setAbierto] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAbierto(false);
      }
    }

    if (abierto) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [abierto]);

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className=" relative rounded-md cursor-pointer p-2"
      >
        <ShoppingCart className="w-6 h-6" />
        <p className=' bg-red-500 rounded-full h-4 w-4 absolute top-0 right-1 text-xs'>{totalItems}</p>
      </button>

      {abierto && (
        <div className="fixed inset-0 z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden flex justify-end">
              <div
                ref={modalRef}
                className="pointer-events-auto w-screen max-w-md bg-white shadow-xl flex flex-col h-full"
              >
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Carrito de compras</h2>
                    <button
                      onClick={() => setAbierto(false)}
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Cerrar</span>
                      <svg className="size-6 cursor-pointer" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
<ul role="list" className="-my-6 divide-y divide-gray-200">
                  {/* Productos y contenido */}
                  <div className="mt-8">
                    {carrito.orderItems.map((item, index) => (
                      <li key={item.id + "kai"} className="flex py-6">
                      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={item.product[0].image} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="size-full object-cover" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{item.product[0].name}</a>
                            </h3>
                            <p className="ml-4">{item.product[0].basePrice}€ </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.product[0].dimensions}</p>
                          <p className="mt-1 text-sm text-gray-500">{item.product[0].withFrame ? "Con marco" : "Sin marco"}</p>
                          <p className="mt-1 text-sm text-gray-500">{item.texto1}</p>
                          <p className="mt-1 text-sm text-gray-500">{item.texto2}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <form key={item.id + "kei"}  action={restarAlCarrito}> <button type="submit" className="font-medium text-indigo-600 hover:text-indigo-500">Restar</button> <input type="hidden" name='orderItemId' value={item.id} /> </form>
                          <p className="text-gray-500">{item.cantidad}</p>
                          <form key={item.id + "keo"} action={sumarAlCarrito}> <button type="submit" className="font-medium text-indigo-600 hover:text-indigo-500">Sumar</button> <input type="hidden" name='orderItemId' value={item.id} /> </form>

                          <div className="flex">
                            <form key={item.id + "kep"} action={eliminarDelCarrito}>
                              <input type="hidden" name='orderItemId' value={item.id} />
                            <button type="submit" className="font-medium text-indigo-600 hover:text-indigo-500">Eliminar macarrones</button>
                         </form>
                         </div>
                        </div>
                      </div>
                    </li>
                    ))}
                  </div>
</ul>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{precioTotal}€</p>
                  </div>
                  <div className="mt-6">
                    <Link onClick={() => setAbierto(false)} href="/carrito" className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">Checkout</Link>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button onClick={() => setAbierto(false)} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping →
                      </button>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalCarrito;
