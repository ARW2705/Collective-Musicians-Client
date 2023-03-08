import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { QueryCondition } from '../../models/query-condition'
import { QueryParams    } from '../../models/query-params'
import { QueryResponse  } from '../../models/query-response'
import { SelectOption   } from '../../models/select-option'
import { SearchParams   } from '../../models/search-params'

import { query } from '../../http/client'

import { selectSheetNames } from '../../state/spreadsheet-metadata/selector'
import store                from '../../state/store'

import { PaginationContext } from '../../contexts/Pagination/PaginationContext'
import { QueryContext      } from '../../contexts/Query/QueryContext'

import Button          from '../Button/Button'
import Divider         from '../Divider/Divider'
import Filter          from '../Filter/Filter'
import QueryResultList from '../QueryResultList/QueryResultList'
import Select          from '../Select/Select'

import './Query.css'


export interface QueryProps {
  customClass?: string
  searchParams?: SearchParams
}

function QueryComponent({ customClass = '', searchParams }: QueryProps): JSX.Element {
  const { spreadsheetMetadata } = store.getState()
  const sheetNames: string[] = useSelector(selectSheetNames)
  const { page, pageLimit } = useContext(PaginationContext)
  const [ selectedSheetIndex, setSelectedSheetIndex ] = useState<number>(-1)
  const [ columnNames, setColumnNames ] = useState<string[]>([])
  const [ includeColumns, setIncludeColumns ] = useState<string[]>([])
  const [ queryResponse, setQueryResponse ] = useState<QueryResponse>()
  const [ queryInProgress, setQueryInProgress ] = useState<boolean>(false)
  const [ reset, setReset ] = useState<boolean>(false)
  const filterConditions = useRef<QueryCondition[]>([])
  const previousPage = useRef<{ page: Number, pageLimit: number }>({ page, pageLimit })

  const submitQuery = useCallback(async (submit?: boolean): Promise<void> => {
    if (!submit) return

    try {
      let queryParams: QueryParams = { sheetName: sheetNames[selectedSheetIndex], page, limit: pageLimit }
      let queryFilter: { includeColumns?: string[], conditions?: QueryCondition[] } = {}

      if (includeColumns.length) {
        queryFilter = { ...queryFilter, includeColumns }
      }

      if (filterConditions.current.length) {
        queryFilter = { ...queryFilter, conditions: filterConditions.current }
      }

      const response = await query<QueryResponse>(
        'spreadsheets/sheet/query',
        queryParams,
        { filter: queryFilter }
      )
      console.log(response)
      setQueryResponse(response)
    } catch (error) {
      console.log('got error trying to submit query', error)
    }
  }, [page, pageLimit, sheetNames, selectedSheetIndex, includeColumns])

  useEffect(() => {
    setQueryResponse(undefined)
  }, [selectedSheetIndex])

  useEffect(() => {
    if (selectedSheetIndex !== -1) {
      setReset(prevProps => !prevProps)
      setColumnNames(spreadsheetMetadata.sheets[selectedSheetIndex].columnNames)
    }
  }, [spreadsheetMetadata, selectedSheetIndex])

  useEffect(() => {
    const { page: prevPage, pageLimit: prevPageLimit } = previousPage.current
    if (page !== prevPage || pageLimit !== prevPageLimit) submitQuery(true)
    previousPage.current = { page, pageLimit }
  }, [page, pageLimit, submitQuery])

  return (
    <section className={ `query-container ${customClass}` }>
      <QueryContext.Provider value={ { columnNames, queryInProgress, queryResponse } }>
        {
          sheetNames.length > 0 &&
          <Select
            title='Select a Sheet'
            options={ sheetNames.map((name: string, index: number): SelectOption<number> => ({ label: name, value: index })) }
            onChange={ (sheetIndex: number[]): void => setSelectedSheetIndex(sheetIndex[0]) }
          />
        }
        {
          selectedSheetIndex !== -1 &&
          <>
            <Divider />
            <Select
              title='Include Columns'
              options={ spreadsheetMetadata.sheets[selectedSheetIndex].columnNames.map((name: string): SelectOption => ({ label: name })) }
              onChange={ (columns: string[]): void => setIncludeColumns(columns) }
              defaultSelections={ [spreadsheetMetadata.sheets[selectedSheetIndex].columnNames.length] }
              grid
              multi
            />
            <Divider />
            <Filter
              onChange={ (conditions: QueryCondition[]): void => { filterConditions.current = conditions } }
              reset={ reset }
            />
            <Divider />
            <Button
              name='submit-query'
              onClick={ () => submitQuery(true) }
            >
              Submit Query
            </Button>
          </>
        }
        {
          !!queryResponse?.results.length &&
          <QueryResultList customClass='page-query-results' />
        }
      </QueryContext.Provider>
    </section>
  )
}


export default QueryComponent
