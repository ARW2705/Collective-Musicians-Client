import React, { useEffect, useRef, useState } from 'react'

import { SelectContext   } from '../../contexts/select'
import { ErrorState      } from '../../models/error-state'
import { SelectOption    } from '../../models/select-option'
import { ValidatorFn     } from '../../models/validator-function'
import { ValidationError } from '../../models/validation-error'
import { remove          } from '../../shared/remove-at'
import { compare         } from '../../shared/shallow-compare'
import { validate        } from '../../shared/validation/validate'

import Button        from '../Button/Button'
import SelectOptions from '../SelectOptions/SelectOptions'
import SelectPreview from '../SelectPreview/SelectPreview'

import './Select.css'


/**
 * Generate an array of values to be accepted as the user's selections
 * 
 * @param selected - array of indices selected by the user
 * @param selectAllFlag - index that indicates all values should be selected
 * @param options - array of select options
 * @return array of normalized user selected values
 */
function getMultiUserSelections<T>(selected: number[], selectAllFlag: number, options: SelectOption<T>[]): T[] {
  if (selected[0] === selectAllFlag) {
    return options.map(({ label, value }: SelectOption<T>): T => ((value ?? label) as T))
  }

  return selected.map((index: number): T => {
    const { label, value }: SelectOption<T> = options[index]
    return (value ?? label) as T
  })
}

/**
 * Generate an array of selected option indices based on 
 * 
 * @param selected - the currently selected indices
 * @param targetIndex - the index to toggle; if the index is the select all flag, only select that index;
 *                      if not the select all flag, add the index if it doesn't exist, otherwise add to the array
 * @param selectAllFlag - index that denotes if all options should be selected
 * @return array of selected indices
 */
function toggleMultiSelection(selected: number[], targetIndex: number, selectAllFlag: number): number[] {
  if (targetIndex === selectAllFlag) return [selectAllFlag]

  const currentSelectedIndex: number = selected.findIndex(selectedIndex => (selectedIndex === targetIndex))
  if (currentSelectedIndex !== -1) {
    const newSelections: number[] = remove(selected, currentSelectedIndex)
    return newSelections.length > 0 ? newSelections : [selectAllFlag]
  }

  if (selected[0] === selectAllFlag) return [targetIndex]
  return [...selected, targetIndex]
}


export interface SelectProps<T> {
  onChange: (values: T[], errors: ValidationError<T>) => void
  options: SelectOption<T>[]
  title: string
  defaultSelections?: number[]
  customClass?: string
  optionAsTitle?: boolean
  multi?: boolean
  reset?: boolean
  validators?: ValidatorFn<T>[]
  grid?: boolean
  scroll?: boolean
}

function SelectComponent<T>(props: SelectProps<T>): JSX.Element {
  const {
    options,
    title,
    customClass = '',
    validators = [],
    reset = false,
    grid = false,
    multi = false,
    scroll = false,
    optionAsTitle = false,
    defaultSelections = [],
    onChange: handleOnChange
  } = props

  const [ displayTitle, setDisplayTitle ] = useState(title)
  const [ showList, setShowList ] = useState(false)
  const [ selected, setSelected ] = useState<number[]>(defaultSelections)
  const [ errorState, setErrorState ] = useState<ErrorState<T>>({ errors: {}, show: false })
  const previousSelected = useRef<number[]>([])
  const previousOptions = useRef<SelectOption<T>[]>()
  const resetLatch = useRef<boolean>(!reset)
  const selectAllFlag: number = options.length

  useEffect(() => {
    if (resetLatch.current === reset) return

    resetLatch.current = reset
    setSelected(multi ? [selectAllFlag] : [])
    setErrorState({ errors: {}, show: false })
  }, [reset, multi, selectAllFlag])

  useEffect(() => {
    if (!compare(previousOptions.current, options)) {
      setSelected(defaultSelections)
      previousOptions.current = options
    }
  }, [options, defaultSelections])

  useEffect(() => {
    if (compare(previousSelected.current, selected)) return

    previousSelected.current = selected
    if (multi) {
      handleOnChange(getMultiUserSelections(selected, selectAllFlag, options), errorState.errors)
    } else if (selected.length > 0) {
      const { label, value }: SelectOption<T> = options[selected[0]]
      handleOnChange([(value ?? label) as T], errorState.errors)
    }
  }, [selected, multi, options, handleOnChange, errorState, selectAllFlag])

  useEffect(() => {
    let newTitle: string = title
    if (!multi && optionAsTitle && selected.length > 0) {
      const { label }: SelectOption<T> = options[selected[0]]
      newTitle = label
    }

    setDisplayTitle(newTitle)
  }, [multi, selected, options, title, optionAsTitle])

  const handleClick = (targetIndex: number): void => {
    if (isNaN(targetIndex)) return

    let errors: ValidationError<T>
    let selections: number[] = selected
    if (multi) {
      selections = toggleMultiSelection(selected, targetIndex, selectAllFlag)
      errors = validate<T>(selections as T, validators)
    } else {
      selections = [targetIndex]
      errors = validate<T>([targetIndex] as T, validators)
    }

    setSelected(selections)
    setErrorState({ errors, show: Object.keys(errors).length > 0 })
    setShowList(multi)
  }

  return (
    <div className={ `app-select ${customClass}` }>
      <SelectContext.Provider value={ {
        showList,
        setShowList,
        displayTitle,
        options,
        selected,
        selectAllFlag,
        grid,
        multi
      } }>
        <Button
          name='open-select'
          onClick={ () => setShowList(true) }
          flat
        >
          { displayTitle }
        </Button>
        <SelectOptions
          onClick={ handleClick }
          scroll={ scroll }
        />
        <SelectPreview show={ multi }/>
      </SelectContext.Provider>
    </div>
  )
}


export default SelectComponent
