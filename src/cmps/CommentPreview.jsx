import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from "react"
import { getIconImg } from '../services/image.service'
import { timeAgo } from '../services/util.service'
import { UserHoverCard } from '../cmps/UserHoverCard'
import { loadWatchedUser } from '../store/actions/user.actions'
import defaultImg from '../assets/img/icons/avatar.svg'
import { CommentOpt } from './CommentOpt'

export function CommentPreview({ comment, user, stories, storyId, onOpenStory, onRemoveComment }) {
    const navigate = useNavigate()

    const { username, txt } = comment
    const loggedinUser = useSelector(state => state.userModule.user)

    const isOwner = comment.byId === loggedinUser._id

    const [openOpts, setOpenOpts] = useState(false)

    function onUserDetails(userId, username) {
        loadWatchedUser(userId)

        navigate(`/${username}`, {
            state: {
                userId
            }
        })
    }

    return <article className="comment-preview">

        <div className='comment-main'>

            <div className='avatar'>
                <UserHoverCard
                    user={user}
                    onOpenProfile={onUserDetails}
                    onOpenStory={onOpenStory}
                    storyList={stories}>
                    <img
                        onClick={() => { onUserDetails(user._id, user.username) }}
                        className="avatar-img md pointer" src={user?.imgUrl ?? defaultImg} alt="avatar" />
                </UserHoverCard>

            </div>

            <div className='comment-content'>
                <div
                    className='pointer'
                >
                    <UserHoverCard
                        user={user}
                        onOpenProfile={onUserDetails}
                        onOpenStory={onOpenStory}
                        storyList={stories}>
                        <div
                            className='username small'
                            onClick={() => { onUserDetails(user._id, user.username) }}
                        >{username}
                        </div>
                    </UserHoverCard> {txt}
                </div>

                <div className='comment-preview-btns date'>
                    <span>{timeAgo(comment.createdAt)}</span>
                    {/* <span>like</span>
                    <span>Reply</span> */}
                    {isOwner && !comment.isProtected && (
                        // <span>
                        //     <img
                        //         onClick={(ev) => {
                        //             ev.stopPropagation()
                        //             setOpenOpts(true)
                        //         }}
                        //         className='btn' title='More options'
                        //         src={getIconImg('more')} alt="more-icon" />
                        // </span>
                        <span
                            onClick={(ev) => {
                                ev.stopPropagation()
                                setOpenOpts(true)
                            }}
                            className='btn' title='More options'
                            src={getIconImg('more')} alt="more-icon">
                                ⋯
                        </span>
                    )}

                </div>
            </div>

        </div>

        {/* <img title='Like' className='comment-like-btn disabled' src={getIconImg('like')} alt="like-btn" /> */}

        {openOpts && (
            <div className="opts-overlay" onClick={() => setOpenOpts(false)}>
                <CommentOpt
                    storyId={storyId}
                    commentId={comment._id}
                    onRemove={() => onRemoveComment(storyId, comment._id)}
                    onClose={() => setOpenOpts(false)} />
            </div>
        )}
    </article>
}