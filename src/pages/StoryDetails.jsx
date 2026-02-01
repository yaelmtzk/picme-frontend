import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { CommentList } from "../cmps/CommentList.jsx"
import { EmojiTextArea } from "../cmps/EmojiTextArea.jsx"
import { LikeButton } from "../cmps/LikeButton.jsx"
import { StoryMoreOpt } from "../cmps/StoryMoreOpt.jsx"
import { Modal } from "../cmps/Modal.jsx"
import { UserHoverCard } from "../cmps/UserHoverCard.jsx";

import { updateStory, loadStory, clearStory, removeStory, addStoryComment } from '../store/actions/story.actions'
import { SET_STORY } from "../store/reducers/story.reducer"
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { getOid } from "../services/util.service.js"
import { toggleStoryLike } from '../services/story/story.service.local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import spinner from '../assets/img/icons/spinner.png'
// import { userService } from '../services/user/user.service.local.js'
import { userService } from '../services/user/user.service.remote.js'

export function StoryDetails() {
  const location = useLocation()
  const state = location.state
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loadedStory = useSelector(storeState => storeState.storyModule.story)
  const stories = useSelector(storeState => storeState.storyModule.stories)
  const users = useSelector(state => state.userModule.users)

  const storyId = useParams().id
  const [storyUser, setStoryUser] = useState(null)
  const [txt, setTxt] = useState('')
  const [openOpts, setOpenOpts] = useState(false)


  useEffect(() => {
    loadStory(storyId)
  }, [storyId])


  useEffect(() => {
    if (!loadedStory?.by?.byId) return

    const userId = loadedStory.by.byId
    const localUser = users.find(u => getOid(u._id) === getOid(userId))

    if (localUser) {
      setStoryUser(localUser)
      return
    }

    userService.getById(userId).then(setStoryUser)

  }, [loadedStory?.by?.byId, users])




  if (!loadedStory) {
    return <div className="details-overlay">
      <div className='loader-section'>
        <img className="spinner" src={spinner} alt="Loading…" />
      </div>
    </div>
  }

  const loggedinUser = userService.getLoggedinUser()

  function onCloseDetails() {
    const bg = state?.backgroundLocation

    if (bg) navigate(bg.pathname, { replace: true, state: bg.state })
    else navigate("/", { replace: true })

    clearStory()
  }

  async function onLike() {
    const updated = toggleStoryLike(loadedStory, loggedinUser)
    await updateStory(updated)
  }

  async function onRemoveStory(storyId) {
    try {
      await removeStory(storyId)
      showSuccessMsg('Story removed')
    } catch (err) {
      showErrorMsg('Cannot remove story')
    } finally {
      onCloseDetails()
    }
  }

  async function onAddComment(storyId, txt) {
    try {
      await addStoryComment(storyId, txt)
      setTxt('')
    } catch (err) {
      showErrorMsg('Cannot add comment')
    }
  }

  function onUserDetails(userId, username) {
    navigate(`/${username}`, {
      state: {
        userId
      }
    })
  }

  function onStoryDetails(story) {

    const isAlreadyModal = state?.modal === true

    navigate(`/p/${story._id}`, {
      replace: true,
      state: {
        modal: true,
        backgroundLocation: isAlreadyModal
          ? state.backgroundLocation
          : location,
        story,
        openOpts: true
      }
    })
  }

  return (
    <Modal key={storyId} onClose={onCloseDetails} className="details-modal">

      <button className="details-close" onClick={onCloseDetails}>✕</button>

      <div className="details-content">
        <div className="details-img">
          <img alt="preview-img" src={loadedStory.imgUrl} />
        </div>

        <div className="side-details-section">

          <header>
            <div className='avatar'>
              <UserHoverCard
                user={storyUser}
                onOpenProfile={onUserDetails}
                onOpenStory={onStoryDetails}
                storyList={stories}>
                <img
                  className="avatar-img md pointer"
                  src={storyUser?.imgUrl || getIconImg('avatar')} alt="avatar"
                  onClick={() => { onUserDetails(storyUser._id, storyUser.username) }} />
              </UserHoverCard>

              <UserHoverCard
                user={storyUser}
                onOpenProfile={onUserDetails}
                onOpenStory={onStoryDetails}
                storyList={stories}>
                <div
                  className="username small pointer"
                  onClick={() => onUserDetails(storyUser._id, storyUser.username)}>
                  {loadedStory.by.username}
                </div>
              </UserHoverCard>

            </div>

            <img
              onClick={(ev) => {
                ev.stopPropagation()
                setOpenOpts(true)
              }}
              className='btn' title='More options'
              src={getIconImg('more')} alt="more-icon" />
          </header>

          <section className='comment-section'>

            <div className="story-txt">

              <div className='avatar'>
                <UserHoverCard
                  user={storyUser}
                  onOpenProfile={onUserDetails}
                  onOpenStory={onStoryDetails}
                  storyList={stories}>
                  <img
                    className="avatar-img md pointer"
                    src={storyUser?.imgUrl || getIconImg('avatar')} alt="avatar"
                    onClick={() => { onUserDetails(storyUser._id, storyUser.username) }} />
                </UserHoverCard>

              </div>

              <div className="story-txt-main">

                <div>
                  <UserHoverCard
                    user={storyUser}
                    onOpenProfile={onUserDetails}
                    onOpenStory={onStoryDetails}
                    storyList={stories}>

                    <div className="username small pointer"
                      onClick={() => { onUserDetails(storyUser._id, storyUser.username) }}>
                      {loadedStory.by.username}</div>

                  </UserHoverCard> {loadedStory.txt}
                </div>

                <span className="story-date">{timeAgo(loadedStory.createdAt)}</span>
              </div>
            </div>

            <CommentList
              comments={loadedStory.comments}
              stories={stories}
              users={users}
              onOpenStory={onStoryDetails} />
          </section>

          <section className='preview-action-btns'>

            <LikeButton
              isLiked={loadedStory.likedBy.some(u => u.byId === loggedinUser._id)}
              onLike={onLike}
            />

            <div><img className='btn' title='Comment'
              src={getIconImg('comment')} alt="comment-icon" />
            </div>
            <div><img className='btn' title='Share'
              src={getIconImg('send')} alt="send-icon" /></div>

            <div className="save-btn"><img className='btn' title='Save'
              src={getIconImg('save')} alt="save-icon" /></div>
          </section>

          <div className="details-stats">

            {loadedStory.likedBy.length === 1 && (<p><strong>1 like</strong></p>)}
            {!loadedStory.likedBy.length && (<p>Be the first one to <strong>like this</strong></p>)}
            {loadedStory.likedBy.length > 1 && (<p><strong>{loadedStory.likedBy.length} likes</strong></p>)}

            <span className="date">{timeAgo(loadedStory.createdAt)}</span>
          </div>

          <section className="new-comment-section">
            <EmojiTextArea
              placeholderTxt={'Add a comment...'}
              txt={txt} setTxt={setTxt} />

            <a onClick={() => onAddComment(storyId, txt)} className={`post-btn ${txt.length == 0 && 'disabled'}`}>Post</a>
          </section>

        </div>
      </div>

      {openOpts && (
        <div className="opts-overlay" onClick={() => setOpenOpts(false)}>
          <StoryMoreOpt
            storyId={storyId}
            onRemove={() => onRemoveStory(storyId)}
            onClose={() => setOpenOpts(false)}
            isOwner={loggedinUser._id === storyUser._id} />
        </div>
      )}

    </Modal>

  )
}
