import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppHeader } from '../cmps/AppHeader.jsx'

import { loadStories, updateStory, removeStory, addStoryComment } from '../store/actions/story.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { getDefaultFilter, getEmptyStory } from '../services/story/index.js'
import { userService } from '../services/user/user.service.remote.js'
import { StoryList } from '../cmps/StoryList'
import { Login } from './Login.jsx'
import spinner from '../assets/img/icons/spinner.png'

export function StoryIndex() {

    const loggedinUser = userService.getLoggedinUser()
    const [filterBy, setFilterBy] = useState(getDefaultFilter())
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const users = useSelector(storeState => storeState.userModule.users)

    useEffect(() => {
        loadStories(filterBy)
    }, [filterBy])

    if (!loggedinUser) return <Login />

    if (!stories || !users || !users.length) {
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
        <main className="story-index ">
            <AppHeader />
            <StoryList
                stories={stories}
                onRemoveStory={onRemoveStory}
                onUpdateStory={onUpdateStory} />
        </main >
    )
}