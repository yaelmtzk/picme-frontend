
import { storageService } from '../async-storage.service'
import { makeId, loadFromStorage, saveToStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryComment
}
window.cs = storyService

const gStories = [
    {
        _id: '01',
        txt: 'Best trip ever',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766349160/l6fsyngzqjqtpyio6ipq.jpg',
        by: {
            byId: 'u01',
            username: 'daniel.coh',
        },
        createdAt: 1765788862000,
        loc: {},
        comments: [
            {
                byId: 'u02',
                username: 'maya.levine',
                txt: 'Is that in the South? Looks familiar'
            }
        ],
        likedBy: [],
        tags: ['trip', 'outdoor', 'fun']

    },

    {
        _id: '02',
        txt: 'My favorite recipe for lazy days',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766349160/f64ti0vrazpu9kzty7h0.jpg',
        by: {
            byId: 'u02',
            username: 'maya.levine',
        },
        createdAt: 1765994711000,
        loc: {},
        comments: [
            {
                byId: 'u01',
                username: 'daniel.coh',
                txt: 'Looks delicious!'
            }
        ],
        likedBy: [],
        tags: ['cooking', 'healthy']

    },

      {
        _id: '03',
        txt: 'My yard got a visitor',
        imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1766349159/pgaybrqiamzwo69r8e6z.jpg',
        by: {
            byId: 'u03',
            username: 'shira.avt',
        },
        createdAt: 1766182137000,
        loc: {},
        comments: [
            {
                byId: 'u01',
                username: 'daniel.coh',
                txt: 'How cool!'
            }
        ],
        likedBy: [],
        tags: ['nature', 'garden']

    }
]

_createStories()

async function query(filterBy = {}) {
    var stories = await storageService.query(STORAGE_KEY)

    /* const { txt, minSpeed, sortField, sortDir } = filterBy
  
      if (txt) {
          const regex = new RegExp(filterBy.txt, 'i')
          stories = stories.filter(story => regex.test(story.vendor) || regex.test(story.description))
      }
      if (minSpeed) {
          stories = stories.filter(story => story.speed >= minSpeed)
      }
      if(sortField === 'vendor'){
          stories.sort((story1, story2) => 
              story1[sortField].localeCompare(story2[sortField]) * +sortDir)
      }
      if(sortField === 'speed'){
          stories.sort((story1, story2) => 
              (story1[sortField] - story2[sortField]) * +sortDir)
      }
      
      stories = stories.map(({ _id, txt, by, tags }) => ({ _id, txt, by, tags }))*/

    return stories
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    let savedStory

    if (story._id) {
        const storyToSave = {...story}
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)

    } else {
        let storyToSave = {...story}
        const user = userService.getLoggedinUser()

        storyToSave._id =  makeId()
        // Later, owner is set by the backend
        storyToSave.by = {byId: user._id, username: user.username}
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
        byId: user._id,
        username: user.username,
        txt
    }
    story.msgs.push(comment)
    await storageService.put(STORAGE_KEY, story)

    return comment
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

/////////////////////////////////////////////////////////

function _createStories() {
    let stories = loadFromStorage(STORAGE_KEY)
    if (!stories || !stories.length) {
        stories = gStories
        saveToStorage(STORAGE_KEY, stories)
    }
}