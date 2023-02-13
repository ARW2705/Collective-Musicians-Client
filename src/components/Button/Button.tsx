import React, { MouseEvent } from 'react'

import './Button.css'


export interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  innerText: string
  innerElement?: JSX.Element
  ariaLabel?: string
  name?: string
  customClass?: string
  isFlat?: boolean
  isDisabled?: boolean
}

function ButtonComponent({ onClick: handleOnClick, innerText, innerElement, ariaLabel, name, isFlat, isDisabled, customClass }: ButtonProps): JSX.Element {  
  return (
    <button
      aria-label={ ariaLabel || innerText }
      className={`app-button ${isFlat ? 'flat-button' : ''} ${customClass}`}
      disabled={ isDisabled }
      name={ name }
      onClick={ handleOnClick }
    >
      { innerElement || innerText }
    </button>
  )
}


export default React.memo(ButtonComponent)
