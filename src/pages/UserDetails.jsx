import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { getIconImg } from '../services/image.service.js'

import { SET_STORY } from '../store/reducers/story.reducer'
import { userService } from '../services/user/user.service.local.js'

export function UserDetails() {
  const { username } = useParams()
  const dispatch = useDispatch()
  const location = useLocation()
  const state = location.state
  const navigate = useNavigate()

  const loggedinUser = useSelector(storeState => storeState.userModule.user)
  const userId = state?.userId
  const user = userService.getById(userId)

  // console.log(loggedinUser._id, userId);
  
  const stories = useSelector(storeState => storeState.storyModule.stories)
  const userStories = stories.filter(story => story.by.byId === userId).sort((a, b) => b.createdAt - a.createdAt)

  function onDetails(story) {
    dispatch({ type: SET_STORY, story })

    navigate(`/p/${story._id}`, {
      state: {
        modal: true,
        backgroundLocation: state?.background || location,
        story,
        stories,
        openOpts: true
      }
    })
  }

  return (
    <section className="profile-page">

      <div className='profile-main'>
        {/* HEADER */}
        <header className="profile-header">

          <div className='top-header-row'>
            {/* Avatar */}
            <div className="profile-avatar">
              <img
                src={user.imgUrl}
                alt="profile avatar"
                className="avatar-img"
              />
            </div>

            {/* Header Main */}
            <div className='profile-header-main'>
              {/* User Info */}
              {/* Username + actions */}
              <div className="profile-top-row">

                <div className="username">{username}</div>

                {loggedinUser._id === userId &&
                  (
                    <div className="btn">
                      <img src={getIconImg('settings')} alt="settings" />
                    </div>
                  )}

              </div>

              <div className='profile-fullname'>{user.fullname}</div>

              {/* Stats */}
              <ul className="profile-stats">
                <li><span>{userStories?.length || 0}</span> posts</li>
                <li><span>{user?.followers || 0}</span>  followers</li>
                <li><span>{user?.following || 0}</span> following</li>
              </ul>

              {/* Bio */}
              {user.bio &&
                (<div className="profile-bio">
                  <p>{user.bio}</p>
                </div>)
              }
            </div>

          </div>

          {loggedinUser._id === userId?
            (
              <div className='profile-btn-section'>
                <button className="profile-btn">Edit profile</button>
                <button className="profile-btn">View archive</button>
              </div>
            ) : ('')}

          {/* HIGHLIGHTS */}
          <section className="profile-highlights">

            {user.highlights && (
              user.highlights.map(hl =>
                <div className='highlight-container'>
                  <div className='highlight-circle-outer'>

                    <div className="highlight-circle-inner">

                      <img src={hl.coverImg} alt="highlight-img" />
                    </div>

                  </div>
                  <span>{hl.txt}</span>
                </div>

              ))}

            {loggedinUser._id === userId ?
              (
                <div className='highlight-container'>
                  <div className='highlight-circle-outer'>

                    <div className="highlight-circle-inner" title='New highlight'>

                      <svg
                        className='new-high-icon'
                        viewBox="0 0 24 24"
                        alt="new-highlight"
                      >
                        <path
                          d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"
                        />
                      </svg>

                    </div>

                  </div>

                  <span>New</span>

                </div>
              ) :
              ('')
            }

          </section>

        </header>

        {/* TABS */}
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

          {loggedinUser._id === userId &&
            (
              <div className="saved-tab tab ">
                <div className='inner-tab'>

                  <svg
                    className='saved-icon'
                    viewBox="0 0 24 24"
                    alt="saved-icon"
                    title="Saved"
                  >
                    <path d="M20 21 L12 13.44 L4 21 L4 3 L20 3 Z" />

                  </svg>
                </div>

              </div>
            )}

          <div className="tagged-tab tab">
            <div className='inner-tab'>
              <svg
                className='tagged-icon'
                viewBox="0 0 24 24"
                alt="tagged-icon"
              >
                <path d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59
                        0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 
                        6.08v14.104A1.818 1.818 0 0 1 20.182 22H3.818A1.818 
                        1.818 0 0 1 2 20.184V6.08A1.818 1.818 0 0 1 3.818 
                        4.262h5.26a1.59 1.59 0 0 0 1.123-.465Z
                        M6 20v-.5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4V20
                        M12 13.5a3 3 0 1 0 0-6a3 3 0 0 0 0 6
                " />
              </svg>
            </div>

          </div>

        </nav>

        {/* POSTS GRID */}
        <section className="profile-stories">

          {userStories ?
            (<ul className="profile-stories-grid">
              {userStories.map(story =>
                <li key={story._id}
                  className="story-tile"
                  onClick={() => { onDetails(story) }}>

                  <img src={story.imgUrl} alt="user-post" />

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
            ) : (<div className='no'>Share your first photo</div>)
          }

        </section>
      </div>

    </section>
  )
}