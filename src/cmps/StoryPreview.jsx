import { useState } from "react";
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { Link, useLocation } from "react-router-dom"
import { userService } from '../services/user/user.service.local.js'
import { useDispatch } from "react-redux"
import { toggleStoryLike } from '../services/story/story.service.local.js'
import { LikeButton } from "./LikeButton.jsx"
import { SET_STORY } from '../store/reducers/story.reducer'
import { StoryMoreOpt } from "./StoryMoreOpt.jsx";
import { Modal } from "../cmps/Modal.jsx"


export function StoryPreview({ story, onUpdate, onRemove }) {

    const [openOpts, setOpenOpts] = useState(false)

    const { by, txt, imgUrl, createdAt, comments, _id, likedBy } = story

    const loggedinUser = userService.getLoggedinUser()
    const storyUser = userService.getById(by.byId)

    const dispatch = useDispatch()

    const location = useLocation()

    function onDetails() {
        dispatch({ type: SET_STORY, story })
    }

    return <article className="preview">
        {/* HEADER */}
        <header>
            <div>
                <div className='avatar'>
                    <img className="avatar-img md" src={storyUser?.imgUrl || getIconImg('avatar')} alt="avatar" />
                </div>

                <div>
                    <a className='username small'>{by.username}</a> <span className='story-date'> • {timeAgo(createdAt)}</span>
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

        {/* IMAGE */}
        <img className="story-pic" src={imgUrl} alt="story-pic" />

        {/* BUTTONS */}
        <div className='preview-action-btns'>

            <LikeButton
                isLiked={story.likedBy.some(u => u.byId === loggedinUser._id)}
                onLike={() => onUpdate(toggleStoryLike(story, loggedinUser))}
            />

            <span>{likedBy.length > 0 ? likedBy.length : ''}</span>

            {/* COMMENT */}
            <div>
                <Link
                    onClick={onDetails}
                    to={`/p/${_id}`}
                    state={{
                        modal: true,
                        backgroundLocation: location.state?.background || location,
                        story,
                        openOpts: true
                    }}
                >
                    <img className='btn' title='Comment'
                        src={getIconImg('comment')} alt="comment-icon" />
                </Link>
            </div>


            <span>{comments.length > 0 ? comments.length : ''}</span>

            <div><img className='btn' title='Share'
                src={getIconImg('send')} alt="send-icon" />
            </div>

            <div>
                <img className='btn' title='Save'
                    src={getIconImg('save')} alt="save-icon" />
            </div>
        </div>

        <div className='story-txt-short'>
            <div className='username small'>
                {by.username}</div>
            <span>{txt}</span>
        </div>

        {openOpts &&
            (<Modal
                onClose={() => setOpenOpts(false)}
                className="opts-modal"
            >
                <StoryMoreOpt
                    storyId={_id}
                    onRemove={() => onRemove(_id)}
                    onClose={() => setOpenOpts(false)}
                    isOwner={loggedinUser._id === storyUser._id} />
            </Modal>
        )}

    </article>
}