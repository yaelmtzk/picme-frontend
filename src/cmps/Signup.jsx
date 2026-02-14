import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signup } from '../store/actions/user.actions'
import { userService } from '../services/user'

export function Signup({ onSwitch }) {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())

    function clearState() {
        setCredentials({
            username: '',
            password: '',
            fullname: '',
            imgUrl: 'https://res.cloudinary.com/picmeapp/image/upload/v1770939998/owjl9mvyi7qnnnh0253z.svg'
        })
    }

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await signup(credentials)
        clearState()
    }

    const isDisabled = !credentials.username.trim()
        || !credentials.password.trim()
        || !credentials.fullname.trim()

    return (
        <section className='signup-section'>

            <img className="picme-icon"
                src="https://res.cloudinary.com/picmeapp/image/upload/v1767039777/bf4lfsbmepluxeceb1jq.png" alt="picme-icon" />

            <form className="signup-form" onSubmit={onSignup}>
                <h3>Signup to Picme</h3>
                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Fullname"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button disabled={isDisabled}>Signup</button>

                <div className='login-link'>Already a member?
                    <span onClick={onSwitch}> Login</span>
                </div>
            </form>
        </section>

    )
}