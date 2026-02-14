import { useNavigate } from "react-router"

export function ProfilePicOpt({ userId, onClose, onUpdate }) {


    async function onUpdateImg() {
        onUpdate()
    }

    return (
            <div className="profile-pic-opts-container opts-container">
                <div className="option profile-pic-btn">Change Profile Photo</div>
                <div className="option profile-pic-btn" onClick={onUpdateImg}>Upload photo</div>
                <div className="option profile-pic-btn" onClick={onUpdateImg}>Remove Current photo</div>
                <div className="option" onClick={onClose}>Cancel</div>
            </div>
    )
}