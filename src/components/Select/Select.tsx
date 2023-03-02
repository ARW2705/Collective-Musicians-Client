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
  reset?: boolean
  validators?: ValidatorFn<T>[]
  grid?: boolean
}

function SelectComponent<T>({ customClass = '', validators = [], reset = false, grid = false, multi = false, onChange: handleOnChange, options, title }: SelectProps<T>): JSX.Element {
  const [ displayTitle, setDisplayTitle ] = useState(title)
  const [ showList, setShowList ] = useState(false)
  const [ selected, setSelected ] = useState<number[]>([])
  const [ selectedPreview, setSelectedPreview ] = useState<JSX.Element>(<></>)
  const [ errorState, setErrorState ] = useState<{ errors: ValidationError<T>, show: boolean }>({ errors: {}, show: false })
  const onInit = useRef<boolean>(true)
  const previousSelected = useRef<number[]>([])
  const colCount: number = grid ? Math.ceil(Math.sqrt(options.length)) : 1
  const selectAllFlag: number = options.length

  useEffect(() => {
    if (onInit.current) {
      onInit.current = false
      return
    }

    setSelected([])
    setErrorState({ errors: {}, show: false })
  }, [reset])

  useEffect(() => {
    if (JSON.stringify(selected) === JSON.stringify(previousSelected.current)) return

    previousSelected.current = selected
    if (multi) {
      let selections: T[] = []
      if (selected.includes(selectAllFlag)) {
        selections = options.map(({ label, value }: SelectOption<T>): T => ((value ?? label) as T))
      } else {
        selections = selected.map((index: number): T => {
          const { label, value }: SelectOption<T> = options[index]
          return (value ?? label) as T
        })
      }

      handleOnChange(selections, errorState.errors)
    } else if (selected.length > 0) {
      const { label, value }: SelectOption<T> = options[selected[0]]
      handleOnChange([(value ?? label) as T], errorState.errors)
      setDisplayTitle(label)
    } else {
      setDisplayTitle(title)
    }
  }, [selected, multi, options, handleOnChange, errorState, title, selectAllFlag])

  useEffect(() => {
    if (!multi) return

    setSelectedPreview(
      selected.length === 0
      ? <></>
      : <p className='multi-selections'>
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
  }, [selected, options, multi, displayTitle, selectAllFlag])

  const handleClick = (event: MouseEvent<HTMLUListElement>) => {
    const targetIndex: number = parseInt((event.target as HTMLUListElement).getAttribute('data-index') || '')
    if (isNaN(targetIndex)) return

    let errors: ValidationError<T>
    let selections: number[] = selected
    if (multi) {
      const currentSelectedIndex: number = selected.findIndex(selectedIndex => selectedIndex === targetIndex)
      if (currentSelectedIndex === -1) {
        selections = [...selections, targetIndex]
      } else {
        selections = [...selected.slice(0, currentSelectedIndex), ...selected.slice(currentSelectedIndex + 1, selected.length)]
      }
      errors = validate<T>(selections as T, validators)
    } else {
      errors = validate<T>([targetIndex] as T, validators)
      selections = [targetIndex]
    }

    setSelected(selections)
    setErrorState({ errors, show: Object.keys(errors).length > 0 })
    setShowList(multi)
  }

  return (
    <div className={ `app-select ${customClass}` }>
      <Button
        name='open-select'
        onClick={ () => setShowList(true) }
        flat
      >
        { displayTitle }
      </Button>
      {
        showList && 
        <ul
          style={ { gridTemplateColumns: `repeat(${colCount}, 1fr)` } }
          onMouseLeave={ () => setShowList(false) }
          onClick={ handleClick }
        >
          {
            options.map((option: SelectOption<T>, index: number): JSX.Element => (
              <li
                key={ index }
                data-index={ index }
                className={`select-option ${selected.includes(index) ? 'active' : ''}`}
              >
                { option.label }
              </li>
            ))
          }
          {
            multi &&
            <li
              data-index={ selectAllFlag }
              className={`select-option ${selected.includes(selectAllFlag) ? 'active' : ''}`}
            >
              Select All
            </li>
          }
        </ul>
      }
      { selectedPreview }
    </div>
  )
}


export default SelectComponent
