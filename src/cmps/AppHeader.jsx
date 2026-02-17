import { NavLink } from 'react-router-dom'
import { getIconImg } from '../services/image.service'
import {Search} from './Search'

export function AppHeader() {
	return (
		<header className="app-header">
			<nav>
				<div className="logo">
					<NavLink to="/"><img src="https://res.cloudinary.com/picmeapp/image/upload/v1771332493/kwaxc17xsrjsn0kmdbm2.png" alt="logo" />
					</NavLink>
				</div>

				<Search />
			</nav>
		</header>
	)
}
