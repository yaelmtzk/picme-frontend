import { NavLink } from 'react-router-dom'

export function Nav() {

    return (
        <section className='nav-section'>
            <NavLink to="/">Picme</NavLink>
            <NavLink to="/">Home</NavLink>
            <div>Search</div>
            <div>Explore</div>
            <div>Reels</div>
            <div>Messages</div>
            <div>Notifications</div>
            <div>Create</div>
            <div>
                <img className='Profile-small-pic-avatar' src="" alt="" />
                Pofile</div>
        </section>)

}