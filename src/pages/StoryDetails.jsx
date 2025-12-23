import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { CommentList } from "../cmps/CommentList.jsx"
import { EmojiTextArea } from "../cmps/EmojiTextArea.jsx"

import { updateStory, loadStory } from '../store/actions/story.actions'
import { toggleStoryLike } from '../services/story/story.service.local.js'
import { LikeButton } from "../cmps/LikeButton.jsx"

import { userService } from '../services/user/user.service.local.js'


export function StoryDetails() {
  const loadedStory = useSelector(storeState => storeState.storyModule.story)
  const storyId = useParams().id
  const [txt, setTxt] = useState('')

  const loggedinUser = userService.getLoggedinUser()
  const storyUser = userService.getById(loadedStory.by.byId)

  const location = useLocation()
  const navigate = useNavigate()

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    loadStory(storyId)
  }, [storyId])

  // esc to close
  useEffect(() => {
    function handleEsc(ev) {
      if (ev.key === "Escape") onCloseDetails()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])


  function onCloseDetails() {
    const bg = location.state?.background
    if (bg) navigate(bg.pathname, { replace: true })
    else navigate("/", { replace: true })
  }

  async function onLike() {
    const updated = toggleStoryLike(loadedStory, loggedinUser)
    await updateStory(updated)   // call async updater
  }

  if (!loadedStory) {
    return <div className="details-overlay"><div>loading...</div></div>
  }

  return (
    <div className="details-overlay" onClick={onCloseDetails}>

      <button className="details-close" onClick={onCloseDetails}>✕</button>

      <div className="details-content" onClick={ev => ev.stopPropagation()}>

        {/* IMAGE */}
        <div className="details-img">
          <img alt="preview-img" src={loadedStory.imgUrl} />
        </div>

        <div className="side-details-section">

          <header>
            <div className='avatar'>
              <img className="avatar-img md" src={storyUser?.imgUrl || getIconImg('avatar')} alt="avatar" />
              <div className="username small">{loadedStory.by.username}</div>
            </div>

            <img className='btn' title='More options'
              src={getIconImg('more')} alt="more-icon" />
          </header>

          {/* COMMENTS */}
          <section className='comment-section'>

            <div className="story-txt">
              <div className='avatar'>
                <img className="avatar-img md" src={storyUser?.imgUrl || getIconImg('avatar')} alt="avatar" />
              </div>

              <div>
                <p><strong>{loadedStory.by.username}</strong> {loadedStory.txt}</p>
                <span>{timeAgo(loadedStory.createdAt)}</span>
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

            <div><img className='btn' title='Save'
              src={getIconImg('save')} alt="save-icon" /></div>
          </section>

          <div className="details-stats">

            {loadedStory.likedBy.length === 1 && (<p><strong>1 like</strong></p>)}
            {!loadedStory.likedBy.length && (<p>Be the first one to <strong>like this</strong></p>)}
            {loadedStory.likedBy.length > 1 && (<p><strong>{loadedStory.likedBy.length} likes</strong></p>)}

            <span>{timeAgo(loadedStory.createdAt)}</span>
          </div>


          <section className="new-comment-section">
            <EmojiTextArea placeholderTxt={'Add a comment...'} txt={txt} setTxt={setTxt} />

            {/* <textarea
              value={txt}
              placeholder="Add a comment..."
              onChange={(ev) => setTxt(ev.target.value)}>
            </textarea> */}

            <a className="disabled" >Post</a>
          </section>

        </div>

      </div>

    </div>
  )
}
