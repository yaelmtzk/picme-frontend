import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { LikeButton } from "../cmps/LikeButton.jsx"
import { StoryMoreOpt } from "../cmps/StoryMoreOpt.jsx"
import { MobileCommentsModal } from "../cmps/MobileCommentsModal.jsx"
import { Modal } from "../cmps/Modal.jsx"

import { updateStory, loadStory, removeStory } from '../store/actions/story.actions'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { toggleStoryLike } from '../services/story/story.service.local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user/user.service.local.js'


export function StoryDetailsMobile() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

  const loadedStory = useSelector(storeState => storeState.storyModule.story)
  const storyId = useParams().id
  const stories = state?.stories

  const [openOpts, setOpenOpts] = useState(false)
  const [openComments, setOpenComments] = useState(false)

  const loggedinUser = userService.getLoggedinUser()
  const storyUser = userService.getById(loadedStory.by.byId)

  useEffect(() => {
    loadStory(storyId)
  }, [storyId])

  function onCloseDetails() {
    const bg = state?.backgroundLocation

    if (bg) navigate(bg.pathname, { replace: true, state: bg.state })
    else navigate("/", { replace: true })
  }

  async function onLike() {
    const updated = toggleStoryLike(loadedStory, loggedinUser)
    await updateStory(updated)
  }

  async function onRemove(storyId) {
    try {
      await removeStory(storyId)
      showSuccessMsg('Story removed')
    } catch (err) {
      showErrorMsg('Cannot remove story')
    } finally {
      onCloseDetails()
    }
  }

  function onUserDetails(userId, username) {
    navigate(`/${username}`, {
      state: {
        userId
      }
    })
  }


  if (!loadedStory) {
    return <div className="mobile-details-section"><div>loading...</div></div>
  }

  return (
    <div className="mobile-details-section">

      <div className="pre-header">

        <svg
          onClick={onCloseDetails}
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24">
          <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>

        <div>Post</div>
      </div>


      <article className="preview">
        <header>

          <div className="preview-header">
            <div className='avatar'>
              <img className="avatar-img md pointer"
                onClick={() => { onUserDetails(storyUser._id, storyUser.username) }}
                src={storyUser?.imgUrl || getIconImg('avatar')}
                alt="avatar" />
            </div>

            <div>
              <a className='username small pointer'
                onClick={() => { onUserDetails(storyUser._id, storyUser.username) }}>
                {loadedStory.by.username}
              </a>
            </div>
          </div>

          <img
            onClick={(ev) => {
              ev.stopPropagation()
              setOpenOpts(true)
            }}
            className='btn'
            title='More options'
            src={getIconImg('more')}
            alt="more-icon" />
        </header>

        <img className="story-pic" src={loadedStory.imgUrl} alt="story-pic" />

        <div className='preview-action-btns'>

          <LikeButton
            isLiked={loadedStory.likedBy.some(u => u.byId === loggedinUser._id)}
            onLike={onLike}
          />

          <span>{loadedStory.likedBy.length > 0 ? loadedStory.likedBy.length : ''}</span>

          <div>
            <img
              onClick={(ev) => {
                ev.stopPropagation()
                setOpenComments(true)
              }}
              className='btn'
              title='Comment'
              src={getIconImg('comment')} alt="comment-icon" />
          </div>


          <span>{loadedStory.comments.length > 0 ? loadedStory.comments.length : ''}</span>

          <div><img className='btn' title='Share'
            src={getIconImg('send')} alt="send-icon" />
          </div>

          <div className="save-btn">
            <img className='btn' title='Save'
              src={getIconImg('save')} alt="save-icon" />
          </div>
        </div>

        <div className='story-txt-short'>
          <p>

            <span
              onClick={() => { onUserDetails(storyUser._id, storyUser.username) }}
              className="username small pointer">
              {loadedStory.by.username}
            </span>

            {loadedStory.txt}
          </p>

        </div>

        <span className='date'> {timeAgo(loadedStory.createdAt)}</span>

        {openOpts &&
          (<Modal
            onClose={() => setOpenOpts(false)}
            className="opts-modal"
          >
            <StoryMoreOpt
              storyId={loadedStory._id}
              onRemove={() => onRemove(loadedStory._id)}
              onClose={() => setOpenOpts(false)}
              isOwner={loggedinUser._id === storyUser._id} />
          </Modal>
          )}

        {openComments &&
          (<MobileCommentsModal
            story={loadedStory}
            stories={stories}
            onClose={() => setOpenComments(false)} />)
        }

      </article>
    </div>

  )
}
