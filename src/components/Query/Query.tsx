import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { SearchParams, SelectOption, QueryFilter, QueryCondition, SpreadsheetMetadata } from '../../models/interfaces'
import { selectSheetNames } from '../../state/spreadsheet-metadata/selector'
import store from '../../state/store'
import Button from '../Button/Button'
// import Collection from '../Collection/Collection'
import FilterGroup from '../FilterGroup/FilterGroup'
import Select from '../Select/Select'
import { QueryContext } from './QueryContext'
import Divider from '../Divider/Divider'
import './Query.css'


export interface QueryProps {
  customClass?: string
  searchParams?: SearchParams
}

function QueryComponent(props: QueryProps): JSX.Element {
  const { searchParams, customClass = '' } = props
  const { spreadsheetMetadata } = store.getState()
  const sheetNames: string[] = useSelector(selectSheetNames)
  const [ selectedSheetIndex, setSelectedSheetIndex ] = useState<number>(-1)
  const [ queryResults, setQueryResults ] = useState([])
  const filter = useRef<QueryFilter>()

  const updateFilter = (kwargs: { includeColumns: string[] } | { conditions: QueryCondition[] }): void => {
    const prevFilter = filter.current
    if (!kwargs) return
    if (!prevFilter) {
      filter.current = { filter: { ...kwargs } }
    }
    filter.current = {
      filter: {
        ...prevFilter,
        ...kwargs
      }
    }
    console.log(filter.current)
  }

  const submitQuery = () => {
    console.log('submit query', selectedSheetIndex, filter)
  }
//   <Collection
//   customClass='page-query-results'
//   items={ queryResults }
// />
  return (
    <section className={ `query-container ${customClass}` }>
      <Select
        title='Select a Sheet'
        options={ sheetNames.map((name: string, index: number): SelectOption<number> => ({ label: name, value: index })) }
        onChange={ (sheetIndex: number[]): void => setSelectedSheetIndex(sheetIndex[0]) }
      />
      <Divider />
      {
        selectedSheetIndex !== -1 &&
        <>
          <Select
            title='Include Columns'
            options={ spreadsheetMetadata.sheets[selectedSheetIndex].columnNames.map((name: string): SelectOption => ({ label: name })) }
            onChange={ (includeColumns: string[]): void => updateFilter({ includeColumns }) }
            multi
          />
          <Divider />
          <QueryContext.Provider value={ { columnNames: spreadsheetMetadata.sheets[selectedSheetIndex].columnNames } }>
            <FilterGroup
              onChange={ (conditions: QueryCondition[]): void => updateFilter({ conditions }) }
            />
          </QueryContext.Provider>
          <Divider />
        </>
      }

      <Button
        innerText='Submit'
        onClick={ submitQuery }
      />
    </section>
  )
}


export default QueryComponent
