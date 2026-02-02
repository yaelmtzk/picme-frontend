import { store } from "../store"
import { loadUsers } from "./user.actions"
import { loadStories } from "./story.actions"
import { userService } from "../../services/user/user.service.remote"
import { SET_USER } from '../reducers/user.reducer'

export async function loadInitialData() {
  try {
    console.log("Loading initial app data...")

    const state = store.getState()

    const users = state.userModule.users
    const stories = state.storyModule.stories
    const loggedinUser = userService.getLoggedinUser()

    if (loggedinUser) store.dispatch(store.dispatch({ type: SET_USER, user: loggedinUser }))

    if (!users || !users.length) {
      await loadUsers()
    }

    if (!stories || !stories.length) {
      await loadStories({})
    }

  } catch (err) {
    console.error("Failed loading initial data:", err)
  }
}
