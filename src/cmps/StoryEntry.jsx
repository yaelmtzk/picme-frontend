import { useLocation, useNavigate } from "react-router-dom"
import { useMediaQuery } from "../customHooks/useMediaQuery.js"
import { StoryDetails } from "../pages/StoryDetails.jsx"
import { StoryDetailsMobile } from "../pages/StoryDetailslMobile.jsx"
import { MobileCommentsModal } from "./MobileCommentsModal.jsx"
import { MobileCreatePortal } from "./MobileCreatePortal.jsx"
import { removeStoryComment } from "../store/actions/story.actions.js"

export function StoryEntry() {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const location = useLocation()
  const navigate = useNavigate()

  const { story, backgroundLocation } = location.state || {}

  function closeModal() {
    navigate(-1)
  }

  async function onRemoveComment(storyId, commentId) {
    try {
      await removeStoryComment(storyId, commentId)
    } catch (err) {
      showErrorMsg('Cannot remove comment')
    }
  }

  if (!story) return null

  return isMobile ? (
    backgroundLocation.pathname !== '/' ? (
      <MobileCreatePortal>
        <StoryDetailsMobile />
      </MobileCreatePortal>

    ) : (
      <MobileCommentsModal
        onClose={closeModal}
        onRemoveComment={onRemoveComment}
      />
    )
  ) : (
    <StoryDetails />
  )
}