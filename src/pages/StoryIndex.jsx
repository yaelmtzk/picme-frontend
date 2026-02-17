import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDefaultFilter } from '../services/story/index.js'
import { userService } from '../services/user/user.service.remote.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStories, updateStory, removeStory } from '../store/actions/story.actions'
import spinner from '../assets/img/icons/spinner.png'
import { AppHeader } from '../cmps/AppHeader.jsx'
import { StoryList } from '../cmps/StoryList'

export function StoryIndex() {
    const loggedinUser = userService.getLoggedinUser()
    const [filterBy, setFilterBy] = useState(getDefaultFilter())
    const stories = useSelector(storeState => storeState.storyModule.stories)
    console.log('Redux stories state:', stories)
    const users = useSelector(storeState => storeState.userModule.users)

    useEffect(() => {
        loadStories(filterBy)
    }, [filterBy])

    if (!stories || !users || !loggedinUser) {
        return <main className="story-index ">
            <div className='loader-section'>
                <img className="spinner" src={spinner} alt="Loading…" />
            </div>
        </main>
    }

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('Story removed')
        } catch (err) {
            showErrorMsg('Cannot remove story')
        }
    }

    async function onUpdateStory(story) {
        const storyToSave = { ...story }
        try {
            await updateStory(storyToSave)
            showSuccessMsg(`Story updated`)
        } catch (err) {
            showErrorMsg('Cannot update story')
        }
    }

return (
    loggedinUser && (
        <main className="story-index">
            <AppHeader />
            <StoryList
                stories={stories}
                onRemoveStory={onRemoveStory}
                onUpdateStory={onUpdateStory}
            />
        </main>
    )
)
}