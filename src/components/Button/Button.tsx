import React, { memo, MouseEvent, ReactNode } from 'react'

import './Button.css'


export interface ButtonProps {
  name: string
  children?: ReactNode
  ariaLabel?: string
  customClass?: string
  disabled?: boolean
  flat?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

function ButtonComponent({ customClass = '', onClick: handleOnClick, name, ariaLabel, disabled, flat, children }: ButtonProps): JSX.Element {  
  return (
    <button
      aria-label={ ariaLabel || name }
      className={`app-button ${flat ? 'flat-button' : ''} ${customClass}`}
      disabled={ disabled }
      name={ name }
      onClick={ handleOnClick }
    >
      { children || name }
    </button>
  )
}


export default memo(ButtonComponent)
