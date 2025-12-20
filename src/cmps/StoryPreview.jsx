import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'

export function StoryPreview({ story }) {

    const { by, txt, imgUrl, createdAt, comments } = story

    return <article className="preview">
        <header>
            <div className='avatar'>
                <img className="avatar-img md" src={getIconImg('avatar')} alt="avatar" />
            </div>

            <div>
                <a className='username small'>{by.username}</a> <span className='story-date'> • {timeAgo(createdAt)}</span>
            </div>
        </header>

        <img className="story-pic" src={getIconImg(imgUrl)} alt="story-pic" />

        <div className='preview-action-btns'>
            <div>
                <img className='btn' title='Like'
                    src={getIconImg('like')} alt="like-icon" />
            </div>

            <div>
                <img className='btn' title='Comment'
                    src={getIconImg('comment')} alt="comment-icon" />
            </div>

            <div>{comments.length}</div>

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

    </article>
}