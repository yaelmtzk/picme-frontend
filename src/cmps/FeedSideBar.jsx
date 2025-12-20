import { getIconImg } from '../services/image.service.js'

export function FeedSideBar() {
    return <div className="feed-sidebar">

        <div className="user-feed-sidebar">
            <div className='avatar'>
                <img className="avatar-img big"src={getIconImg('avatar')} alt="avatar" />
            </div>
            <div>            
                <div className="username small">shira.avt</div>
                <div className="fullname small">Shira Avital</div>
            </div>

        </div>

        <span className="rights">© 2025 PICME FROM MTZK</span>

    </div>
}