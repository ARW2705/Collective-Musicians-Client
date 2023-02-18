import React, { useEffect, useState } from 'react'

import { ViewOption } from '../../models/interfaces'

import Button from '../Button/Button'

import './ViewToggle.css'


function buildViewOptionButtons(options: ViewOption[], activeOption: string, setToggle: React.Dispatch<React.SetStateAction<string>>): JSX.Element[] {
  return options.map((option: ViewOption): JSX.Element => {
    const { name, icon } = option

    return (
      <Button
        name={ name }
        innerText={ name }
        innerElement={ icon }
        customClass={ `view-option ${name === activeOption ? 'active' : ''}` }
        onClick={ () => setToggle(name) }
        flat
      />
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


export default React.memo(ViewToggleComponent)
