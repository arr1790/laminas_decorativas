"use client"
import { useRef, useEffect } from "react"
import { X } from "lucide-react"

function Modal({ openElement, children }) {
  const refModal = useRef()

  const openModal = () => {
    document.body.style.overflow = 'hidden'
    refModal.current?.showModal()
  }
  
  const closeModal = () => {
    document.body.style.overflow = 'auto'
    refModal.current?.close()
  }

  useEffect(() => {
    const dialog = refModal.current
    const handleCancel = (e) => e.preventDefault()
    dialog?.addEventListener("cancel", handleCancel)
    
    return () => {
      dialog?.removeEventListener("cancel", handleCancel)
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <>
      <div 
        onClick={openModal} 
        className="inline-block cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
      >
        {openElement}
      </div>

      <dialog
        ref={refModal}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/70 backdrop:backdrop-blur-sm rounded-xl p-0 border-none max-w-lg w-[90vw] sm:w-full mx-4 open:animate-fade-in shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          
          <div className="flex justify-end sticky top-0 bg-white/80 backdrop-blur-sm py-2 -mt-2 z-10">
            <button
              onClick={closeModal}
              className="text-gray-500 hover:bg-gray-100 transition-all p-1 rounded-full"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-2 px-2 pb-2">
            {children}
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Modal