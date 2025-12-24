
import { Outlet } from 'react-router-dom'
import { Nav } from './Nav'

export function LayoutWithNav({ onAdd }) {
  return (

    <div className='layout-with-nav main-layout '>
      <Nav onAdd={onAdd} />
        <Outlet />      
    </div>
  )
}
