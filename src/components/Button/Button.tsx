import React, { MouseEvent } from 'react'

import './Button.css'


export interface ButtonAttributes {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  innerText: string
  innerElement?: JSX.Element
  ariaLabel?: string
  name?: string
  customClass?: string
  isDisabled?: boolean
}

function ButtonComponent({ onClick: handleOnClick, innerText, innerElement, ariaLabel, name, isDisabled, customClass }: ButtonAttributes): JSX.Element {  
  return (
    <button
      aria-label={ ariaLabel || innerText }
      className={`app-button ${customClass}`}
      disabled={ isDisabled }
      name={ name }
      onClick={ handleOnClick }
    >
      { innerElement || innerText }
    </button>
  )
}


export default React.memo(ButtonComponent)
