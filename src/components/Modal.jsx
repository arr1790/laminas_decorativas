"use client";
import { useRef, useEffect } from "react";

function Modal({ openElement, children }) {
  const refModal = useRef();

  const openModal = () => refModal.current?.showModal();
  const closeModal = () => refModal.current?.close();

  // Cerrar con ESC o clic fuera
  useEffect(() => {
    const dialog = refModal.current;
    const handleCancel = (e) => e.preventDefault(); // Evitar cierre automático

    dialog?.addEventListener("cancel", handleCancel);
    return () => dialog?.removeEventListener("cancel", handleCancel);
  }, []);

  return (
    <>
      <div onClick={openModal} className="inline-block">
        {openElement}
      </div>

      <dialog
        ref={refModal}
        className="backdrop:bg-black/50 rounded-lg p-6 max-w-lg w-full shadow-xl"
      >
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-lg">❌</button>
        </div>
        <div className="mt-4">{children}</div>
      </dialog>
    </>
  );
}

export default Modal;
