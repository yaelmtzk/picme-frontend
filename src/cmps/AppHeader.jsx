import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { getIconImg } from '../services/image.service.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	// async function onLogout() {
	// 	try {
	// 		await logout()
	// 		navigate('/')
	// 		showSuccessMsg(`Bye now`)
	// 	} catch (err) {
	// 		showErrorMsg('Cannot logout')
	// 	}
	// }

	return (
		<header className="app-header">
			<nav>
				<div className='logo'>
					<NavLink to="/"><img src={getIconImg('picme-logo.png')} alt="logo" />
					</NavLink>
				</div>

				<div className= 'search-bar-main'>

					<div className='search-bar-mobile'>

						<svg
							fill="currentColor"
							viewBox="0 0 24 24" >
							<path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
							<line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
						</svg>

						<input type="text" placeholder='Search' />

					</div>

					<div className='nav-btn'><img src={getIconImg('like')} alt="like" /></div>

				</div>

			</nav>
		</header>
	)
}
