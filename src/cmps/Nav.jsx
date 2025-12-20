import { NavLink } from 'react-router-dom'
import { getIconImg } from '../services/image.service.js'

export function Nav() {

    return (
        <section className='nav-section'>
            <div className='logo'>
                <NavLink to="/"><img src={getIconImg('picme-logo.png')} alt="logo" /></NavLink>
            </div>
            <section className='nav-btns'>


                <NavLink to="/">
                    <img src={getIconImg('home')} alt="home" />
                    <div>Home</div>
                </NavLink>

                <div className='nav-btn'><img src={getIconImg('search')} alt="search" /> <div>Search</div></div>

                <div className='nav-btn'><img src={getIconImg('explore')} alt="explore" /> <div>Explore</div></div>

                <div className='nav-btn'><img src={getIconImg('reel')} alt="reel" /><div>Reels</div></div>

                <div className='nav-btn'><img src={getIconImg('send')} alt="send" /> <div>Messages</div></div>

                <div className='nav-btn'><img src={getIconImg('like')} alt="like" /> <div>Notifications</div></div>

                <div className='nav-btn'><img src={getIconImg('create')} alt="create" /> <div>Create</div></div>

                <div className='avatar nav-btn'>
                    <img className="avatar-img small" src={getIconImg('avatar')} alt="avatar" />
                    <div>Profile</div>
                </div>
            </section>

        </section>)

}