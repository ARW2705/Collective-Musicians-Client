import React, { memo } from 'react'

import { NavLink } from '../../models/nav-link'

import NavbarComponent  from '../Navigation/Navbar/Navbar'
import NavLinkComponent from '../Navigation/NavLink/NavLink'

import './Header.css'


function Header() {
  const links: NavLink[] = [
    { title: 'Query' }
  ]

  return (
    <header id='app-header'>
      <NavLinkComponent
        link={ {
          title: 'Collective Musicians',
          route: '/',
          customClass: 'home-link'
        } }
      />
      <NavbarComponent links={ links } />
    </header>
  )
}


export default memo(Header)
