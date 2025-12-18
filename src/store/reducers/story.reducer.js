export const SET_STORYS = 'SET_STORYS'
export const SET_STORY = 'SET_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_STORY_COMMENT = 'ADD_STORY_COMMENT'

const initialState = {
    storys: [],
    story: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var storys
    switch (action.type) {
        case SET_STORYS:
            newState = { ...state, storys: action.storys }
            break
        case SET_STORY:
            newState = { ...state, story: action.story }
            break
        case REMOVE_STORY:
            const lastRemovedStory = state.storys.find(story => story._id === action.storyId)
            storys = state.storys.filter(story => story._id !== action.storyId)
            newState = { ...state, storys, lastRemovedStory }
            break
        case ADD_STORY:
            newState = { ...state, storys: [...state.storys, action.story] }
            break
        case UPDATE_STORY:
            storys = state.storys.map(story => (story._id === action.story._id) ? action.story : story)
            newState = { ...state, storys }
            break
        case ADD_STORY_COMMENT:
            if (action.comment && state.story) {
                newState = { ...state, story: { ...state.story, comments: [...state.story.comments || [], action.comment] } }
                break
            }
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialby
    const story1 = { _id: 'b101', text: 'Story ', imgUrl: 'story.jpg' ,by: null, comments: [] }
    const story2 = { _id: 'b102', text: 'Story ', imgUrl: 'story.jpg' ,by: null, comments: [] }

    state = storyReducer(state, { type: SET_STORYS, storys: [story1] })
    console.log('After SET_STORYS:', state)

    state = storyReducer(state, { type: ADD_STORY, story: story2 })
    console.log('After ADD_STORY:', state)

    state = storyReducer(state, { type: UPDATE_STORY, story: { ...story2, txt: 'Good' } })
    console.log('After UPDATE_STORY:', state)

    state = storyReducer(state, { type: REMOVE_STORY, storyId: story2._id })
    console.log('After REMOVE_STORY:', state)

    state = storyReducer(state, { type: SET_STORY, story: story1 })
    console.log('After SET_STORY:', state)

    const comment = { id: 'm' + parseInt('' + Math.random() * 100), txt: 'Some comment', by: { _id: 'u123', username: 'test' } }
    state = storyReducer(state, { type: ADD_STORY_COMMENT, storyId: story1._id, comment })
    console.log('After ADD_STORY_COMMENT:', state)
}

