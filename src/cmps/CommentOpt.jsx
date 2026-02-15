
export function CommentOpt({ storyId, commentId, onRemove, onClose }) {

    async function onRemoveComment() {
        onRemove(storyId, commentId)
        onClose()
    }

    return (
            <div className="opts-container">

                <div className="option delete-btn" onClick={onRemoveComment}>Delete comment</div>
                
                <div className="option" onClick={onClose}>Cancel</div>
            </div>
    )
}