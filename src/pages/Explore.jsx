import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { loadStories, loadStory } from '../store/actions/story.actions'
import spinner from '../assets/img/icons/spinner.png'

export function Explore() {
    const navigate = useNavigate()
    const location = useLocation()

    const stories = useSelector(storeState => storeState.storyModule.stories)
    const loggedinUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadStories({})
    }, [stories.length])

    if (!stories) {
        return <main className="story-index ">
            <div className='loader-section'>
                <img className="spinner" src={spinner} alt="Loading…" />
            </div>
        </main>
    }

    const storiesExplore = stories.filter(story => story.by.byId !== loggedinUser._id).sort((a, b) => b.createdAt - a.createdAt)

    function onDetails(story) {
        loadStory(story._id)
            .then(() => {
                navigate(`/p/${story._id}`, {
                    state: {
                        modal: true,
                        backgroundLocation: location.state?.background || location,
                        story,
                        openOpts: true
                    }
                })
            })

    }

    if (!storiesExplore) {
        return <div className='no'>No posts to show</div>
    }

    return (
        <div className='explore'>
            <ul className="explore-stories-grid">
                {storiesExplore.map(story =>

                    <li key={story._id}
                        className="story-tile"
                        onClick={() => onDetails(story)}>

                        <img src={story.imgUrl} alt="user-post" />

                        <div className='story-preview-icons'>

                            <div className='explore-icon'>

                                <svg
                                    viewBox="0 0 24 24"

                                    alt="comment-icon"
                                >
                                    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
                                </svg>

                                <span>{story.comments?.length || 0}</span>
                            </div>

                            <div className='explore-icon'>
                                <svg
                                    fill="currentColor"
                                    title="Unlike"
                                    height="24"
                                    viewBox="0 0 48 48"
                                    width="24">
                                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>

                                </svg>
                                <span>{story?.likedBy.length || 0}</span>
                            </div>

                        </div>

                    </li>)
                }

            </ul>
        </div>

    )
}