import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LayoutWithNav } from './cmps/LayoutwithNav.jsx'
import { addStory } from './store/actions/story.actions.js'
import { getEmptyStory } from './services/story/index.js'
import { showSuccessMsg, showErrorMsg } from './services/event-bus.service.js'

// import { Explore } from './pages/Explore.jsx'
// import { AppHeader } from './cmps/AppHeader'
// import { AppFooter } from './cmps/AppFooter'
// import { LoginSignup } from './pages/LoginSignup.jsx'
// import { Login } from './pages/Login.jsx'
// import { Signup } from './pages/Signup.jsx'

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
            showSuccessMsg(`Story added (id: ${savedStory._id})`)
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

                    {/* Routes WITH nav */}

                    <Route element={<LayoutWithNav onAdd={onAddStory} />}>
                        <Route path="/" element={<StoryIndex />} />
                        <Route path="/:username" element={<UserDetails />} />
                         <Route path="/p/:id" element={<StoryDetails />} />
                    </Route>

                    {/* 
                    {/* <Route path="about" element={<AboutUs />}></Route> */}
                    {/* <Route path="review" element={<ReviewIndex />} /> */}
                    {/* <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} /> */}
                    {/* <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route> */}

                </Routes>

                {state?.modal && (
                    <Routes>
                        <Route path="/p/:id" element={<StoryDetails onClose={() => navigate(-1)} />} />
                    </Routes>
                )}

            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


