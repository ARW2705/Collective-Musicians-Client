import React, { memo, useEffect, useState } from 'react'

import { ViewOption } from '../../models/view-option'

import ViewToggle from '../ViewToggle/ViewToggle'

import { buildDataView } from './build-view-element'

import './ToggleableView.css'


export interface ToggleableViewProps<T> {
  displayData: T
  viewOptions: ViewOption[]
}

function ToggleableViewComponent<T extends {[key: string]: any}>({ displayData, viewOptions }: ToggleableViewProps<T>): JSX.Element {
  const [ selectedView, setSelectedView ] = useState<string>(viewOptions[0].name)
  const [ displayDataView, setDisplayDataView ] = useState<JSX.Element>(<></>)
  
  useEffect(() => {
    setDisplayDataView(buildDataView(displayData, selectedView))
  }, [displayData, selectedView])

  return (
    <div className='toggle-container'>
      <div className='data-container'>
        { displayDataView }
      </div>
      <ViewToggle
        options={ viewOptions }
        onChange={ (selection: string): void => setSelectedView(selection) }
      />
    </div>
  )
}


export default memo(ToggleableViewComponent)
