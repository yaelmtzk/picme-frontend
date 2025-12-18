import React from 'react'
import { Routes, Route } from 'react-router'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
// import { HomePage } from './pages/HomePage.jsx'
// import {AboutUs} from './pages/AboutUs.jsx'

// import { Explore } from './pages/Explore.jsx'

// import { AppHeader } from './cmps/AppHeader'
// import { AppFooter } from './cmps/AppFooter'

// import { LoginSignup } from './pages/LoginSignup.jsx'
// import { Login } from './pages/Login.jsx'
// import { Signup } from './pages/Signup.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            {/* <AppHeader /> */}
            <UserMsg />

            <main>
                <Routes>
                    <Route path="" element={<StoryIndex />} />
                    <Route path="story/:storyId" element={<StoryDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />

                    {/* <Route path="" element={<HomePage />} /> */}
                    {/* <Route path="about" element={<AboutUs />}></Route> */}
                    {/* <Route path="review" element={<ReviewIndex />} /> */}
                    {/* <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} /> */}
                    {/* <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route> */}
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


