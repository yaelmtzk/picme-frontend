import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

export function UserDetails() {
  const { username } = useParams()
  // const params = useParams()
  const user = useSelector(storeState => storeState.userModule.user)
  const location = useLocation()
  const loggedinId = location.state?.userId



  console.log(user);
  

  useEffect(() => {
    loadUser(loggedinId)
  }, [loggedinId])

  // useEffect(() => {
  //   if (!user) return

  //   // 2️⃣ sockets still work with ID
  //   socketService.emit(SOCKET_EMIT_USER_WATCH, user._id)
  //   socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  //   return () => {
  //     socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  //   }
  // }, [user])

  // function onUserUpdate(user) {
  //   showSuccessMsg(`This user ${user.fullname} just got updated from socket`)
  //   store.dispatch({ type: 'SET_WATCHED_USER', user })
  // }

  return (
<section className="profile-page">

      {/* HEADER */}
      <header className="profile-header">

        {/* Avatar */}
        <div className="profile-avatar">
          <img
            src={user.imgUrl}
            alt="profile avatar"
            className="avatar-img"
          />
        </div>

        {/* User Info */}
        <div className="profile-info">

          {/* Username + actions */}
          <div className="profile-top-row">
            <h2 className="profile-username">{username}</h2>

            <button className="profile-btn">Edit profile</button>
            <button className="profile-btn icon">⚙</button>
          </div>

          {/* Stats */}
          <ul className="profile-stats">
            <li><strong>12</strong> posts</li>
            <li><strong>340</strong> followers</li>
            <li><strong>180</strong> following</li>
          </ul>

          {/* Bio */}
          <div className="profile-bio">
            <strong>{username}</strong>
            <p>Frontend developer ✨</p>
            <p>📍 Tel Aviv</p>
          </div>

        </div>
      </header>

      {/* HIGHLIGHTS */}
      <section className="profile-highlights">
        <div className="highlight">
          <div className="highlight-circle"></div>
          <span>Travel</span>
        </div>
        <div className="highlight">
          <div className="highlight-circle"></div>
          <span>Food</span>
        </div>
        <div className="highlight">
          <div className="highlight-circle"></div>
          <span>Work</span>
        </div>
      </section>

      {/* TABS */}
      <nav className="profile-tabs">
        <button className="tab active">Posts</button>
        <button className="tab">Reels</button>
        <button className="tab">Tagged</button>
      </nav>

      {/* POSTS GRID */}
      <section className="profile-posts-grid">
        <div className="post-tile"></div>
        <div className="post-tile"></div>
        <div className="post-tile"></div>
        <div className="post-tile"></div>
        <div className="post-tile"></div>
        <div className="post-tile"></div>
      </section>

    </section>
  )
}