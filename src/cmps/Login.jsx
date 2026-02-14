import { useState } from 'react'
import { login } from '../store/actions/user.actions'

export function Login({ onSwitch }) {
    const [credentials, setCredentials] = useState({
        username: 'shira.avt',
        password: 'shira1'
    })

    async function onLogin(ev) {
        ev.preventDefault()
        if (!credentials.username || !credentials.password) return

        await login(credentials)
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    const isDisabled = !credentials.username.trim() || !credentials.password.trim()

    return (
        <section className='login-section'>

            <img className="picme-icon"
                src="https://res.cloudinary.com/picmeapp/image/upload/v1767039777/bf4lfsbmepluxeceb1jq.png" alt="picme-icon" />

            <form className="login-form" onSubmit={onLogin}>
                <h3>Log into Picme</h3>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    autoComplete="username"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                />
                <button disabled={isDisabled}>Log in</button>

                <div className='signup-link'>New user?
                    <span onClick={onSwitch}> Sign up</span>
                </div>
            </form>
        </section>
    )
}