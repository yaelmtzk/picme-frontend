import { httpService } from '../http.service'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryComment
}

async function query(filterBy = { txt: '', userId: '' }) {
    return httpService.get(`story`, filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, story)
    } else {
        savedStory = await httpService.post('story', story)
    }
    return savedStory
}

async function addStoryComment(storyId, txt) {
    const savedComment = await httpService.post(`story/${storyId}/comment`, {txt})
    return savedComment
}

export function toggleStoryLike(story, user) {
    const alreadyLiked = story.likedBy.some(u => u.byId === user._id)

    const likedBy = alreadyLiked
        ? story.likedBy.filter(u => u.byId !== user._id)
        : [...story.likedBy, { byId: user._id, username: user.username }]

    return {
        ...story,
        likedBy
    }
}