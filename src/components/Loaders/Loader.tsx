import React, { memo } from 'react'

import { Loader } from '../../models/loader'

import Overlay from '../Overlay/Overlay'

import BarSpinner from './LoaderComponents/BarSpinner/BarSpinner'
import './Loader.css'


export interface LoaderProps extends Loader {
  show: boolean
  type: string
  color?: string
  blocking?: boolean
  customClass?: string
  overlay?: boolean
}

function LoaderComponent({ show, type, color = '', blocking = false, customClass = '' }: LoaderProps): JSX.Element {
  if (!show) return <></>

  let loader: JSX.Element
  switch (type.toLowerCase()) {
    case 'bar':
      loader = <BarSpinner color={ color } />
      break
    default:
      throw new Error(`Invalid loader type: ${type}`)
  }

  const loaderElement: JSX.Element = (
    <div className={ `loader-container ${customClass}` }>
      { loader }
    </div>
  )

  if (!blocking) return loaderElement
  
  return (
    <Overlay blocking={ blocking }>
      { loaderElement }
    </Overlay>
  )
}


export default memo(LoaderComponent)
