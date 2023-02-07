import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'

import { NavLink } from '@models/nav-link'

import './NavLink.css'


function NavLinkComponent(link: NavLink) {
  const { title, route, customClass = '' } = link
  const name: string = title.toLowerCase()

  return (
    <div className={ `nav-link ${customClass}` }>
      <RouterNavLink
        key={ name }
        to={ route || `/${name}` }
        aria-labelledby={ `nav-${name}` }
      >
        <span id={ `nav-${name}` }>{ title }</span>
      </RouterNavLink>
    </div>
  )
}


export default NavLinkComponent
