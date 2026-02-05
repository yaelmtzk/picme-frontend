import { useEffect, useRef, useState } from "react"
import { getOid } from "../services/util.service.js";
import defaultImg from "../assets/img/icons/avatar.svg"

export function UserHoverCard({ user, storyList, onOpenProfile, onOpenStory, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const openTimerRef = useRef(null)
    const closeTimerRef = useRef(null)

    const triggerRef = useRef(null)
    const cardRef = useRef(null)
    const [pos, setPos] = useState(null)


    const userStories =
        storyList?.filter(
            story => getOid(story.by.byId) === getOid(user?._id)
        ) || []
    const userStoriesPrev = userStories.slice(0, 3)

    useEffect(() => {
        return () => {
            clearTimeout(openTimerRef.current)
            clearTimeout(closeTimerRef.current)
        }
    }, [])

    if (!user) return null

    function openWithDelay() {
        clearTimeout(closeTimerRef.current)

        openTimerRef.current = setTimeout(() => {
            if (!triggerRef.current) return

            const rect = triggerRef.current.getBoundingClientRect()

            setPos({
                top: rect.bottom + 8,
                left: rect.left
            })

            setIsOpen(true)

        }, 140)


    }

    function closeWithDelay() {
        clearTimeout(openTimerRef.current)
        closeTimerRef.current = setTimeout(() => setIsOpen(false), 180)
    }

    return (
        <span
            ref={triggerRef}
            className="uhc-wrap"
            onMouseEnter={openWithDelay}
            onMouseLeave={closeWithDelay}
        >
            {children}

            {isOpen && pos && (
                <div
                    ref={cardRef}
                    className="uhc-card"
                    style={{
                        top: `${pos.top}px`,
                        left: `${pos.left}px`
                    }}
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
                            className="uhc-avatar pointer" src={user?.imgUrl || defaultImg} alt={user.fullname} />
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

                    {userStoriesPrev.length > 0 &&
                        (<ul className="hover-stories-grid">
                            {userStoriesPrev.map(story =>
                                <li key={story._id}
                                    className="hover-story-tile"
                                    onClick={() => onOpenStory(story)}>

                                    <img src={story.imgUrl} alt="user-post" />

                                </li>)
                            }

                        </ul>
                        )
                    }

                </div>
            )}
        </span>
    )
}