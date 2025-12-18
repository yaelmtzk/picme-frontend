import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStorys, addStory, updateStory, removeStory, addStoryComment } from '../store/actions/story.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { storyService } from '../services/story/'
import { userService } from '../services/user'

import {Nav} from '../cmps/Nav'
import { StoryList } from '../cmps/StoryList'
import { Search} from '../cmps/Search'

export function StoryIndex() {

    const [ filterBy, setFilterBy ] = useState(storyService.getDefaultFilter())
    const storys = useSelector(storeState => storeState.storyModule.storys)

    useEffect(() => {
        loadStorys(filterBy)
    }, [filterBy])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('Story removed')            
        } catch (err) {
            showErrorMsg('Cannot remove story')
        }
    }

    async function onAddStory() {
        const story = storyService.getEmptyStory()
        try {
            const savedStory = await addStory(story)
            showSuccessMsg(`Story added (id: ${savedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story')
        }        
    }

    async function onUpdateStory(story) {
        const speed = +prompt('New speed?', story.speed) || 0
        if(speed === 0 || speed === story.speed) return

        const storyToSave = { ...story, speed }
        try {
            const savedStory = await updateStory(storyToSave)
            showSuccessMsg(`Story updated, new speed: ${savedStory.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update story')
        }        
    }

    return (
        <main className="story-index">
            <header>
                {userService.getLoggedinUser() && <button onClick={onAddStory}>Add a Story</button>}
            </header>
            <Nav/>
            {/* <Search filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            <StoryList 
                storys={storys}
                onRemoveStory={onRemoveStory} 
                onUpdateStory={onUpdateStory}/>
        </main>
    )
}