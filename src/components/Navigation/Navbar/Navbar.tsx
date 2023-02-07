import React from 'react'

import { NavLink } from '@models/nav-link'
import NavLinkComponent from '../NavLink/NavLink'

import './Navbar.css'


function NavbarComponent({ links = [] }: { links: NavLink[] }) {
  return (
    <nav className='navbar'>
      {
        links.map(link => <NavLinkComponent { ...link } />)
      }
    </nav>
  )
}


export default NavbarComponent
