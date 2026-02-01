import { CommentPreview } from './CommentPreview.jsx'

export function CommentList({ comments, stories, users, onOpenStory, onRemoveComment }) {

    if (!comments.length) return <div className='no-comments'><span>No comments to show</span></div>
    
    return <ul className="comment-list">
            {comments.map(comment =>
                <li key={comment._id}>

                    <CommentPreview
                    user={users.find(user => user._id === comment.byId)}
                    comment={comment} 
                    stories={stories} 
                    onOpenStory={onOpenStory}/>
                </li>)
            }
        </ul>
}