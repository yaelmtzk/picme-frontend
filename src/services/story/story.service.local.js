
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
        imgUrl: 'https://unsplash.com/photos/a-vertical-shot-of-the-road-in-dades-gorges-mountains-in-morocco-during-daylight-7dVCZITFodk',
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
        imgUrl: 'https://unsplash.com/photos/vegetable-dish-on-black-cooking-pan-w3awZjfVa6w',
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
        imgUrl: 'bird.jpg',
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
    var storys = await storageService.query(STORAGE_KEY)

    /* const { txt, minSpeed, sortField, sortDir } = filterBy
  
      if (txt) {
          const regex = new RegExp(filterBy.txt, 'i')
          storys = storys.filter(story => regex.test(story.vendor) || regex.test(story.description))
      }
      if (minSpeed) {
          storys = storys.filter(story => story.speed >= minSpeed)
      }
      if(sortField === 'vendor'){
          storys.sort((story1, story2) => 
              story1[sortField].localeCompare(story2[sortField]) * +sortDir)
      }
      if(sortField === 'speed'){
          storys.sort((story1, story2) => 
              (story1[sortField] - story2[sortField]) * +sortDir)
      }
      
      storys = storys.map(({ _id, txt, by, tags }) => ({ _id, txt, by, tags }))*/

    return storys
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    var savedStory
    if (story._id) {
        const storyToSave = {
            _id: story._id,
            txt: story.txt,
        }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        const storyToSave = {
            txt: story.txt,
            imgUrl: story.imgUrl,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
        }
        savedStory = await storageService.post(STORAGE_KEY, storyToSave)
    }
    return savedStory
}

async function addStoryComment(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    story.msgs.push(msg)
    await storageService.put(STORAGE_KEY, story)

    return msg
}

/////////////////////////////////////////////////////////

function _createStories() {
    let stories = loadFromStorage(STORAGE_KEY)
    if (!stories || !stories.length) {
        stories = gStories
        saveToStorage(STORAGE_KEY, stories)
    }
}