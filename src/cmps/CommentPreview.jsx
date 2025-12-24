import { Link } from 'react-router-dom'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { userService } from '../services/user/user.service.local.js'

export function CommentPreview({ comment }) {
    const { username, txt, byId } = comment
    const user = userService.getById(byId)    

    return <article className="comment-preview">

        <div className='comment-main'>

            <div className='avatar'>
                <img className="avatar-img md" src={user?.imgUrl || getIconImg('avatar')} alt="avatar" />
            </div>

            <div>
                <p><strong>{username}</strong> {txt}</p>
                <div className='comment-preview-btns'>
                    {/* <span>{timeAgo(story.createdAt)}</span> */}
                    <span>{timeAgo(Date.now())}</span>
                    <span>like</span>
                    <span>Reply</span>
                </div>
            </div>

        </div>

        <img title='Like' className='comment-like-btn' src={getIconImg('like')} alt="like-btn" />

    </article>
}