import React, { memo, MouseEvent } from 'react'

import './Button.css'


export interface ButtonProps {
  name: string
  ariaLabel?: string
  customClass?: string
  disabled?: boolean
  flat?: boolean
  innerElement?: JSX.Element
  innerText?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

function ButtonComponent({ customClass = '', onClick: handleOnClick, name, ariaLabel, disabled, flat, innerElement, innerText }: ButtonProps): JSX.Element {  
  return (
    <button
      aria-label={ ariaLabel || name }
      className={`app-button ${flat ? 'flat-button' : ''} ${customClass}`}
      disabled={ disabled }
      name={ name }
      onClick={ handleOnClick }
    >
      { innerElement || innerText || name }
    </button>
  )
}


export default memo(ButtonComponent)
