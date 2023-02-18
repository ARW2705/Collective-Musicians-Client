import React from 'react'

import './KeyVal.css'


export interface KeyValProps {
  pair: {[key: string]: string | number | boolean}
  customClass?: string
}

function KeyValComponent({ pair, customClass = '' }: KeyValProps): JSX.Element {
  const key: string = Object.keys(pair)[0] // intended to be a single pair, only first pair will be used
  const value: string | number | boolean = pair[key]

  return (
    <div className={ `keyval ${customClass}` }>
      <span>{ key }</span>
      <span>{ value }</span>
    </div>
  )
}


export default React.memo(KeyValComponent)
