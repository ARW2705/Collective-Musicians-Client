import React, { memo } from 'react'

import { NavLink } from '../../../models/nav-link'

import NavLinkComponent from '../NavLink/NavLink'

import './Navbar.css'


export interface NavbarProps {
  links: NavLink[]
}

function NavbarComponent({ links = [] }: NavbarProps) {
  return (
    <nav className='navbar'>
      { links.map((link, index) => <NavLinkComponent key={ index } link={ link } />) }
    </nav>
  )
}


export default memo(NavbarComponent)
