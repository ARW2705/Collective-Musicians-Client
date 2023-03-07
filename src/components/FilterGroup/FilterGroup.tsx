import React, { memo, useEffect, useRef, useState } from 'react'

import { QueryCondition } from '../../models/query-condition'

import Button from '../Button/Button'
import Filter from '../Filter/Filter'
import Bracket from '../Bracket/Bracket'

import './FilterGroup.css'


function removeFilterElementFromList(filterComponents: JSX.Element[], keyToRemove: number): JSX.Element[] {
  const indexToRemove: number = filterComponents.findIndex(({ props }: JSX.Element): boolean => props.groupKey === keyToRemove)
  if (indexToRemove === -1) return filterComponents
  if (indexToRemove === 0) return filterComponents.slice(2)

  return [
    ...filterComponents.slice(0, indexToRemove - 1),
    ...filterComponents.slice(indexToRemove + 1)
  ]
}

export interface FilterGroupProps {
  onChange: (conditions: QueryCondition[]) => void
  reset?: boolean
}

function FilterGroupComponent({ reset = false, onChange: handleOnChange }: FilterGroupProps): JSX.Element {
  const [ filterComponents, setFilterComponents ] = useState<JSX.Element[]>([])
  const groups = useRef<{[key: number]: QueryCondition}>({})
  const groupKeys = useRef<number>(0)
  const onInit = useRef<boolean>(true)

  const handleOnSubmit = (conditions: QueryCondition, groupKey: number) => {
    if (Object.keys(conditions).length === 0) {
      const { [groupKey]: value, ...remainder } = groups.current
      groups.current = remainder
      setFilterComponents((prevFilterComponents: JSX.Element[]): JSX.Element[] => (
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
    setFilterComponents((prevFilters: JSX.Element[]) => {
      const groupKey = groupKeys.current
      groupKeys.current++
      return [
        ...prevFilters,
        <Filter
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

    setFilterComponents([])
    groups.current = {}
    groupKeys.current = 0
  }, [reset])

  return (
    <section className={`filter-group-container ${filterComponents.length > 0 ? 'has-filters' : ''}`}>
      <Button
        name='add-filter-group'
        customClass='add-filter-group-button'
        onClick={ addFilter }
      >
        Add Filter Group
      </Button>
      <div className='filter-group'>
        <div className='filters'>
          { filterComponents }
        </div>
        { filterComponents.length > 1 && <Bracket>OR</Bracket> }
      </div>
    </section>
  )
}


export default memo(FilterGroupComponent)
