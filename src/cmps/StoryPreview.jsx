import { Link } from 'react-router-dom'
import birdImg from '../../public/img/bird.jpg'

export function StoryPreview({ story }) {

    const {by, txt, imgUrl} = story

    console.log(imgUrl);
    
    return <article className="preview">
        <header>
            {/* <Link to={`/story/${story._id}`}>{story.by.username}</Link> */}
            {by.username}
        </header>

        <img src={birdImg} alt="" />

        <p><span>{txt}</span></p>
        
    </article>
}