import React, { useCallback, useContext, useEffect, useReducer, useRef } from 'react'
import { useSelector } from 'react-redux'

import { QueryAction        } from '../../actions/query'
import { PaginationContext  } from '../../contexts/pagination'
import { QueryContext       } from '../../contexts/query'
import { query              } from '../../http/client'
import { QueryCondition     } from '../../models/query-condition'
import { QueryParams        } from '../../models/query-params'
import { QueryResponse      } from '../../models/query-response'
import { SearchParams       } from '../../models/search-params'
import { SheetContext       } from '../../models/sheet-context'
import { SheetContextProps  } from '../../models/sheet-context-props'
import { remove             } from '../../shared/remove-at'
import { selectContextSheet } from '../../state/spreadsheet-metadata/selector'
import { selectSheetNames   } from '../../state/spreadsheet-metadata/selector'

import QueryCreator    from '../QueryCreator/QueryCreator'
import QueryResultList from '../QueryResultList/QueryResultList'

import reducer, { initialState } from './query-reducer'
import './Query.css'


/**
 * Configured the selected columns to be included with a query
 * 
 * @param selectedColumns - user selected columns
 * @param [identifier] - optional sheet defined column to include
 * @return array of selected columns with the identifier column as the first element if it exists
 */
function configureIncludeColumns(selectedColumns: string[], identifier?: string): string[] {
  if (!identifier) return selectedColumns

  const identifierIndex: number = selectedColumns.findIndex(column => column === identifier)
  if (identifierIndex === -1) return [identifier, ...selectedColumns]
  return [identifier, ...remove(selectedColumns, identifierIndex)]
}

export interface QueryProps {
  customClass?: string
  searchParams?: SearchParams
}

function QueryComponent({ customClass = '', searchParams }: QueryProps): JSX.Element {
  const sheetNames: string[] = useSelector(selectSheetNames)
  const contextSheet: SheetContext = useSelector(selectContextSheet)
  const { page, pageLimit, setPageCount = () => {} } = useContext(PaginationContext)
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const filterConditions = useRef<QueryCondition[]>([])
  const previousPage = useRef<{ page: Number, pageLimit: number }>({ page, pageLimit })

  const submitQuery = useCallback(async (submit?: boolean): Promise<void> => {
    if (!submit) return

    dispatch({ type: QueryAction.SET_QUERY_IN_PROGRESS, payload: true })
    try {
      let queryParams: QueryParams = { sheetName: sheetNames[state.selectedSheetIndex], page, limit: pageLimit }
      const identifierColumn: SheetContextProps | undefined = contextSheet[sheetNames[state.selectedSheetIndex]]
      const configuredIncludeColumns: string[] = configureIncludeColumns(
        state.includeColumns,
        identifierColumn?.userFocusedIdentifier
      )

      let queryFilter: { includeColumns: string[], conditions?: QueryCondition[] } = {
        includeColumns: configuredIncludeColumns
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
      setPageCount(Math.ceil(response.resultCount / pageLimit))
      dispatch({ type: QueryAction.SET_QUERY_RESPONSE, payload: response })
    } catch (error) {
      console.log('got error trying to submit query', error)
    } finally {
      dispatch({ type: QueryAction.SET_QUERY_IN_PROGRESS, payload: false })
    }
  }, [page, pageLimit, sheetNames, state, contextSheet, setPageCount])

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
        <QueryResultList />
      </QueryContext.Provider>
    </section>
  )
}


export default QueryComponent
