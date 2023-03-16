import React, { memo } from 'react'

import { Loader } from '../../../../models/loader'

import './BarSpinner.css'


export interface BarSpinnerProps extends Loader {}

function BarSpinnerComponent({ color = '', customClass = '', speed = 1000, size = 150 }: BarSpinnerProps): JSX.Element {
  const lineCount: number = 8;
  const degreeSegment: number = 360 / lineCount
  
  return (
    <div className={ `bar-spinner-container ${customClass}` }>
      <svg
        viewBox='0 0 100 100'
        className={ `${color}` }
      >
        {
          Array.from(Array(lineCount), (_: any, index: number): JSX.Element => {
            return (
              <line
                key={ index }
                x1='50' y1='5' x2='50' y2='40'
                style={ { transform: `rotate(${index * degreeSegment}deg)` } }
              />
            )
          })
        }
      </svg>
    </div>
  )
}

export default memo(BarSpinnerComponent)
