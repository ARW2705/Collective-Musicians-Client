import React, { memo, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import './Overlay.css'


export interface OverlayComponentProps {
  children: ReactNode
  blocking: boolean
}

function OverlayComponent({ children: InnerComponent, blocking }: OverlayComponentProps): JSX.Element {
  return createPortal(
    <div className={ `overlay-container ${blocking ? 'blocking' : ''}`}>
      { InnerComponent }
    </div>,
    document.querySelector('#overlay-root') as Element
  )
}


export default memo(OverlayComponent)
