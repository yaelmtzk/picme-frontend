import { useParams } from 'react-router-dom'
import { Modal } from "./Modal.jsx"
import { CommentList } from "./CommentList.jsx"
import { showErrorMsg } from "../services/event-bus.service"
import { userService } from '../services/user/user.service.remote.js'
import { addStoryComment, loadStory } from '../store/actions/story.actions'
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { getIconImg } from "../services/image.service.js"
import { getOid } from "../services/util.service.js"

export function MobileCommentsModal({ onClose, onRemoveComment }) {
    const [txt, setTxt] = useState('')
    const story = useSelector(state => state.storyModule.story)
    const stories = useSelector(state => state.storyModule.stories)
    const users = useSelector(state => state.userModule.users)
    const loggedinUser = userService.getLoggedinUser()
    const storyId = useParams().id

useEffect(() => {
    if (!storyId) return

    if (story?._id === storyId) return

    const localStory = stories?.find(
        st => getOid(st._id) === getOid(storyId)
    )

    if (localStory) {
        loadStory(localStory._id) 
        return
    }

    loadStory(storyId)

}, [storyId])
    if (!story) {
        return (
            <Modal className="comments-sheet" onClose={onClose}>
                <header className="comments-header">
                    <span>Comments</span>
                </header>
                <section className="comments-list">
                    Loading comments…
                </section>
            </Modal>
        )
    }

    async function onAddComment(storyId, txt) {
        try {
            await addStoryComment(storyId, txt)
            setTxt('')
        } catch {
            showErrorMsg('Cannot add comment')
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!txt.trim()) return
        onAddComment(story._id, txt)
        ev.target.querySelector("input")?.blur()
    }

    return (
        <Modal className="comments-sheet" onClose={onClose}>
            <header className="comments-header">
                <span>Comments</span>
            </header>

            <section className="comments-list">
                <CommentList
                    storyId={story._id}
                    comments={story?.comments || []}
                    onRemoveComment={onRemoveComment}
                    stories={stories}
                    users={users}
                />
            </section>

            <form className="comment-input" onSubmit={handleSubmit}>
                <img
                    className="avatar-img md"
                    src={loggedinUser?.imgUrl || getIconImg('avatar')}
                    alt="avatar"
                />

                <input
                    type="text"
                    value={txt}
                    onChange={e => setTxt(e.target.value)}
                    placeholder={
                        story?.by?.username
                            ? `Add a comment for ${story.by.username}`
                            : 'Add a comment'
                    }
                    enterKeyHint="send"
                />
            </form>
        </Modal>
    )
}
