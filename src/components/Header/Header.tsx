import React from 'react'

import { NavLink } from '../../models/interfaces'
import NavbarComponent from '../Navigation/Navbar/Navbar'

import './Header.css'


function Header() {
  const links: NavLink[] = [
    { title: 'Organizations' },
    { title: 'Venues'        },
    { title: 'Philanthropy'  }
  ]

  return (
    <header id='app-header'>
      <h1>Collective Musicians</h1>
      <NavbarComponent links={ links } />
    </header>
  )
}


export default React.memo(Header)
