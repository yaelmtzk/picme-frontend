import { useLocation, useNavigate } from "react-router-dom"
import { useMediaQuery } from "../customHooks/useMediaQuery.js"
import { StoryDetails } from "../pages/StoryDetails.jsx"
import { StoryDetailsMobile } from "../pages/StoryDetailslMobile.jsx"
import { MobileCommentsModal } from "./MobileCommentsModal.jsx"
import { MobileCreatePortal } from "./MobileCreatePortal.jsx"

export function StoryEntry() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const location = useLocation()
  const navigate = useNavigate()

  const { story, stories, backgroundLocation } = location.state || {}

  function closeModal() {
    navigate(-1)
  }

  if (!story) return null

  return isMobile ? (
    backgroundLocation.pathname !== '/' ? (
      <MobileCreatePortal>
        <StoryDetailsMobile />
      </MobileCreatePortal>

    ) : (
      <MobileCommentsModal
        story={story}
        stories={stories}
        onClose={closeModal}
      />
    )
  ) : (
    <StoryDetails />
  )

}