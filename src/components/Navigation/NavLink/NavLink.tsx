import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'

import { NavLink } from '../../../models/interfaces'

import './NavLink.css'


function NavLinkComponent(link: NavLink) {
  const { title, route, customClass = '' } = link
  const name: string = title.toLowerCase()
  console.log(title, route, customClass, name)
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
