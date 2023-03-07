import React, { memo, useEffect, useRef, useState } from 'react'

import { QueryCondition } from '../../models/query-condition'

import Button      from '../Button/Button'
import FilterGroup from '../FilterGroup/FilterGroup'
import Bracket     from '../Bracket/Bracket'

import './Filter.css'


function removeFilterElementFromList(filterGroupComponents: JSX.Element[], keyToRemove: number): JSX.Element[] {
  const indexToRemove: number = filterGroupComponents.findIndex(({ props }: JSX.Element): boolean => props.groupKey === keyToRemove)
  if (indexToRemove === -1) return filterGroupComponents
  if (indexToRemove === 0) return filterGroupComponents.slice(2)

  return [
    ...filterGroupComponents.slice(0, indexToRemove - 1),
    ...filterGroupComponents.slice(indexToRemove + 1)
  ]
}

export interface FilterProps {
  onChange: (conditions: QueryCondition[]) => void
  reset?: boolean
}

function FilterComponent({ reset = false, onChange: handleOnChange }: FilterProps): JSX.Element {
  const [ filterGroupComponents, setFilterGroupComponents ] = useState<JSX.Element[]>([])
  const groups = useRef<{[key: number]: QueryCondition}>({})
  const groupKeys = useRef<number>(0)
  const onInit = useRef<boolean>(true)

  const handleOnSubmit = (conditions: QueryCondition, groupKey: number) => {
    if (Object.keys(conditions).length === 0) {
      const { [groupKey]: value, ...remainder } = groups.current
      groups.current = remainder
      setFilterGroupComponents((prevFilterComponents: JSX.Element[]): JSX.Element[] => (
        removeFilterElementFromList(prevFilterComponents, groupKey)
      ))
    } else {
      groups.current = {
        ...groups.current,
        [groupKey]: {
          ...groups.current[groupKey],
          ...conditions
        }
      }
    }

    let filterGroups: QueryCondition[] = []
    for (const key in groups.current) {
      filterGroups = [...filterGroups, groups.current[key]]
    }

    handleOnChange(filterGroups)
  }
    
  const addFilter = (): void => {
    setFilterGroupComponents((prevFilters: JSX.Element[]) => {
      const groupKey = groupKeys.current
      groupKeys.current++
      return [
        ...prevFilters,
        <FilterGroup
          onSubmit={ handleOnSubmit }
          groupKey={ groupKey }
          key={ groupKey }
        />
      ]
    })
  }

  useEffect(() => {
    if (onInit.current) {
      onInit.current = false
      return
    }

    setFilterGroupComponents([])
    groups.current = {}
    groupKeys.current = 0
  }, [reset])

  return (
    <section className={`filter-container ${filterGroupComponents.length > 0 ? 'has-filters' : ''}`}>
      <Button
        name='add-filter-group'
        onClick={ addFilter }
      >
        Add Filter Group
      </Button>
      <div className='filter-group-content'>
        { filterGroupComponents }
        { filterGroupComponents.length > 1 && <Bracket>OR</Bracket> }
      </div>
    </section>
  )
}


export default memo(FilterComponent)
