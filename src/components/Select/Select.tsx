import React, { MouseEvent, useEffect, useState } from 'react'

import { SelectOption } from '../../models/interfaces'

import './Select.css'


export interface SelectAttributes {
  title: string
  options: SelectOption[]
  onChange: () => {}
  customClass?: string
  multi?: boolean
}

function SelectComponent({ title, options, onChange, customClass, multi }: SelectAttributes): JSX.Element {
  const [ displayTitle, setDisplayTitle ] = useState(title)
  const [ showList, setShowList ] = useState(false)

  const optionList = options.map((option: SelectOption, index: number): JSX.Element => {
    return (
      <li key={ index } className='select-option'>
        { option.label }
      </li>
    )
  })

  useEffect(() => {
    setDisplayTitle(title)
  }, [title])

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log(event)
  }

  return (
    <div
      className={ `app-select ${customClass}` }
      onMouseLeave={ () => setShowList(false) }
      onClick={ handleClick }
    >
      <h3>{ displayTitle }</h3>
      {
        showList && <ul>{ optionList }</ul>
      }
    </div>
  )
}


export default SelectComponent
