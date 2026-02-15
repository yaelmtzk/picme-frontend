// import { storyService } from '../../services/story/story.service.local'
// import { userService } from '../../services/user/user.service.local'
import { storyService } from '../../services/story/story.service.remote'
import { store } from '../store'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, SET_STORY, UPDATE_STORY, CLEAR_STORY } from '../reducers/story.reducer'
import { getOid, makeId, toggleStoryLike } from "../../services/util.service"

export async function loadStories(filterBy = {}) {
    try {
        const stories = await storyService.query(filterBy)
        store.dispatch(getCmdSetStories(stories))
    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }
}

export async function loadStory(storyId) {
    try {
        const state = store.getState()
        const stories = state.storyModule.stories
        const localStory = stories.find(s => getOid(s._id) === getOid(storyId))

        if (localStory) {
            store.dispatch(getCmdSetStory(localStory))
            return localStory
        }
        const story = await storyService.getById(storyId)
        store.dispatch(getCmdSetStory(story))
        return story

    } catch (err) {
        console.log("Cannot load story", err)
        throw err
    }
}

export async function clearStory() {
    try {
        store.dispatch(getCmdClearStory(null))
    } catch (err) {
        console.log('Cannot clear story', err)
        throw err
    }
}

export async function removeStory(storyId) {
    try {
        const state = store.getState()
        const loggedInUser = state.userModule.user
        const story = await storyService.getById(storyId)

        if (story.by.byId !== loggedInUser._id) {
            throw new Error('Not authorized')
        }

        await storyService.remove(storyId)
        store.dispatch(getCmdRemoveStory(storyId))

    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        store.dispatch(getCmdAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story) {
    try {
        const savedStory = await storyService.save(story)
        store.dispatch(getCmdUpdateStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

export async function addStoryComment(storyId, txt) {
    const state = store.getState()
    const story = state.storyModule.story
    const user = state.userModule.user

    if (!story || story._id !== storyId) return

    const optimisticComment = {
        _id: makeId(),
        txt,
        byId: user._id,
        username: user.username,
        imgUrl: user.imgUrl,
        optimistic: true
    }

    const optimisticStory = {
        ...story,
        comments: [...story.comments, optimisticComment]
    }
    
    store.dispatch(getCmdUpdateStory(optimisticStory))

    try {
        const updatedStory = await storyService.addStoryComment(storyId, txt)
        store.dispatch(getCmdUpdateStory(updatedStory))
        return updatedStory

    } catch (err) {
        store.dispatch(getCmdUpdateStory(story))
        throw err
    }
}

export async function removeStoryComment(storyId, commentId) {
    const state = store.getState()
    const story = state.storyModule.story
    const user = state.userModule.user

    if (!story || story._id !== storyId || !user) return

    const comment = story.comments.find(c => c._id === commentId)
    if (!comment) return

    if (comment.byId !== user._id) return

    const originalStory = story

    const optimisticStory = {
        ...story,
        comments: story.comments.filter(c => c._id !== commentId)
    }

    store.dispatch(getCmdUpdateStory(optimisticStory))

    try {
        const updatedStory = await storyService.removeStoryComment(storyId, commentId)
        store.dispatch(getCmdUpdateStory(updatedStory))
        return updatedStory

    } catch (err) {
        store.dispatch(getCmdUpdateStory(originalStory))
        throw err
    }
}


export async function toggleLikeStory(story) {
    const state = store.getState()
    const user = state.userModule.user

    const optimisticStory = toggleStoryLike(story, user)
    store.dispatch(getCmdUpdateStory(optimisticStory))

    try {
        const updatedStory = await storyService.toggleLike(story._id)
        store.dispatch(getCmdUpdateStory(updatedStory))
        return updatedStory

    } catch (err) {
        store.dispatch(getCmdUpdateStory(story))
        throw err
    }
}

// Command Creators:
function getCmdSetStories(stories) {
    return {
        type: SET_STORIES,
        stories
    }
}
function getCmdSetStory(story) {
    return {
        type: SET_STORY,
        story
    }
}
function getCmdClearStory(story) {
    return {
        type: CLEAR_STORY,
        story
    }
}
function getCmdRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
function getCmdAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}
function getCmdUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}

