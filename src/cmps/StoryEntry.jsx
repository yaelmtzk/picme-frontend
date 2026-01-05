import { useLocation, useNavigate } from "react-router-dom"
import { useMediaQuery } from "../customHooks/useMediaQuery.js"
import { StoryDetails } from "../pages/StoryDetails.jsx"
import { MobileCommentsModal } from "./MobileCommentsModal.jsx"

export function StoryEntry() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const location = useLocation()
  const navigate = useNavigate()

  const { story, stories } = location.state || {}


  function closeModal() {
    navigate(-1)
  }

  if (!story) return null

  return isMobile ? (
    <MobileCommentsModal
      story={story}
      stories={stories}
      onClose={closeModal}
    />
  ) : (
    <StoryDetails />
  )
}