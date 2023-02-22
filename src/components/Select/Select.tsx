import React, { MouseEvent, useEffect, useRef, useState } from 'react'

import { SelectOption    } from '../../models/select-option'
import { ValidatorFn     } from '../../models/validator-function'
import { ValidationError } from '../../models/validation-error'
import { validate        } from '../../shared/validation/validate'

import Button from '../Button/Button'

import './Select.css'


export interface SelectProps<T> {
  onChange: (values: T[], errors: ValidationError<T>) => void
  options: SelectOption<T>[]
  title: string
  customClass?: string
  multi?: boolean
  openDirection?: 'up' | 'center' | 'down'
  reset?: boolean
  rowLimit?: number
  validators?: ValidatorFn<T>[]
}

function SelectComponent<T>({ customClass = '', openDirection = 'down', rowLimit = 8, validators = [], reset = false, onChange: handleOnChange, multi, options, title }: SelectProps<T>): JSX.Element {
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
