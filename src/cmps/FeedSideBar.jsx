import { getIconImg } from '../services/image.service.js'
import { userService } from '../services/user/user.service.local.js'

export function FeedSideBar() {

    const user = userService.getLoggedinUser()

    return <div className="feed-sidebar">

        <div className="user-feed-sidebar">

        </div>

        <span className="rights">© 2025 PICME FROM MTZK</span>

    </div>
}