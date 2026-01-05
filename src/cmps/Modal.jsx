import { useEffect } from "react"
import { createPortal } from "react-dom"

export function Modal({ children, onClose, className = "" }) {

  useEffect(() => {
    const onKeyDown = (ev) => ev.key === "Escape" && onClose()
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  const elModalRoot = document.getElementById("modal-root") || document.body

  return createPortal(
    <div className={`modal-overlay ${className}`} onClick={onClose}>
      <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
        {children}
      </div>
    </div>,
    elModalRoot
  )
}
