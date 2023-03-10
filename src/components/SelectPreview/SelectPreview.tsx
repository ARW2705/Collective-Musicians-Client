import React, { memo, useContext } from 'react'

import { SelectContext } from '../../contexts/Select/SelectContext'

import './SelectPreview.css'


export interface SelectPreviewProps {
  show?: boolean
}

function SelectPreviewComponent({ show = true }: SelectPreviewProps): JSX.Element {
  const { displayTitle, selected, selectAllFlag, options } = useContext(SelectContext)
  if (!show || selected.length === 0) return <></>
  
  return (
    <p className='multi-selections'>
      <span>Selected { displayTitle }</span>
      <span>
      {
        selected
          .map((index: number): string => {
            if (index === selectAllFlag) return 'All Selected'
            if (index >= options.length) return ''

            return options[index].label
          })
          .join(', ')
      }
      </span>
    </p>
  )
}


export default memo(SelectPreviewComponent)
