
export function StoryMoreOpt({ storyId, onClose, onRemove, isOwner }) {

    async function onRemoveStory() {
        onRemove(storyId)
        onClose()
    }

    return (
            <div className="opts-container">

                {isOwner && <div className="option delete-btn" onClick={onRemoveStory}>Delete</div> }
                
                <div className="option" onClick={onClose}>Cancel</div>
            </div>
    )
}