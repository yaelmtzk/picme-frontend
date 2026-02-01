export const SET_STORIES = 'SET_STORIES'
export const SET_STORY = 'SET_STORY'
export const CLEAR_STORY = 'CLEAR_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'

const initialState = {
    stories: [],
    story: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var stories
    switch (action.type) {
        case SET_STORIES:
            newState = { ...state, stories: action.stories }
            break
        case SET_STORY:
            newState = { ...state, story: action.story }
            break
        case CLEAR_STORY:
            newState = { ...state, story: action.story }
            break
        case REMOVE_STORY:
            const lastRemovedStory = state.stories.find(story => story._id === action.storyId)
            stories = state.stories.filter(story => story._id !== action.storyId)
            newState = { ...state, stories, lastRemovedStory }
            break
        case ADD_STORY:
            newState = { ...state, stories: [...state.stories, action.story] }
            break
        case UPDATE_STORY:
            stories = state.stories.map(story => (story._id === action.story._id) ? action.story : story)

            const updatedStory = state.story && state.story._id === action.story._id
                ? action.story
                : state.story
            newState = { ...state, stories, story: updatedStory }
            break

        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialby
    const story1 = { _id: 'b101', text: 'Story ', imgUrl: 'story.jpg', by: null, comments: [] }
    const story2 = { _id: 'b102', text: 'Story ', imgUrl: 'story.jpg', by: null, comments: [] }

    state = storyReducer(state, { type: SET_STORIES, stories: [story1] })
    console.log('After SET_STORIES:', state)

    state = storyReducer(state, { type: ADD_STORY, story: story2 })
    console.log('After ADD_STORY:', state)

    state = storyReducer(state, { type: UPDATE_STORY, story: { ...story2, txt: 'Good' } })
    console.log('After UPDATE_STORY:', state)

    state = storyReducer(state, { type: REMOVE_STORY, storyId: story2._id })
    console.log('After REMOVE_STORY:', state)

    state = storyReducer(state, { type: SET_STORY, story: story1 })
    console.log('After SET_STORY:', state)

    // const comment = { id: 'm' + parseInt('' + Math.random() * 100), txt: 'Some comment', by: { _id: 'u123', username: 'test' } }
    // state = storyReducer(state, { type: ADD_STORY_COMMENT, storyId: story1._id, comment })
    // console.log('After ADD_STORY_COMMENT:', state)
}

