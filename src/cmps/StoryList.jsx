import { userService } from '../services/user'
import { FeedSideBar } from './FeedSideBar'
import { StoryPreview } from './StoryPreview'

export function StoryList({ stories, onRemoveStory, onUpdateStory }) {

    const storylist = [...stories].sort((a, b) => b.createdAt - a.createdAt)

    function shouldShowActionBtns(story) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return story.creator?._id === user._id
    }

    return <section className='story-list-section'>
            <ul className="story-list">
                {storylist.map(story =>
                    <li key={story._id}>
                        <StoryPreview story={story} />
                        
                        {/* {shouldShowActionBtns(story) && <div className="actions">
                            <button onClick={() => onUpdateStory(story)}>Edit</button>
                            <button onClick={() => onRemoveStory(story._id)}>x</button>
                        </div>} */}
                    </li>)
                }
            </ul>

        <FeedSideBar />
    </section>
}