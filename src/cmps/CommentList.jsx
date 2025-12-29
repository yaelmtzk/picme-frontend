import { CommentPreview } from './CommentPreview.jsx'

export function CommentList({ comments, stories, onOpenStory, onRemoveComment }) {
    
    return <ul className="comment-list">
            {comments.map(comment =>
                <li key={comment._id}>

                    <CommentPreview comment={comment} stories={stories} onOpenStory={onOpenStory}/>
                </li>)
            }
        </ul>
}