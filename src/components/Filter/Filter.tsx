import React, { memo, useContext, useRef, useState } from 'react'

import { QueryCondition  } from '../../models/query-condition'
import { SelectOption    } from '../../models/select-option'
import { ValidationError } from '../../models/validation-error'

import { QueryContext } from '../../contexts/Query/QueryContext'

import { FILTER_CONDITION_OPTIONS } from '../../shared/filter-condition-defs'
import { required                 } from '../../shared/validation/validation'

import Button        from '../Button/Button'
import FilterPreview from '../FilterPreview/FilterPreview'
import Input         from '../Input/Input'
import Select        from '../Select/Select'

import './Filter.css'


export interface FilterProps {
  groupKey: number
  onSubmit: (conditions: QueryCondition, groupKey: number) => void
}

function FilterComponent({ onSubmit: handleOnSubmit, groupKey }: FilterProps): JSX.Element {
  const { columnNames } = useContext(QueryContext)
  const [ isDisabled, setIsDisabled ] = useState<boolean>(true)
  const [ filters, setFilters ] = useState<QueryCondition>()
  const [ reset, setReset ] = useState<boolean>(false)
  const filterPartial = useRef<{[key: string]: any}>({})

  const onChange = (propName: string, value: string | number, errors: ValidationError<string | number>): void => {
    if (Object.keys(errors).length > 0) {
      delete filterPartial.current[propName]
      setIsDisabled(true)
    } else {
      filterPartial.current = { ...filterPartial.current, [propName]: value }
      if (Object.keys(filterPartial.current).length === 3 && isDisabled) {
        setIsDisabled(false)
      }
    }
  }

  const onSubmit = (): void => {
    if (!filterPartial.current) return

    const { column, condition, target } = filterPartial.current
    const queryCondition: QueryCondition = {
      [column]: {
        condition,
        target
      }
    }

    handleOnSubmit(queryCondition, groupKey)
    filterPartial.current = {}
    setFilters(prevFilters => ({ ...prevFilters, ...queryCondition }))
    setReset(prevProp => !prevProp)
    setIsDisabled(true)
  }

  return (
    <section className='filter-container'>
      <Select
        title='Column'
        customClass='filter-option'
        options={ columnNames.map((name: string): SelectOption => ({ label: name })) }
        onChange={ (columns: string[], errors: ValidationError<string>) => onChange('column', columns[0], errors) }
        validators={ [required()] }
        reset={ reset }
      />
      <Select
        title='Condition'
        customClass='filter-option'
        options={ FILTER_CONDITION_OPTIONS }
        onChange={ (columns: string[], errors: ValidationError<string>) => onChange('condition', columns[0], errors) }
        validators={ [required()] }
        reset={ reset }
      />
      <Input
        label='Target'
        name='target'
        type='text'
        onChange={ onChange }
        validators={ [required()] }
        reset={ reset }
      />
      <Button
        name='add-filter'
        innerText='Add Filter'
        disabled={ isDisabled }
        onClick={ onSubmit }
      />
      <FilterPreview filters={ filters } />
    </section>
  )
}


export default memo(FilterComponent)
