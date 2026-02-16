import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import { StoryIndex } from './pages/StoryIndex'
import { UserDetails } from './pages/UserDetails'
import { Explore } from './pages/Explore'
import { UserMsg } from './cmps/UserMsg'
import { LayoutWithNav } from './cmps/LayoutWithNav'
import { StoryEntry } from './cmps/StoryEntry'
import { LoginSignUp } from './pages/LoginSignUp'
import { getEmptyStory } from './services/story/index'
import { showSuccessMsg, showErrorMsg } from './services/event-bus.service'
import { loadInitialData } from "./store/actions/app.actions"
import { addStory } from './store/actions/story.actions'

export function RootCmp() {
    const location = useLocation()
    const state = location.state
    const navigate = useNavigate()

    const loggedinUser = useSelector(state => state.userModule.user)

    useEffect(() => {
        if (!loggedinUser) return
        loadInitialData()
    }, [])

    async function onAddStory(txt, imgData) {
        const story = getEmptyStory()
        story.txt = txt
        story.img = imgData
        try {
            await addStory(story)
            showSuccessMsg('Story added')
        } catch (err) {
            showErrorMsg('Cannot add story')
        }
    }

    return (
        <div className="main-container">
            <UserMsg />
            <main>
                <Routes location={state?.modal ? state.backgroundLocation : location}>
                    {!loggedinUser ? (
                        <Route path="/" element={<LoginSignUp />} />
                    ) : (
                        <Route element={<LayoutWithNav onAdd={onAddStory} />}>
                            <Route path="/" element={<StoryIndex />} />
                            <Route path="/:username" element={<UserDetails />} />
                            <Route path="/explore" element={<Explore />} />
                        </Route>
                    )}
                </Routes>

                {state?.modal && (
                    <Routes>
                        <Route path="/p/:id" element={<StoryEntry onClose={() => navigate(-1)} />} />
                    </Routes>
                )}

            </main>
        </div>
    )
}


