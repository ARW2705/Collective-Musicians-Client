import React, { MouseEvent, useEffect, useState } from 'react'

import { SelectOption } from '../../models/interfaces'
import Button from '../Button/Button'

import './Select.css'


export interface SelectProps<T> {
  title: string
  options: SelectOption<T>[]
  onChange: (values: T[]) => void
  customClass?: string
  multi?: boolean
}

function SelectComponent<T>({ title, options, onChange: handleOnChange, customClass = '', multi }: SelectProps<T>): JSX.Element {
  const [ displayTitle, setDisplayTitle ] = useState(title)
  const [ showList, setShowList ] = useState(false)
  const [ selected, setSelected ] = useState<number[]>([])
  const rowLimit: number = 8
  const colCount: number = Math.ceil(options.length / rowLimit)

  useEffect(() => {
    if (!selected.length || !options.length) return

    if (multi) {
      handleOnChange(selected.map((index: number): T => {
        const { label, value }: SelectOption<T> = options[index]
        return (value ?? label) as T
      }))
    } else {
      const { label, value }: SelectOption<T> = options[selected[0]]
      handleOnChange([(value ?? label) as T])
      setDisplayTitle(label)
    }
  }, [selected, multi, options, handleOnChange])

  const handleClick = (event: MouseEvent<HTMLUListElement>) => {
    const targetIndex: number = parseInt((event.target as HTMLUListElement).getAttribute('data-index') || '')
    if (!isNaN(targetIndex)) {
      setSelected(multi ? [...selected, targetIndex] : [targetIndex])
    }
  }

  return (
    <div className={ `app-select ${customClass}` }>
      <Button
        onClick={ () => setShowList(true) }
        innerText={ displayTitle }
        isFlat
      />
      {
        showList && 
        <ul
          style={ { gridTemplateColumns: `repeat(${colCount}, 1fr)` } }
          onMouseLeave={ () => setShowList(false) }
          onClick={ handleClick }
        >
          {
            options.map((option: SelectOption<T>, index: number): JSX.Element => (
              <li key={ index } data-index={ index } className={`select-option ${selected.includes(index) ? 'active' : ''}`}>
                { option.label }
              </li>
            ))
          }
        </ul>
      }
    </div>
  )
}


export default SelectComponent
