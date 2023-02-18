import React, { MouseEvent, useEffect, useRef, useState } from 'react'

import { SelectOption, ValidatorFn, ValidationError } from '../../models/interfaces'
import { validate } from '../../shared/validation/validate'

import Button from '../Button/Button'

import './Select.css'


export interface SelectProps<T> {
  title: string
  options: SelectOption<T>[]
  onChange: (values: T[], errors: ValidationError<T>) => void
  validators?: ValidatorFn<T>[]
  customClass?: string
  multi?: boolean
  rowLimit?: number
  openDirection?: 'up' | 'center' | 'down'
  reset?: boolean
}

function SelectComponent<T>({ title, options, onChange: handleOnChange, validators = [], customClass = '', multi, rowLimit = 8, openDirection = 'down', reset = false }: SelectProps<T>): JSX.Element {
  const [ displayTitle, setDisplayTitle ] = useState(title)
  const [ showList, setShowList ] = useState(false)
  const [ selected, setSelected ] = useState<number[]>([])
  const [ errorState, setErrorState ] = useState<{ errors: ValidationError<T>, show: boolean }>({
    errors: {},
    show: false
  })
  const onInit = useRef<boolean>(true)
  const colCount: number = Math.ceil(options.length / rowLimit)

  useEffect(() => {
    if (onInit.current) {
      onInit.current = false
      return
    }
    setSelected([])
    setErrorState({ errors: {}, show: false })
  }, [reset])

  useEffect(() => {
    if (!selected.length || !options.length) {
      setDisplayTitle(title)
      return
    }

    if (multi) {
      handleOnChange(selected.map((index: number): T => {
        const { label, value }: SelectOption<T> = options[index]
        return (value ?? label) as T
      }), errorState.errors)
    } else {
      const { label, value }: SelectOption<T> = options[selected[0]]
      handleOnChange([(value ?? label) as T], errorState.errors)
      setDisplayTitle(label)
    }
  }, [title, selected, multi, options, handleOnChange, errorState])

  const handleClick = (event: MouseEvent<HTMLUListElement>) => {
    const targetIndex: number = parseInt((event.target as HTMLUListElement).getAttribute('data-index') || '')
    if (!isNaN(targetIndex)) {
      setErrorState({ errors: {}, show: false })
      setSelected(multi ? [...selected, targetIndex] : [targetIndex])
    } else {
      setErrorState({ errors: validate<T>(null, validators), show: false })
    }
  }

  return (
    <div className={ `app-select ${openDirection !== 'center' ? 'set-position' : ''} ${customClass}` }>
      <Button
        name='open-select'
        onClick={ () => setShowList(true) }
        innerText={ displayTitle }
        flat
      />
      {
        showList && 
        <ul
          className={ `open-${openDirection}` }
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
