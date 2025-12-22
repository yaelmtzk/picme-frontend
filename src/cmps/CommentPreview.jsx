import { Link } from 'react-router-dom'
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'

export function CommentPreview({ comment }) {
    const { username, txt } = comment

    return <article className="comment-preview">

        <div className='comment-main'>

            <div className='avatar'>
                <img className="avatar-img md" src={getIconImg('avatar')} alt="avatar" />
            </div>

            <div>
                <p><strong>{username}</strong> {comment.txt}</p>
                <div className='comment-preview-btns'>
                    {/* <span>{timeAgo(story.createdAt)}</span> */}
                    <span>{timeAgo(Date.now())}</span>
                    <span>like</span>
                    <span>Reply</span>
                </div>
            </div>

        </div>

        <img className='comment-like-btn' src={getIconImg('like')} alt="like-btn" />

    </article>
}