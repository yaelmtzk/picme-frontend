import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import { AppHeader } from './cmps/AppHeader.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LayoutWithNav } from './cmps/LayoutwithNav.jsx'
import { StoryEntry } from './cmps/StoryEntry.jsx'
import { addStory } from './store/actions/story.actions.js'
import { getEmptyStory } from './services/story/index.js'
import { showSuccessMsg, showErrorMsg } from './services/event-bus.service.js'


export function RootCmp() {

    const location = useLocation()
    const state = location.state
    const navigate = useNavigate()

    async function onAddStory(txt, imgUrl) {
        const story = getEmptyStory()
        story.txt = txt
        story.imgUrl = imgUrl

        try {
            const savedStory = await addStory(story)
            showSuccessMsg('Story added')
        } catch (err) {
            showErrorMsg('Cannot add story')
        }
    }

    return (
        <div className="main-container">
            {/* <AppHeader /> */}
            <UserMsg />
            <main>
                <Routes location={state?.modal ? state.backgroundLocation : location}>

                    <Route element={<LayoutWithNav onAdd={onAddStory} />}>
                        <Route path="/" element={<StoryIndex />} />
                        <Route path="/:username" element={<UserDetails />} />
                         <Route path="/p/:id" element={<StoryEntry />} />
                    </Route>

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


