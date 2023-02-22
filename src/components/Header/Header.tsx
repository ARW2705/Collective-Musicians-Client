import React, { memo } from 'react'

import { NavLink } from '../../models/nav-link'

import NavbarComponent from '../Navigation/Navbar/Navbar'

import './Header.css'


function Header() {
  const links: NavLink[] = [
    { title: 'Query' }
  ]

  return (
    <header id='app-header'>
      <h1>Collective Musicians</h1>
      <NavbarComponent links={ links } />
    </header>
  )
}


export default memo(Header)
