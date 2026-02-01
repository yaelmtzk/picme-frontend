import { store } from "../store"
import { loadUsers } from "./user.actions"
import { loadStories } from "./story.actions"

export async function loadInitialData() {
  try {
    console.log("Loading initial app data...")

    const state = store.getState()

    const users = state.userModule.users
    const stories = state.storyModule.stories

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
