import { useState } from "react";
import { getIconImg } from '../services/image.service.js'
import { timeAgo } from '../services/util.service.js'
import { Link, useLocation  } from "react-router-dom"


export function StoryPreview({ story }) {

    const { by, txt, imgUrl, createdAt, comments, _id } = story

    const location = useLocation()

    function getImgSrc() {
        return imgUrl.startsWith('http')? imgUrl: getIconImg(imgUrl)
    }

    return <article className="preview">
        {/* HEADER */}
        <header>
            <div className='avatar'>
                <img className="avatar-img md" src={getIconImg('avatar')} alt="avatar" />
            </div>

            <div>
                <a className='username small'>{by.username}</a> <span className='story-date'> • {timeAgo(createdAt)}</span>
            </div>
        </header>

        {/* IMAGE */}
        <img className="story-pic" src={imgUrl} alt="story-pic" />

        {/* BUTTONS */}
        <div className='preview-action-btns'>
            <div>
                <img className='btn' title='Like'
                    src={getIconImg('like')} alt="like-icon" />
            </div>

            {/* COMMENT */}
            <div>
                <Link
                    to={`/p/${_id}`}
                    state={{ modal: true, backgroundLocation: location.state?.background || location, story, }}
                >
                    <img className='btn' title='Comment'
                        src={getIconImg('comment')} alt="comment-icon" />
                </Link>
            </div>


            <div>{comments.length > 0 ? comments.length : ''}</div>

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