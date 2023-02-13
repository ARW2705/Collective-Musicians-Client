import React from 'react'

import { NavLink } from '../../../models/interfaces'
import NavLinkComponent from '../NavLink/NavLink'

import './Navbar.css'


function NavbarComponent({ links = [] }: { links: NavLink[] }) {
  return (
    <nav className='navbar'>
      {
        links.map((link, index) => <NavLinkComponent key={ index } { ...link } />)
      }
    </nav>
  )
}


export default NavbarComponent
