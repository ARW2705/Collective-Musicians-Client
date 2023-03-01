import React, { memo, useEffect, useState } from 'react'

import { ViewOption } from '../../models/view-option'

import Button from '../Button/Button'

import './ViewToggle.css'


function buildViewOptionButtons(options: ViewOption[], activeOption: string, setToggle: React.Dispatch<React.SetStateAction<string>>): JSX.Element[] {
  return options.map((option: ViewOption, index: number): JSX.Element => {
    const { name, icon } = option

    return (
      <Button
        key={ index }
        name={ name }
        customClass={ `view-option ${name === activeOption ? 'active' : ''}` }
        onClick={ () => setToggle(name) }
        flat
      >
        { icon || name }
      </Button>
    )
  })
}

export interface ViewToggleProps {
  options: ViewOption[]
  onChange: (selection: string) => void
}

function ViewToggleComponent({ options, onChange }: ViewToggleProps): JSX.Element {
  if (!options || options.length === 0) throw new Error('ViewToggle expects view options, received 0')
  
  const [ toggle, setToggle ] = useState<string>(options[0].name)
  const [ toggleOptions, setToggleOptions ] = useState<JSX.Element[]>([])

  useEffect(() => {
    onChange(toggle)
    setToggleOptions(buildViewOptionButtons(options, toggle, setToggle))
  }, [onChange, toggle, options])

  return (
    <div className='view-toggle-container'>
      { toggleOptions }
    </div>
  )
}


export default memo(ViewToggleComponent)
