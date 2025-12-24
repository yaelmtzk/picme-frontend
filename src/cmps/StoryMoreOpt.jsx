
export function StoryMoreOpt({ storyId, onClose, onRemove, isOwner }) {

    async function onRemoveStory() {
        onRemove(storyId)
        onClose()
    }

    return (
            <div className="opts-container">

                {isOwner && <div className="option" onClick={onRemoveStory}>Delete</div> }
                
                <div className="option" onClick={onClose}>Cancel</div>
            </div>
    )
}