"use client";
import { eliminarDelCarrito, restarAlCarrito, sumarAlCarrito } from '@/lib/actions';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

function ModalCarrito({ carrito, session }) {
  const [abierto, setAbierto] = useState(false);
  const modalRef = useRef(null);

  const precioTotal = carrito?.orderItems?.reduce((total, item) => {
    return total + item.product[0].basePrice * item.cantidad;
  }, 0) || 0;

  const totalItems = carrito?.orderItems?.reduce((total, item) => total + item.cantidad, 0) || 0;

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
        className="relative rounded-md cursor-pointer p-2"
      >
        <ShoppingCart className="w-6 h-6" />
        <p className='bg-red-500 rounded-full h-4 w-4 absolute top-0 right-1 text-xs text-white flex items-center justify-center'>
          {totalItems}
        </p>
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
                {(!carrito || !session) ? (
                  <div className="flex-1 flex items-center justify-center text-center text-gray-700 text-lg p-6">
                    No hay sesión
                  </div>
                ) : (
                  <>
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

                      <ul role="list" className="-my-6 divide-y divide-gray-200 mt-8">
                        {carrito.orderItems.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src={item.product[0].image} alt={item.product[0].name} className="size-full object-cover" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">{item.product[0].name}</a>
                                  </h3>
                                  <p className="ml-4">{item.product[0].basePrice}€</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.product[0].dimensions}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.product[0].withFrame ? "Con marco" : "Sin marco"}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.texto1}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.texto2}</p>
                              </div>
                              <div className="flex flex-1 items-center justify-between text-sm mt-4">
                                <form action={restarAlCarrito}>
                                  <input type="hidden" name="orderItemId" value={item.id} />
                                  <button
                                    type="submit"
                                    className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                    aria-label="Restar uno"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </form>

                                <p className="text-gray-700 mx-2 w-6 text-center">{item.cantidad}</p>

                                <form action={sumarAlCarrito}>
                                  <input type="hidden" name="orderItemId" value={item.id} />
                                  <button
                                    type="submit"
                                    className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                                    aria-label="Sumar uno"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </form>

                                <form action={eliminarDelCarrito}>
                                  <input type="hidden" name="orderItemId" value={item.id} />
                                  <button
                                    type="submit"
                                    className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 ml-4"
                                    aria-label="Eliminar producto"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{precioTotal}€</p>
                      </div>
                      <div className="mt-6">
                        <Link onClick={() => setAbierto(false)} href="/carrito" className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
                          Finalizar
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-gray-500">
                        <p>
                          o{' '}
                          <button onClick={() => setAbierto(false)} className="font-medium text-indigo-600 hover:text-indigo-500">
                            Continuar comprando →
                          </button>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalCarrito;
