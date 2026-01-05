import { createPortal } from "react-dom"

export function MobileCreatePortal({ children }) {
    const el = document.getElementById("mobile-root")

    if (!el) {
        console.error("❌ mobile-root not found")
        return null
    }

    return createPortal(children, el)
}