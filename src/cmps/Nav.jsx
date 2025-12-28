import { useState } from "react"
import { NavLink } from 'react-router-dom'
import { getIconImg } from '../services/image.service.js'
import { CreateStory } from "./CreateStory.jsx"
import { userService } from "../services/user/user.service.local.js"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux'

export function Nav({ onAdd }) {
    const [openCreate, setOpenCreate] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    
    const userId = user._id
    const username = user.username

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

                <div onClick={() => setOpenCreate(true)}
                    className='nav-btn'>
                    <img src={getIconImg('create')} alt="create" />
                    <div>Create</div>
                </div>

                <NavLink
                    className='nav-btn'
                    to={`/${username}`}
                    state={{
                        userId
                    }}>
                    <img className="avatar-img small" src={user.imgUrl ? user.imgUrl : getIconImg('avatar')} alt="avatar" />
                    <div>Profile</div>
                </NavLink>

            </section>

            {openCreate && (
                <CreateStory onClose={() => setOpenCreate(false)} onAdd={onAdd} />)}

        </section>)

}