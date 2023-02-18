import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { query } from '../../http/client'
import { SearchParams, SelectOption, QueryResponse, QueryFilter, QueryParams, QueryCondition, SpreadsheetMetadata } from '../../models/interfaces'
import { selectSheetNames } from '../../state/spreadsheet-metadata/selector'
import store from '../../state/store'
import Button from '../Button/Button'
import QueryResultList from '../QueryResultList/QueryResultList'
import FilterGroup from '../FilterGroup/FilterGroup'
import Select from '../Select/Select'
import { QueryContext } from './QueryContext'
import Divider from '../Divider/Divider'
import './Query.css'


export interface QueryProps {
  customClass?: string
  searchParams?: SearchParams
}

function QueryComponent({ searchParams, customClass = '' }: QueryProps): JSX.Element {
  const { spreadsheetMetadata } = store.getState()
  const sheetNames: string[] = useSelector(selectSheetNames)
  const [ selectedSheetIndex, setSelectedSheetIndex ] = useState<number>(-1)
  const [ queryResults, setQueryResults ] = useState<QueryResponse[]>([])
  const includeColumns = useRef<string[]>([])
  const filterConditions = useRef<QueryCondition[]>([])

  const submitQuery = async () => {
    console.log('submit query', selectedSheetIndex, includeColumns.current, filterConditions.current)
    try {
      let queryParams: QueryParams = { sheetName: sheetNames[selectedSheetIndex], page: 1, limit: 5 }
      let queryFilter: { includeColumns?: string[], conditions?: QueryCondition[] } = {}
      if (includeColumns.current.length) {
        Object.assign(queryFilter, { includeColumns: includeColumns.current })
      }
      if (filterConditions.current.length) {
        Object.assign(queryFilter, { conditions: filterConditions.current })
      }

      const response = await query<QueryResponse[]>('spreadsheets/sheet/query', queryParams, { filter: queryFilter })
      setQueryResults(response)
    } catch (error) {
      console.log('got error trying to submit query', error)
    }
  }

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
            onChange={ (columns: string[]): void => { includeColumns.current = columns } }
            multi
          />
          <Divider />
          <QueryContext.Provider value={ { columnNames: spreadsheetMetadata.sheets[selectedSheetIndex].columnNames } }>
            <FilterGroup
              onChange={ (conditions: QueryCondition[]): void => { filterConditions.current = conditions } }
            />
          </QueryContext.Provider>
          <Divider />
        </>
      }
      <Button
        name='submit-query'
        innerText='Submit'
        onClick={ submitQuery }
      />
      {
        !!queryResults.length &&
        <QueryResultList
          customClass='page-query-results'
          queryResults={ queryResults }
        />
      }
    </section>
  )
}


export default QueryComponent
