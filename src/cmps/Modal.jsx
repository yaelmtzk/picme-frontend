import { useEffect } from "react"
import { createPortal } from "react-dom"

export function Modal({ children, onClose, className = "" }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = prev)
  }, [])

  useEffect(() => {
    const onKeyDown = (ev) => ev.key === "Escape" && onClose()
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow

    html.style.overflow = "hidden"
    body.style.overflow = "hidden"

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
    }
  }, [])


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
