import { Modal } from "./Modal.jsx"
import { CommentList } from "./CommentList.jsx"
import { showErrorMsg } from "../services/event-bus.service"
import { userService } from "../services/user/user.service.local.js"
import { addStoryComment, loadStory } from '../store/actions/story.actions'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

export function MobileCommentsModal({ stories, onClose, onOpenStory }) {

    const [txt, setTxt] = useState('')

    const story = useSelector(storeState => storeState.storyModule.story)
    const loggedinUser = userService.getLoggedinUser()

    useEffect(() => {
        loadStory(story._id)
    }, [story._id])

    async function onAddComment(storyId, txt) {
        console.log(storyId, txt);

        try {
            await addStoryComment(storyId, txt)
            setTxt('')
        } catch (err) {
            showErrorMsg('Cannot add comment')
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!txt.trim()) return
        onAddComment(story._id, txt)
        ev.target.querySelector("input")?.blur()
    }

    if (!story) return null

    return (
        <Modal className="comments-sheet" onClose={onClose}>

            <header className="comments-header">
                <span>Comments</span>
            </header>

            <section className="comments-list">

                <CommentList
                    comments={story.comments}
                    stories={stories}
                    onOpenStory={onOpenStory} />

            </section>

            <form className="comment-input"
                onSubmit={handleSubmit}>
                <img className="avatar-img md" src={loggedinUser.imgUrl ? loggedinUser.imgUrl : getIconImg('avatar')} alt="avatar" />

                <input
                    type="text"
                    value={txt}
                    onChange={e => setTxt(e.target.value)}
                    placeholder={`Add a comment for ${story.by.username}`}
                    enterKeyHint="send"
                />
            </form>
        </Modal>
    )
}
