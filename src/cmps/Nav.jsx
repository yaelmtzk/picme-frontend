import { useState, useRef } from 'react'
import { useLocation, NavLink, useNavigate } from "react-router-dom"
import { getIconImg } from '../services/image.service.js'
import { Search } from './Search.jsx'
import { CreateEntry } from './CreateEntry.jsx'
import { MobileCreatePortal } from './MobileCreatePortal.jsx'
import { userService } from '../services/user/user.service.remote.js'
import { loadWatchedUser } from '../store/actions/user.actions.js'

export function Nav({ onAdd }) {

    const loggedinUser = userService.getLoggedinUser()

    if (!loggedinUser) return

    const toggleRef = useRef(null)
    const navigate = useNavigate()
    const [openCreate, setOpenCreate] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)

    const user = userService.getLoggedinUser()
    const userId = user._id
    const username = user.username

    function onUserDetails(userId, username) {
        loadWatchedUser(userId)

        navigate(`/${username}`, {
            state: {
                userId
            }
        })
    }

    return (
        <section className={`nav-section  ${openSearch && 'open-search'}`}>


            <div className="nav-desktop">
                <div className='logo'>
                    <NavLink to="/"><img src={getIconImg('picme-logo.png')} alt="logo" /></NavLink>
                </div>
                <section className='nav-btns'>


                    <NavLink to="/">
                        <svg
                            alt="home"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24">
                            <path d="m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894ZM21 20a1 1 0 0 1-1 1h-4.001L16 15c0-2.206-1.794-4-4-4s-4 1.794-4 4l.005 6H4a1 1 0 0 1-1-1v-8.32c0-.543.226-1.07.62-1.447l7-6.68c.747-.714 2.013-.714 2.76 0l7 6.68c.394.376.62.904.62 1.448V20Z"></path>
                        </svg>

                        <div>Home</div>
                    </NavLink>

                    <div ref={toggleRef} onClick={() => setOpenSearch(!openSearch)}
                        className='nav-btn'>
                        <img src={getIconImg('search')} alt="search" />
                        <div>Search</div>
                    </div>

                    <NavLink to="/explore" title="Explore" className='nav-btn'>
                        <img src={getIconImg('explore')} alt="explore" /> <div>Explore</div>
                    </NavLink>

                    <div className='nav-btn'><img src={getIconImg('reel')} alt="reel" /><div>Reels</div></div>

                    <div className='nav-btn'><img src={getIconImg('send')} alt="send" /> <div>Messages</div></div>

                    <div className='nav-btn'><img src={getIconImg('like')} alt="like" /> <div>Notifications</div></div>

                    <div onClick={() => { setOpenCreate(true) }}
                        title="New post"
                        className='nav-btn'>
                        <img src={getIconImg('create')} alt="create" />
                        <div>Create</div>
                    </div>

                    <div
                        onClick={onUserDetails}
                        className='nav-btn'>
                        <img className="avatar-img small" src={user.imgUrl ? user.imgUrl : getIconImg('avatar')} alt="avatar" />
                        <div>Profile</div>
                    </div>

                </section>

            </div>

            <div className="nav-md-device">
                <div className='logo' title="Picme">
                    <NavLink to="/">
                        <svg fill="currentColor"
                            height="24" role="img"
                            viewBox="0 0 24 24"
                            width="24">
                            <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path>
                        </svg>

                    </NavLink>
                </div>
                <section className='nav-btns'>


                    <NavLink to="/" title="Home">
                        <svg
                            alt="home"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24">
                            <path d="m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894ZM21 20a1 1 0 0 1-1 1h-4.001L16 15c0-2.206-1.794-4-4-4s-4 1.794-4 4l.005 6H4a1 1 0 0 1-1-1v-8.32c0-.543.226-1.07.62-1.447l7-6.68c.747-.714 2.013-.714 2.76 0l7 6.68c.394.376.62.904.62 1.448V20Z"></path>
                        </svg>
                    </NavLink>

                    <div ref={toggleRef} onClick={() => setOpenSearch(!openSearch)}
                        className='nav-btn'>
                        <img src={getIconImg('search')} alt="search" />
                    </div>

                    <NavLink to="/explore" title="Explore" className='nav-btn'>
                        <img src={getIconImg('explore')} alt="explore" />
                    </NavLink>

                    <div className='nav-btn' title="Reels"><img src={getIconImg('reel')} alt="reel" /></div>

                    <div className='nav-btn' title="Messages"><img src={getIconImg('send')} alt="send" /></div>

                    <div className='nav-btn' title="Notifications"><img src={getIconImg('like')} alt="like" /></div>

                    <div onClick={() => { setOpenCreate(true) }}
                        title="New post"
                        className='nav-btn'>
                        <img src={getIconImg('create')} alt="create" />
                    </div>

                    <div
                        onClick={() => onUserDetails(userId, username)}
                        className='nav-btn'>
                        <img className="avatar-img small" src={user.imgUrl ? user.imgUrl : getIconImg('avatar')} alt="avatar" />

                    </div>


                </section>
            </div>

            <div className="nav-mobile">
                <section className='nav-btns'>


                    <NavLink to="/" title="Home">
                        <svg
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24">
                            <path d="m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894ZM21 20a1 1 0 0 1-1 1h-4.001L16 15c0-2.206-1.794-4-4-4s-4 1.794-4 4l.005 6H4a1 1 0 0 1-1-1v-8.32c0-.543.226-1.07.62-1.447l7-6.68c.747-.714 2.013-.714 2.76 0l7 6.68c.394.376.62.904.62 1.448V20Z"></path>
                        </svg>
                    </NavLink>

                    <NavLink to="/explore" title="Explore" className='nav-btn'>
                        <img src={getIconImg('explore')} alt="explore" />
                    </NavLink>

                    <div className='nav-btn' title="Reels"><img src={getIconImg('reel')} alt="reel" /></div>

                    <div onClick={() => setOpenCreate(true)}
                        title="New post"
                        className='nav-btn'>
                        <img src={getIconImg('create')} alt="create" />
                    </div>

                    <div className='nav-btn' title="Messages"><img src={getIconImg('send')} alt="send" /></div>

                    <div
                        onClick={onUserDetails}
                        className='nav-btn'>
                        <img className="avatar-img small" src={user.imgUrl ? user.imgUrl : getIconImg('avatar')} alt="avatar" />

                    </div>

                </section>
            </div>

            {openCreate && (
                <MobileCreatePortal>
                    <CreateEntry onClose={() => setOpenCreate(false)} onAdd={onAdd} />
                </MobileCreatePortal>
            )}

            {openSearch && (<Search onClose={() => setOpenSearch(false)} btnRef={toggleRef} />)}

        </section>)
}