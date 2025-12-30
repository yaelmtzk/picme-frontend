import { useState } from "react"
import { useSelector } from "react-redux"
import { addReview } from "../store/actions/comment.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function CommentEdit() {
	const users = useSelector(storeState => storeState.userModule.users)
	const [commentToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '' })

	function handleChange(ev) {
		const { name, value } = ev.target
		setReviewToEdit({ ...commentToEdit, [name]: value })
	}

    async function onAddReview(ev) {
		ev.preventDefault()
		if (!commentToEdit.txt || !commentToEdit.aboutUserId) return alert('All fields are required')
            
		try {
			await addReview(commentToEdit)
			showSuccessMsg('Review added')
			setReviewToEdit({ txt: '', aboutUserId: '' })
		} catch (err) {
			showErrorMsg('Cannot add comment')
		}
	}

   return <form className="comment-edit" onSubmit={onAddReview}>
        <select onChange={handleChange} value={commentToEdit.aboutUserId} name="aboutUserId">
            <option value="">Review about...</option>
            {users.map(user =>
                <option key={user._id} value={user._id}>
                    {user.fullname}
                </option>
            )}
        </select>
        <textarea name="txt" onChange={handleChange} value={commentToEdit.txt}></textarea>
        <button>Add</button>
    </form>

}