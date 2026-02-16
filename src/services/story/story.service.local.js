
import { storageService } from '../async-storage.service'
import { makeId, loadFromStorage, saveToStorage } from '../util.service'
import { gStories } from './stories'
import { userService } from '../user'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryComment, 
    toggleLike
}
window.cs = storyService

const stories = gStories

async function query(filterBy = {}) {
    const stories = await storageService.query(STORAGE_KEY)
    var filteredStories = [...stories]

    if (filterBy.userId) {
        filteredStories = filteredStories.filter(story => story.by.byId == filterBy.userId)
    }
    return filteredStories.sort((a, b) => b.createdAt - a.createdAt)
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    let savedStory
    if (story._id) {
        const storyToSave = { ...story }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)

    } else {
        let storyToSave = { ...story }
        const user = userService.getLoggedinUser()
        storyToSave._id = makeId()
        // Later, owner is set by the backend
        storyToSave.by = { byId: user._id, username: user.username }
        storyToSave.createdAt = Date.now()
        savedStory = await storageService.post(STORAGE_KEY, storyToSave)
    }
    return savedStory
}

async function addStoryComment(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)
    const user = userService.getLoggedinUser()

    const comment = {
        _id: makeId(),
        byId: user._id,
        username: user.username,
        txt: txt,
        createdAt: Date.now(),
        imgUrl: user.imgUrl
    }

    const updatedStory = {
        ...story,
        comments: [...story.comments, comment]
    }
    await storageService.put(STORAGE_KEY, updatedStory)
    return updatedStory
}

export function toggleLike(storyId) {
    const story = getById(storyId)
    const loggedinUser = userService.getLoggedinUser()
    const alreadyLiked = story.likedBy.some(u => u.byId === loggedinUser._id)
    const likedBy = alreadyLiked
        ? story.likedBy.filter(u => u.byId !== loggedinUser._id)
        : [...story.likedBy, { byId: loggedinUser._id, username: loggedinUser.username }]

    return {
        ...story,
        likedBy
    }
}

/////////////////////////////////////////////////////////

function _createStories() {
    let storiesToCreate = loadFromStorage(STORAGE_KEY)
    if (!storiesToCreate || !storiesToCreate.length) {
        storiesToCreate = stories
        saveToStorage(STORAGE_KEY, storiesToCreate)
    }
}

// _createStories()