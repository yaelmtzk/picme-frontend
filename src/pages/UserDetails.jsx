
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getIconImg } from '../services/image.service'
import { getOid } from '../services/util.service'
import spinner from '../assets/img/icons/spinner.png'
import { loadWatchedUser, clearWatchedUser, logout } from '../store/actions/user.actions'
import { Modal } from '../cmps/Modal'
import { UserDetailsMoreOpt } from '../cmps/UserDetailsOpt'

export function UserDetails() {
  const location = useLocation()
  const state = location.state
  const navigate = useNavigate()

  const userId = location.state?.userId

  const loggedinUser = useSelector(state => state.userModule.user)
  const watchedUser = useSelector(storeState => storeState.userModule.watchedUser)
  const stories = useSelector(storeState => storeState.storyModule.stories)

  const [openOpts, setOpenOpts] = useState(false)

  useEffect(() => {
    clearWatchedUser()
    loadWatchedUser(userId)

    return () => clearWatchedUser()
  }, [userId])


  if (!watchedUser) {
    return <div className="profile-page">
      <div className='loader-section'>
        <img className="spinner" src={spinner} alt="Loading…" />
      </div>
    </div>
  }

  const userStories = stories.filter(story => getOid(story.by.byId) === getOid(watchedUser._id)).sort((a, b) => b.createdAt - a.createdAt)

  function onDetails(story) {
    navigate(`/p/${story._id}`, {
      state: {
        modal: true,
        backgroundLocation: state?.background || location,
        story,
        openOpts: true
      }
    })
  }

  return (
    <section className="profile-page">

      <div className='profile-main'>

        <header className="profile-header">

          <div className='top-header-row'>

            <div className="profile-avatar">
              <img
                src={watchedUser.imgUrl}
                alt="profile avatar"
                className="avatar-img"
              />
            </div>

            <div className='profile-header-main'>

              <div className="profile-top-row">

                <div className="username">{watchedUser.username}</div>

                {loggedinUser._id === watchedUser._id &&
                  (
                    <div className="btn">
                      <img
                        onClick={() => {
                          setOpenOpts(true)
                        }}
                        src={getIconImg('settings')}
                        alt="settings" title="Options" />
                    </div>
                  )}
              </div>

              <div className='profile-fullname'>{watchedUser.fullname}</div>

              <ul className="profile-stats">
                <li key="posts"><span>{userStories?.length || 0}</span> posts</li>
                <li key="followers"><span>{watchedUser?.followers || 0}</span>  followers</li>
                <li key="following"><span>{watchedUser?.following || 0}</span> following</li>
              </ul>

              {watchedUser.bio &&
                (<div className="profile-bio">
                  <p>{watchedUser.bio}</p>
                </div>)
              }

            </div>
          </div>

          {watchedUser.bio &&
            (<div className="profile-bio-mobile">
              <p>{watchedUser.bio}</p>
            </div>)
          }

          <section className="profile-highlights">

            {watchedUser.highlights && (
              watchedUser.highlights.map(hl =>
                <div
                  className='highlight-container'
                  key={hl.txt}>
                  <div className='highlight-circle-outer'>

                    <div className="highlight-circle-inner">
                      <img src={hl.coverImg} alt="highlight-img" />
                    </div>

                  </div>
                  <span>{hl.txt}</span>
                </div>

              ))}
          </section>

        </header>

        <nav className="profile-tabs">

          <div className="post-tab tab ">
            <div className='inner-tab active'>
              <svg
                className='posts-icon'
                viewBox="0 0 24 24"

                alt="posts-icon"
                title='Posts'
              >
                <path d="M3 3 H21 V21 H3 Z
                        M9.01486 3 V21
                        M14.98514 3 V21
                        M3 9.01486 H21
                        M3 14.98514 H21" />
              </svg>
            </div>
          </div>

        </nav>

        <section className="profile-stories">

          {userStories?.length ?
            (<ul className="profile-stories-grid">
              {userStories.map(story =>
                <li key={story._id}
                  className="story-tile"
                  onClick={() => { onDetails(story) }}>

                  <img src={story.img.url} alt="user-post" />

                  <div className='profile-comment-icon'>

                    <svg
                      viewBox="0 0 24 24"

                      alt="comment-icon"
                    >
                      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
                    </svg>

                    <span>{story.comments?.length || 0}</span>
                  </div>

                </li>)
              }
            </ul>
            ) : (<div className='no-stories'>Share your first photo</div>)
          }

        </section>
      </div>

      {openOpts &&
        (<Modal
          onClose={() => setOpenOpts(false)}
          className="opts-modal"
        >
          <UserDetailsMoreOpt
            userId={loggedinUser._id}
            onLogOut={logout}
            onClose={() => setOpenOpts(false)} />
        </Modal>
        )}
    </section>
  )
}