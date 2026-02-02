import { useNavigate } from 'react-router-dom'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
// import { userService } from '../services/user/user.service.local.js'
import { UserHoverCard } from "../cmps/UserHoverCard.jsx";
import { loadWatchedUser } from "../store/actions/user.actions.js"
import defaultImg from "../assets/img/icons/avatar.svg"

export function CommentPreview({ comment, user, stories, onOpenStory }) {
    const navigate = useNavigate()
    const { username, txt } = comment

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
                    <span>like</span>
                    <span>Reply</span>
                </div>
            </div>

        </div>

        <img title='Like' className='comment-like-btn' src={getIconImg('like')} alt="like-btn" />

    </article>
}