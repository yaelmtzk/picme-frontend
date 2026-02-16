import { useState } from "react";
import { useSelector } from 'react-redux'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { toggleLikeStory } from '../store/actions/story.actions'
import { useLocation, useNavigate } from "react-router-dom"
import { LikeButton } from "./LikeButton.jsx"
import { StoryMoreOpt } from "./StoryMoreOpt.jsx";
import { Modal } from "../cmps/Modal.jsx"
import { UserHoverCard } from "./UserHoverCard.jsx";
import { showErrorMsg } from '../services/event-bus.service'

export function StoryPreview({ story, storyUser, stories, onUpdate, onRemove }) {
    if (!storyUser) return null

    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state

    const [openOpts, setOpenOpts] = useState(false)
    const { by, txt, img, createdAt, comments, _id, likedBy } = story

    const loggedinUser = useSelector(state => state.userModule.user)

    function onStoryDetails(story) {
        navigate(`/p/${story._id}`, {
            state: {
                modal: true,
                backgroundLocation: state?.background || location,
                story,
                openOpts: true
            }
        })
    }

    function onUserDetails(userId, username) {
        navigate(`/${username}`, {
            state: {
                userId
            }
        })
    }

    function onLike(story) {
        toggleLikeStory(story).catch(() => {
            showErrorMsg('Cannot like story')
        })
    }
    return <article className="preview">
        <header>
            <div className="preview-header">
                <div className='avatar'>
                    <UserHoverCard
                        user={storyUser}
                        onOpenProfile={onUserDetails}
                        onOpenStory={onStoryDetails}
                        storyList={stories}>
                        <img className="avatar-img md pointer"
                            onClick={() => { onUserDetails(storyUser._id, storyUser.username) }}
                            src={storyUser?.imgUrl || getIconImg('avatar')}
                            alt="avatar" />
                    </UserHoverCard>
                </div>

                <div>
                    <UserHoverCard
                        user={storyUser}
                        onOpenProfile={onUserDetails}
                        onOpenStory={onStoryDetails}
                        storyList={stories}>
                        <a className='username small pointer'
                            onClick={() => { onUserDetails(storyUser._id, storyUser.username) }}>
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

        <img className="story-pic" src={img.url} alt="story-pic" />

        <div className='preview-action-btns'>

            <LikeButton
                isLiked={story.likedBy.some(u => u.byId === loggedinUser._id)}
                onLike={() => onLike(story)}
            />

            <span>{likedBy.length > 0 ? likedBy.length : ''}</span>

            <div>
                <img onClick={() => onStoryDetails(story)} className='btn' title='Comment'
                    src={getIconImg('comment')} alt="comment-icon" />
            </div>


            <span>{comments.length > 0 ? comments.length : ''}</span>

            {/* <div><img className='btn disabled' title='Share'
                src={getIconImg('send')} alt="send-icon" />
            </div>

            <div className="save-btn disabled">
                <img className='btn' title='Save'
                    src={getIconImg('save')} alt="save-icon" />
            </div> */}
        </div>

        <div className="story-txt-short">
            <UserHoverCard
                user={storyUser}
                onOpenProfile={onUserDetails}
                storyList={stories}
                onOpenStory={onStoryDetails}
            >
                <span
                    onClick={() => onUserDetails(storyUser._id, storyUser.username)}
                    className="username small pointer"
                >
                    {by.username}
                </span>{' '}
                <span>{txt}</span>
            </UserHoverCard>
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