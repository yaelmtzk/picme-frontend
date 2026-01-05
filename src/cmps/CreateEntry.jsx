import { useLocation, useNavigate } from "react-router-dom"
import { useMediaQuery } from "../customHooks/useMediaQuery.js"
import { CreateStory } from "./CreateStory.jsx"
import { CreateStoryMobile } from "./CreateStoryMobile.jsx"

export function CreateEntry({ onClose, onAdd }) {
    const isMobile = useMediaQuery("(max-width: 767px)")

    return isMobile ? (
        <CreateStoryMobile
            onClose={onClose}
            onAdd={onAdd}
        />
    ) : (
        <CreateStory
            onClose={onClose}
            onAdd={onAdd}
        />
    )
}