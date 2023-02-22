import React, { memo } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'

import { NavLink } from '../../../models/nav-link'

import './NavLink.css'


export interface NavLinkProps {
  link: NavLink
}

function NavLinkComponent({ link }: NavLinkProps) {
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


export default memo(NavLinkComponent)
