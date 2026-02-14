import { userService } from '../../services/user'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const CLEAR_WATCHED_USER = 'CLEAR_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const CLEAR_USERS = 'CLEAR_USERS'
export const SET_SEARCH_USERS = 'SET_SEARCH_USERS'
export const CLEAR_SEARCH_USERS = 'CLEAR_SEARCH_USERS '

const initialState = {
    user: userService.getLoggedinUser() || null,
    watchedUser: null,
    users: [],
    searchUsers: [],
}

export function userReducer(state = initialState, action) {
    var newState = state

    switch (action.type) {

        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case CLEAR_WATCHED_USER:
            newState = { ...state, watchedUser: null }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)}
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case CLEAR_USERS:
            newState = { ...state, users: [] }
            break
        case SET_SEARCH_USERS:
            newState = { ...state, searchUsers: action.searchUsers }
            break
        case CLEAR_SEARCH_USERS:
            newState = { ...state, searchUsers: [] }
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
