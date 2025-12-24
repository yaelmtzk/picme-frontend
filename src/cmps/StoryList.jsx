import { FeedSideBar } from './FeedSideBar'
import { StoryPreview } from './StoryPreview'

export function StoryList({ stories, onRemoveStory, onUpdateStory }) {

    const storylist = [...stories].sort((a, b) => b.createdAt - a.createdAt)

    return <section className='story-list-section'>
            <ul className="story-list">
                {storylist.map(story =>
                    <li key={story._id}>
                        <StoryPreview 
                        story={story} 
                        onUpdate={onUpdateStory}
                        onRemove={onRemoveStory}/>
                    </li>)
                }
            </ul>

        <FeedSideBar />
    </section>
}