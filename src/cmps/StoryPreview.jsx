import { useState } from "react";
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { userService } from '../services/user/user.service.local.js'
import { useDispatch } from "react-redux"
import { toggleStoryLike } from '../services/story/story.service.local.js'
import { LikeButton } from "./LikeButton.jsx"
import { SET_STORY } from '../store/reducers/story.reducer'
import { StoryMoreOpt } from "./StoryMoreOpt.jsx";
import { Modal } from "../cmps/Modal.jsx"
import { UserHoverCard } from "./UserHoverCard.jsx"; 

export function StoryPreview({ story, stories, onUpdate, onRemove }) {

    const [openOpts, setOpenOpts] = useState(false)

    const { by, txt, imgUrl, createdAt, comments, _id, likedBy } = story

    const loggedinUser = userService.getLoggedinUser()
    const storyUser = userService.getById(by.byId)
    const storyUserId = storyUser._id
    const storyUsername = storyUser.username

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    function onDetails() {
        dispatch({ type: SET_STORY, story })
    }

    function onUserDetails(userId, username) {
        navigate(`/${username}`, {
            state: {
                userId
            }
        })
    }

    return <article className="preview">
        {/* HEADER */}
        <header>
            <div className="preview-header">
                <div className='avatar'>
                    <UserHoverCard user={storyUser} onOpenProfile={onUserDetails} storyList={stories}>
                        <img className="avatar-img md pointer"
                            onClick={() => { onUserDetails(storyUserId, storyUsername) }}
                            src={storyUser?.imgUrl || getIconImg('avatar')}
                            alt="avatar" />
                    </UserHoverCard>

                </div>

                <div>

                    <UserHoverCard user={storyUser} onOpenProfile={onUserDetails} storyList={stories}>
                        <a className='username small pointer'
                            onClick={() => { onUserDetails(storyUserId, storyUsername) }}>
                            {by.username}
                        </a>
                    </UserHoverCard>

                    <span className='date'> • {timeAgo(createdAt)}</span>
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
                        stories,
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

            <div className="save-btn">
                <img className='btn' title='Save'
                    src={getIconImg('save')} alt="save-icon" />
            </div>
        </div>

        <div className='story-txt-short'>
            <p>
                <UserHoverCard user={storyUser} onOpenProfile={onUserDetails} storyList={stories}>
                <span
                    onClick={() => { onUserDetails(storyUserId, storyUsername) }}
                    className="username small pointer">
                    {by.username}</span>                    
                </UserHoverCard> <span>{txt}</span>
            </p>

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