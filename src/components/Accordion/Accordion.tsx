import React, { memo, ReactNode } from 'react'

import './Accordion.css'


export interface AccordionProps {
  children: ReactNode
  show: boolean
  customClass?: string
}

function AccordionComponent({ children, show, customClass = '' }: AccordionProps): JSX.Element {
  return (
    <div className={ `accordion-container ${customClass} ${show ? 'expand' : 'collapse'}` }>
      { children }
    </div>
  )
}


export default memo(AccordionComponent)
