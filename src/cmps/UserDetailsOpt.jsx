import { useNavigate } from "react-router"

export function UserDetailsMoreOpt({ userId, onClose, onLogOut }) {

    const navigate = useNavigate()

    async function onLogout() {
        await onLogOut()
        navigate("/")
    }

    return (
            <div className="opts-container">

                <div className="option logout-btn" onClick={onLogout}>Log Out</div>
                
                <div className="option" onClick={onClose}>Cancel</div>
            </div>
    )
}