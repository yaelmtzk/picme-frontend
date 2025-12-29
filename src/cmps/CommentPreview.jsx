import { useNavigate } from 'react-router-dom'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { userService } from '../services/user/user.service.local.js'
import { UserHoverCard } from "../cmps/UserHoverCard.jsx";

export function CommentPreview({ comment, stories, onOpenStory }) {
    const navigate = useNavigate()
    const { username, txt, byId } = comment
    const user = userService.getById(byId)

    function onUserDetails(userId, username) {
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
                        onClick={() => { onUserDetails(byId, username) }}
                        className="avatar-img md pointer" src={user?.imgUrl || getIconImg('avatar')} alt="avatar" />
                </UserHoverCard>

            </div>

            <div className='comment-content'>
                <div
                    className='pointer'
                    onClick={() => { onUserDetails(byId, username) }}>

                    <UserHoverCard
                        user={user}
                        onOpenProfile={onUserDetails}
                        onOpenStory={onOpenStory}
                        storyList={stories}>
                        <div className='username small'>{username}</div>
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