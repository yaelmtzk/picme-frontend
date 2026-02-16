import { useState } from 'react'
import { Login } from '../cmps/Login'
import { Signup } from '../cmps/Signup'

export function LoginSignUp() {
    const [isSignup, setIsSignup] = useState(false)

    return (
        <main className="login-signup-section">

            <section className="left-panel-login-signup">
                <img className="picme-icon"
                    src="https://res.cloudinary.com/picmeapp/image/upload/v1767039777/bf4lfsbmepluxeceb1jq.png" alt="picme-icon" />

                <h1>See everyday moments from <br />
                    your
                    <span> close friends</span>.
                </h1>

                <img className="loginsignup-left-png"
                    src="https://res.cloudinary.com/picmeapp/image/upload/v1770919026/oz1ricao8badcjngoutd.png" alt="" />
            </section>

            <section className="login-signup-main">

                {isSignup
                    ? <Signup onSwitch={() => setIsSignup(false)} />
                    : <Login onSwitch={() => setIsSignup(true)} />
                }
            </section>
        </main>
    )
}