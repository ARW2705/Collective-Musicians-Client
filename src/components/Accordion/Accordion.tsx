import React from 'react'

import './Accordion.css'


export interface AccordionProps {
  element: JSX.Element | JSX.Element[]
  show: boolean
  customClass?: string
}

function AccordionComponent({ element, show, customClass = '' }: AccordionProps): JSX.Element {
  return (
    <div className={ `accordion-container ${customClass} ${show ? 'expand' : 'collapse'}` }>
      { element }
    </div>
  )
}


export default React.memo(AccordionComponent)
