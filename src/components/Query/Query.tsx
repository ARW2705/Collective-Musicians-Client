import React, { useCallback, useContext, useEffect, useReducer, useRef } from 'react'
import { useSelector } from 'react-redux'

import { QueryAction       } from '../../actions/query'
import { PaginationContext } from '../../contexts/Pagination/PaginationContext'
import { QueryContext      } from '../../contexts/Query/QueryContext'
import { query             } from '../../http/client'
import { QueryCondition    } from '../../models/query-condition'
import { QueryParams       } from '../../models/query-params'
import { QueryResponse     } from '../../models/query-response'
import { SearchParams      } from '../../models/search-params'
import { selectSheetNames  } from '../../state/spreadsheet-metadata/selector'

import Loader          from '../Loaders/Loader'
import QueryCreator    from '../QueryCreator/QueryCreator'
import QueryResultList from '../QueryResultList/QueryResultList'

import reducer, { initialState } from './query-reducer'
import './Query.css'


export interface QueryProps {
  customClass?: string
  searchParams?: SearchParams
}

function QueryComponent({ customClass = '', searchParams }: QueryProps): JSX.Element {
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
      <QueryContext.Provider value={ {
        sheetNames,
        filterConditions,
        submitQuery,
        state,
        dispatch
      } }>
        <QueryCreator />
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
