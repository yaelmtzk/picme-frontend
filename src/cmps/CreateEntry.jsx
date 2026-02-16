import { useMediaQuery } from '../customHooks/useMediaQuery'
import { CreateStory } from './CreateStory'
import { CreateStoryMobile } from './CreateStoryMobile'

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