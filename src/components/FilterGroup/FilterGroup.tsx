import React, { memo, useContext, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { QueryContext             } from '../../contexts/query'
import { QueryCondition           } from '../../models/query-condition'
import { QueryArgs                } from '../../models/query-args'
import { SelectOption             } from '../../models/select-option'
import { SingleQueryArgs          } from '../../models/single-query-args'
import { ValidationError          } from '../../models/validation-error'
import { FILTER_CONDITION_OPTIONS } from '../../shared/filter-condition-defs'
import { required                 } from '../../shared/validation/validation'
import { selectColumnNames        } from '../../state/spreadsheet-metadata/selector'
import { RootState                } from '../../state/store'

import Button        from '../Button/Button'
import FilterPreview from '../FilterPreview/FilterPreview'
import Input         from '../Input/Input'
import Select        from '../Select/Select'

import './FilterGroup.css'


export interface FilterGroupProps {
  groupKey: number
  onSubmit: (conditions: QueryCondition, groupKey: number) => void
  onRemove: () => void
}

function FilterGroupComponent({ onSubmit: handleOnSubmit, onRemove: handleOnRemove, groupKey }: FilterGroupProps): JSX.Element {
  const { state } = useContext(QueryContext)
  const columnNames: string[] = useSelector((rootState: RootState) => selectColumnNames(rootState, state.selectedSheetIndex))
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
    const queryArgs: QueryArgs = { condition, target }
    let filtersUpdate: QueryCondition = { ...filters }
    if (!filtersUpdate[column]) {
      filtersUpdate = {
        [column]: [ queryArgs ]
      }
    } else {
      filtersUpdate = {
        ...filtersUpdate,
        [column]: [...filtersUpdate[column], queryArgs]
      }
    }

    handleOnSubmit(filtersUpdate, groupKey)
    filterPartial.current = {}
    setFilters(prevFilters => ({ ...prevFilters, ...filtersUpdate }))
    setReset(prevProp => !prevProp)
    setIsDisabled(true)
  }

  const removeFilter = ({ column, condition, target, options }: SingleQueryArgs): void => {
    if (!filters || !filters[column]) return

    let filtersUpdate: QueryCondition = { ...filters }
    const queryStr: string = JSON.stringify({ condition, target, options })
    const updatedConditions: QueryArgs[] = filters[column]
      .filter((queryArgs: QueryArgs): boolean => JSON.stringify(queryArgs) !== queryStr)

    if (updatedConditions.length === 0) {
      const { [column]: value, ...remainder } = filtersUpdate
      filtersUpdate = remainder
    } else {
      filtersUpdate = {
        ...filtersUpdate,
        [column]: updatedConditions
      }
    }

    handleOnSubmit(filtersUpdate, groupKey)
    setFilters(filtersUpdate)
  }

  return (
    <section className='filter-group-container'>
      <Button
        name='remove-filter-group'
        customClass='remove-filter-group-button'
        onClick={ () => handleOnRemove() }
        flat
      >
        Remove Group
      </Button>
      <div className='filter-controls'>
        <Select
          title='Column'
          customClass='filter-select'
          options={ columnNames.map((name: string): SelectOption => ({ label: name })) }
          onChange={ (columns: string[], errors: ValidationError<string>) => onChange('column', columns[0], errors) }
          validators={ [required()] }
          reset={ reset }
          grid
        />
        <Select
          title='Condition'
          customClass='filter-select'
          options={ FILTER_CONDITION_OPTIONS }
          onChange={ (columns: string[], errors: ValidationError<string>) => onChange('condition', columns[0], errors) }
          validators={ [required()] }
          reset={ reset }
          grid
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
          customClass='add-filter-button'
          disabled={ isDisabled }
          onClick={ onSubmit }
        >
          Add Filter
        </Button>
      </div>
      <FilterPreview
        filters={ filters }
        onClick={ removeFilter }
      />
    </section>
  )
}


export default memo(FilterGroupComponent)
