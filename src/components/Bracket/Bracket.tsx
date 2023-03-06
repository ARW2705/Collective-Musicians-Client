import React, { memo, ReactNode } from 'react'

import './Bracket.css'


export interface BracketProps {
  children?: ReactNode
  customClass?: string
}

function BracketComponent({ customClass = '', children = <></> }: BracketProps): JSX.Element {
  return (
    <div className={ `bracket-container ${customClass}` }>
      <div className='bracket-svg-container'>
        <svg viewBox="0 0 100 100">
          <path d="
            M 2  2
            C 65 2 
              65 65
              65 100
          "/>
        </svg>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="stretchable-bar"
        >
          <line x1="65" x2="65" y1="0" y2="100"/>
        </svg>
        <svg viewBox="0 0 100 100">
          <path d="
            M 65 0
            C 65 30
              65 45
              90 50
            M 65 100
            C 65 70
              65 55
              90 50
          "/>
        </svg>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="stretchable-bar"
        >
          <line x1="65" x2="65" y1="0" y2="100"/>
        </svg>
        <svg viewBox="0 0 100 100">
          <path d="
            M 2 98
            C 65 98
              65 35
              65 0
          "/>
        </svg>
      </div>
      <div className='bracket-label'>
        { children }
      </div>
    </div>
  )
}


export default memo(BracketComponent)
