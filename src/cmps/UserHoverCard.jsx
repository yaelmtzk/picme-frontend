import { useEffect, useRef, useState } from "react"

export function UserHoverCard({ user, storyList, onOpenProfile, onOpenStory, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const openTimerRef = useRef(null)
    const closeTimerRef = useRef(null)
    const userStories = [...storyList].filter(story => story.by.byId === user._id)
    const userStoriesPrev = userStories.slice(0, 3)

    useEffect(() => {
        return () => {
            clearTimeout(openTimerRef.current)
            clearTimeout(closeTimerRef.current)
        }
    }, [])

    function openWithDelay() {
        clearTimeout(closeTimerRef.current)
        openTimerRef.current = setTimeout(() => setIsOpen(true), 140)
        // console.log(userStories);        
    }

    function closeWithDelay() {
        clearTimeout(openTimerRef.current)
        closeTimerRef.current = setTimeout(() => setIsOpen(false), 180)
    }

    return (
        <span
            className="uhc-wrap"
            onMouseEnter={openWithDelay}
            onMouseLeave={closeWithDelay}
        >

            {children}

            {/* The hover card */}
            {isOpen && (
                <div
                    className="uhc-card"
                    onMouseEnter={() => {
                        clearTimeout(closeTimerRef.current)
                        setIsOpen(true)
                    }}
                    onMouseLeave={closeWithDelay}
                >
                    <div className="uhc-top">
                        <img
                            onClick={(ev) => {
                                ev.preventDefault()
                                ev.stopPropagation()
                                onOpenProfile?.(user._id, user.username)
                            }}
                            className="uhc-avatar pointer" src={user.imgUrl} alt={user.fullname} />
                        <div className="uhc-main">
                            <div className="uhc-row">
                                <span
                                    onClick={(ev) => {
                                        ev.preventDefault()
                                        ev.stopPropagation()
                                        onOpenProfile?.(user._id, user.username)
                                    }}
                                    className="uhc-username pointer">{user.username}
                                </span>
                            </div>
                            <div className="uhc-fullname">{user.fullname}</div>
                        </div>
                    </div>

                    <div className="uhc-stats">

                        <div className="uhc-stat">
                            <span className="uhc-num"><strong>{userStories.length ?? 0}</strong></span>
                            <span className="uhc-label">posts</span>
                        </div>

                        <div className="uhc-stat">
                            <span className="uhc-num"><strong>{user.followers ?? 0}</strong></span>
                            <span className="uhc-label">followers</span>
                        </div>

                        <div className="uhc-stat">
                            <span className="uhc-num"><strong>{user.following ?? 0}</strong></span>
                            <span className="uhc-label">following</span>
                        </div>

                    </div>

                    {userStoriesPrev ?
                        (<ul className="hover-stories-grid">
                            {userStoriesPrev.map(story =>
                                <li key={story._id}
                                    className="hover-story-tile"
                                    onClick={() => onOpenStory(story) }>

                                    <img src={story.imgUrl} alt="user-post" />

                                </li>)
                            }

                        </ul>
                        ) : ('')
                    }

                    <div className="uhc-actions">
                        {/* <button
                            className="uhc-btn"
                            onClick={(ev) => {
                                ev.preventDefault()
                                ev.stopPropagation()
                                onOpenProfile?.(user)
                            }}
                        >
                            View profile
                        </button> */}

                        {/* <button
                            className="uhc-btn uhc-btn--ghost"
                            onClick={(ev) => {
                                ev.preventDefault()
                                ev.stopPropagation()
                                // Example: follow action hook
                                console.log("follow", user._id)
                            }}
                        >
                            Follow
                        </button> */}
                    </div>
                </div>
            )}
        </span>
    )
}
