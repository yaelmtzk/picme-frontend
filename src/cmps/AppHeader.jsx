import { NavLink } from 'react-router-dom'
import { getIconImg } from '../services/image.service.js'
import {Search} from './Search.jsx'

export function AppHeader() {
	return (
		<header className="app-header">
			<nav>
				<div className='logo'>
					<NavLink to="/"><img src={getIconImg('picme-logo.png')} alt="logo" />
					</NavLink>
				</div>

				<Search />
			</nav>
		</header>
	)
}
