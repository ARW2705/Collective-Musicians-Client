import React, { memo, useRef, useState } from 'react'

import { QueryCondition } from '../../models/query-condition'

import Button from '../Button/Button'
import Filter from '../Filter/Filter'

import './FilterGroup.css'


export interface FilterGroupProps {
  onChange: (conditions: QueryCondition[]) => void
}

function FilterGroupComponent({ onChange }: FilterGroupProps): JSX.Element {
  const [ filterComponents, setFilterComponents ] = useState<JSX.Element[]>([])
  const groups = useRef<{[key: number]: QueryCondition}>({})
  const groupKeys = useRef<number>(0)

  const handleOnSubmit = (conditions: QueryCondition, groupKey: number) => {
    groups.current = {
      ...groups.current,
      [groupKey]: {
        ...groups.current[groupKey],
        ...conditions
      }
    }

    let filterGroups: QueryCondition[] = []
    for (const key in groups.current) {
      filterGroups = [...filterGroups, groups.current[key]]
    }

    onChange(filterGroups)
  }
    
  const addFilter = (): void => {
    setFilterComponents((prevFilters: JSX.Element[]) => {
      const groupKey = groupKeys.current
      groupKeys.current = groupKey + 1
      if (prevFilters.length > 0) {
        prevFilters = [...prevFilters, <div className='group-separator' key={ `separator-${prevFilters.length}`}><span>OR</span></div>]
      }
      prevFilters = [
        ...prevFilters,
        <Filter
          onSubmit={ handleOnSubmit }
          groupKey={ groupKey }
          key={ prevFilters.length + 1 }
        />
      ]
      return prevFilters
    })
  }

  return (
    <section className={`filter-group-container ${filterComponents.length > 0 ? 'has-filters' : ''}`}>
      <Button
        name='add-filter-group'
        customClass='add-filter-group-button'
        innerText='Add Filter Group'
        onClick={ addFilter }
      />
      { filterComponents }
    </section>
  )
}


export default memo(FilterGroupComponent)
