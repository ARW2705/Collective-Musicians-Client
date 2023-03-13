import React, { useCallback, useContext, useEffect, useReducer, useRef } from 'react'
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
import Loader          from '../Loaders/Loader'
import QueryResultList from '../QueryResultList/QueryResultList'
import Select          from '../Select/Select'

import { reducer, initialState, QueryAction } from './query-reducer'
import './Query.css'


export interface QueryProps {
  customClass?: string
  searchParams?: SearchParams
}

function QueryComponent({ customClass = '', searchParams }: QueryProps): JSX.Element {
  const { spreadsheetMetadata } = store.getState()
  const sheetNames: string[] = useSelector(selectSheetNames)
  const { page, pageLimit } = useContext(PaginationContext)
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const filterConditions = useRef<QueryCondition[]>([])
  const previousPage = useRef<{ page: Number, pageLimit: number }>({ page, pageLimit })

  const submitQuery = useCallback(async (submit?: boolean): Promise<void> => {
    if (!submit) return

    dispatch({ type: QueryAction.SET_QUERY_IN_PROGRESS, payload: true })
    try {
      let queryParams: QueryParams = { sheetName: sheetNames[state.selectedSheetIndex], page, limit: pageLimit }
      let queryFilter: { includeColumns?: string[], conditions?: QueryCondition[] } = {}

      if (state.includeColumns.length) {
        queryFilter = { ...queryFilter, includeColumns: state.includeColumns }
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
      dispatch({ type: QueryAction.SET_QUERY_RESPONSE, payload: response })
    } catch (error) {
      console.log('got error trying to submit query', error)
    } finally {
      dispatch({ type: QueryAction.SET_QUERY_IN_PROGRESS, payload: false })
    }
  }, [page, pageLimit, sheetNames, state])

  useEffect(() => {
    const { page: prevPage, pageLimit: prevPageLimit } = previousPage.current
    if (page !== prevPage || pageLimit !== prevPageLimit) submitQuery(true)
    previousPage.current = { page, pageLimit }
  }, [page, pageLimit, submitQuery])

  return (
    <section className={ `query-container ${customClass}` }>
      {
        sheetNames.length > 0 &&
        <Select
          title='Select a Sheet'
          options={ sheetNames.map((name: string, index: number): SelectOption<number> => ({ label: name, value: index })) }
          onChange={ (sheetIndex: number[]): void => dispatch({ type: QueryAction.SET_SHEET_INDEX, payload: sheetIndex[0] }) }
        />
      }
      <QueryContext.Provider value={ { columnNames: state.selectedSheetIndex === -1 ? [] : spreadsheetMetadata.sheets[state.selectedSheetIndex].columnNames, queryInProgress: state.queryInProgress, queryResponse: state.queryResponse } }>
        {
          state.selectedSheetIndex !== -1 &&
          <>
            <Divider />
            <Select
              title='Include Columns'
              options={ spreadsheetMetadata.sheets[state.selectedSheetIndex].columnNames.map((name: string): SelectOption => ({ label: name })) }
              onChange={ (columns: string[]): void => dispatch({ type: QueryAction.SET_INCLUDE_COLUMNS, payload: columns }) }
              defaultSelections={ [spreadsheetMetadata.sheets[state.selectedSheetIndex].columnNames.length] }
              reset={ state.reset }
              grid
              multi
            />
            <Divider />
            <Filter
              onChange={ (conditions: QueryCondition[]): void => { filterConditions.current = conditions } }
              reset={ state.reset }
            />
            <Divider />
            <Button
              name='submit-query'
              onClick={ () => submitQuery(true) }
              disabled={ state.queryInProgress }
            >
              Submit Query
            </Button>
            { !!state.queryResponse?.results.length &&
              <Button
                name='clear-query'
                onClick={ () => dispatch({ type: QueryAction.SET_QUERY_RESPONSE, payload: undefined }) }
              >
                Clear Query
              </Button>
            }
          </>
        }
        <Loader
          show={ state.queryInProgress }
          type='bar'
          color='primary'
          customClass='query-in-progress'
        />
        <QueryResultList customClass='page-query-results' />
      </QueryContext.Provider>
    </section>
  )
}


export default QueryComponent
