import { FeedSideBar } from './FeedSideBar'
import { StoryPreview } from './StoryPreview'
import { useSelector } from 'react-redux'
import { getOid } from '../services/util.service'

export function StoryList({ stories, onRemoveStory, onUpdateStory }) {
    const users = useSelector(storeState => storeState.userModule.users)

    if (!users?.length) return null

    return <section className='story-list-section'>
        <ul className="story-list">
            {stories.map(story => {
                const storyUser = users.find(u => getOid(u._id) === getOid(story.by.byId))
                if (!storyUser) return null

                return <li key={story._id}>
                    <StoryPreview
                        story={story}
                        storyUser={storyUser}
                        onUpdate={onUpdateStory}
                        onRemove={onRemoveStory}
                        stories={stories} />
                </li>
            })

            }
        </ul>

        <FeedSideBar />
    </section>
}