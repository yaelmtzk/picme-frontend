import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStories, addStory, updateStory, removeStory, addStoryComment } from '../store/actions/story.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { getDefaultFilter, getEmptyStory } from '../services/story/index.js'

import { StoryList } from '../cmps/StoryList'

export function StoryIndex() {

    const [filterBy, setFilterBy] = useState(getDefaultFilter())
    const stories = useSelector(storeState => storeState.storyModule.stories)

    useEffect(() => {
        loadStories(filterBy)
    }, [filterBy])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('Story removed')
        } catch (err) {
            showErrorMsg('Cannot remove story')
        }
    }

    async function onAddStory(txt, imgUrl) {
        const story = getEmptyStory()
        story.txt = txt
        story.imgUrl = imgUrl

        try {
            const savedStory = await addStory(story)
            showSuccessMsg(`Story added (id: ${savedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story')
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
            <StoryList
                stories={stories}
                onRemoveStory={onRemoveStory}
                onUpdateStory={onUpdateStory} />
        </main>
    )
}