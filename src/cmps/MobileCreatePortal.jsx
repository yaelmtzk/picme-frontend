import { createPortal } from "react-dom"

export function MobileCreatePortal({ children }) {
    const el = document.getElementById("mobile-root")

    return createPortal(children, el)
}