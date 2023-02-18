import React, { MouseEvent } from 'react'

import './Button.css'


export interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  name: string
  innerText?: string
  innerElement?: JSX.Element
  ariaLabel?: string
  customClass?: string
  flat?: boolean
  disabled?: boolean
}

function ButtonComponent({ onClick: handleOnClick, innerText, innerElement, ariaLabel, name, flat, disabled, customClass }: ButtonProps): JSX.Element {  
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


export default React.memo(ButtonComponent)
