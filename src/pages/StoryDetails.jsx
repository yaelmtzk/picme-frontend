import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CommentList } from "../cmps/CommentList.jsx"
import { EmojiTextArea } from "../cmps/EmojiTextArea.jsx"
import { LikeButton } from "../cmps/LikeButton.jsx"
import { StoryMoreOpt } from "../cmps/StoryMoreOpt.jsx"
import { Modal } from "../cmps/Modal.jsx"

import { updateStory, loadStory, removeStory, addStoryComment } from '../store/actions/story.actions'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { toggleStoryLike } from '../services/story/story.service.local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { userService } from '../services/user/user.service.local.js'


export function StoryDetails() {

  const loadedStory = useSelector(storeState => storeState.storyModule.story)
  const storyId = useParams().id

  const [txt, setTxt] = useState('')
  const [openOpts, setOpenOpts] = useState(false)

  const loggedinUser = userService.getLoggedinUser()
  const storyUser = userService.getById(loadedStory.by.byId)

  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.state.backgroundLocation);

  useEffect(() => {
    loadStory(storyId)
  }, [storyId])

  function onCloseDetails() {
    const bg = location.state?.backgroundLocation

    if (bg) navigate(bg.pathname, { replace: true, state: bg.state })
    else navigate("/", { replace: true })
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
      const comment = await addStoryComment(storyId, txt)
      // loadStory(storyId)
      setTxt('')
      showSuccessMsg(`Comment added (${comment})`)
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

  if (!loadedStory) {
    return <div className="details-overlay"><div>loading...</div></div>
  }

  return (
    <Modal onClose={onCloseDetails} className="details-modal">

      <button className="details-close" onClick={onCloseDetails}>✕</button>

      <div className="details-content">

        {/* IMAGE */}
        <div className="details-img">
          <img alt="preview-img" src={loadedStory.imgUrl} />
        </div>

        <div className="side-details-section">

          <header>
            <div className='avatar'>
              <img
                className="avatar-img md pointer"
                src={storyUser?.imgUrl || getIconImg('avatar')} alt="avatar"
                onClick={() => { onUserDetails(storyUser._id, storyUser.username) }} />

              <div
                className="username small pointer"
                onClick={() => { onUserDetails(storyUser._id, storyUser.username) }}>
                {loadedStory.by.username}
              </div>
            </div>

            <img
              onClick={(ev) => {
                ev.stopPropagation()
                setOpenOpts(true)
              }}
              className='btn' title='More options'
              src={getIconImg('more')} alt="more-icon" />
          </header>

          {/* COMMENTS */}
          <section className='comment-section'>

            <div className="story-txt">

              <div className='avatar'>
                <img
                  className="avatar-img md pointer"
                  src={storyUser?.imgUrl || getIconImg('avatar')} alt="avatar"
                  onClick={() => { onUserDetails(storyUser._id, storyUser.username) }} />
              </div>

              <div>

                <p>
                  <span className="username small pointer"
                  onClick={() => { onUserDetails(storyUser._id, storyUser.username) }}>
                    {loadedStory.by.username}</span> {loadedStory.txt}
                </p>

                <span className="story-date">{timeAgo(loadedStory.createdAt)}</span>

              </div>

            </div>

            <CommentList comments={loadedStory.comments} />
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

            <span>{timeAgo(loadedStory.createdAt)}</span>
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
        <Modal
          onClose={() => setOpenOpts(false)}
          className="opts-modal"
        >
          <StoryMoreOpt
            storyId={storyId}
            onRemove={() => onRemoveStory(storyId)}
            onClose={() => setOpenOpts(false)}
            isOwner={loggedinUser._id === storyUser._id} />
        </Modal>
      )}

    </Modal>

  )
}
