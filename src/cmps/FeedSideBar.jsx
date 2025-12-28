import { getIconImg } from '../services/image.service.js'
import { userService } from '../services/user/user.service.local.js'

export function FeedSideBar() {

    const user = userService.getLoggedinUser()

    return <div className="feed-sidebar">

        <div className="user-feed-sidebar">
            {/* <div className='avatar'>
                <img className="avatar-img big"src={user?.imgUrl || getIconImg('avatar')} alt="avatar" />
            </div> */}
            {/* <div>            
                <div className="username small">{user.username}</div>
                <div className="fullname small">{user.fullname}</div>
            </div> */}

        </div>

        <span className="rights">© 2025 PICME FROM MTZK</span>

    </div>
}