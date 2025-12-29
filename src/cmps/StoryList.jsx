import { FeedSideBar } from './FeedSideBar'
import { StoryPreview } from './StoryPreview'

export function StoryList({ stories, onRemoveStory, onUpdateStory }) {

    const storylist = [...stories]

    return <section className='story-list-section'>
            <ul className="story-list">
                {storylist.map(story =>
                    <li key={story._id}>
                        <StoryPreview 
                        story={story} 
                        onUpdate={onUpdateStory}
                        onRemove={onRemoveStory}
                        stories={storylist}/>
                    </li>)
                }
            </ul>

        <FeedSideBar />
    </section>
}