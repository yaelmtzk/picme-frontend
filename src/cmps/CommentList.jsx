import { userService } from '../services/user/index.js'

import { CommentPreview } from './ReviewPreview.jsx'

export function CommentList({ reviews, onRemoveComment }) {
    
    function shouldShowActionBtns(comment) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return comment.byUser?._id === user._id
    }

    return <section>
        <ul className="list comment-list">
            {comments.map(comment =>
                <li key={comment._id}>
                    <CommentPreview comment={comment}/>
                    {shouldShowActionBtns(comment) && <div className="actions">
                        <button onClick={() => onRemoveComment(comment._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}