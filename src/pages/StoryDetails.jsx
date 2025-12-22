import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { CommentList } from "../cmps/CommentList.jsx";

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStory, addStoryComment } from '../store/actions/story.actions'


export function StoryDetails() {

  const location = useLocation()
  const navigate = useNavigate()
  const navStory = location.state?.story
  const { storyId } = useParams()

  // const { storyId } = useParams()
  const loadedStory = useSelector(storeState => storeState.storyModule.story)
  const [story, setStory] = useState(navStory || null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    if (!navStory && loadedStory) {
      loadStory(storyId)
    }
  }, [storyId])

  useEffect(() => {
    if (!navStory && loadedStory) {
      setStory(loadedStory)
    }
  }, [loadedStory])


  useEffect(() => {
    function handleEsc(ev) {
      if (ev.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  function onCloseDetails() {
    const bg = location.state?.background

    if (bg) navigate(bg.pathname, { replace: true })
    else navigate("/", { replace: true })
  }

  // async function onAddStoryComment(storyId) {
  //   try {
  //     await addStoryComment(storyId, 'bla bla ' + parseInt(Math.random() * 10))
  //     showSuccessMsg(`Story msg added`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add story msg')
  //   }
  // }

  if (!story) return null

  return (
    <div className="details-overlay" onClick={onCloseDetails}>

      <button className="details-close" onClick={onCloseDetails}>✕</button>

      <div className="details-content" onClick={ev => ev.stopPropagation()}>
        {/* IMAGE */}
        <div className="details-img">
          <img alt="preview-img" src={story.imgUrl} />
        </div>

        <div className="side-details-section">

          <header>
            <div className='avatar'>
              <img className="avatar-img md" src={getIconImg('avatar')} alt="avatar" />
              <div className="username small">{story.by.username}</div>
            </div>

            <div><img className='btn' title='More options'
              src={getIconImg('more')} alt="more-icon" />
            </div>
          </header>

          {/* COMMENTS */}
          <div className='comment-section'>
            <div className="story-txt">

              <div className='avatar'>
                <img className="avatar-img md" src={getIconImg('avatar')} alt="avatar" />
              </div>

              <div>
                <p><strong>{story.by.username}</strong> {story.txt}</p>
                <span>{timeAgo(story.createdAt)}</span>
              </div>

            </div>

            <CommentList comments={story.comments} />

          </div>

          <div className='preview-action-btns'>
            <div>
              <img className='btn' title='Like'
                src={getIconImg('like')} alt="like-icon" />
            </div>

            <div>
              <img className='btn' title='Comment'
                src={getIconImg('comment')} alt="comment-icon" />
            </div>

            {/* <div>{comments.length > 0 ? comments.length : ''}</div> */}

            <div><img className='btn' title='Share'
              src={getIconImg('send')} alt="send-icon" />
            </div>

            <div>
              <img className='btn' title='Save'
                src={getIconImg('save')} alt="save-icon" />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}