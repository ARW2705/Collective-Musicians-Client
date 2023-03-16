import React, { memo, useContext } from 'react'

import { QueryContext } from '../../contexts/query'
import { QueryResult  } from '../../models/query-result'

import Pagination           from '../Pagination/Pagination'
import QueryResultComponent from '../QueryResult/QueryResult'

import './QueryResultList.css'


export interface QueryResultListProps {
  customClass?: string
}

function QueryResultListComponent({ customClass = '' }: QueryResultListProps): JSX.Element {
  const { state } = useContext(QueryContext)
  const { queryResponse } = state
  if (!queryResponse) return <></>

  const results: JSX.Element[] = queryResponse.results
    .map((queryResult: QueryResult, index: number): JSX.Element => (
      <QueryResultComponent results={ queryResult } key={ index } />
    ))

  return (
    <div className={ `query-results-container ${customClass}` }>
      <div className='query-results-content'>
        <div className='query-results-header'>
          <Pagination />
        </div>
        { results }
      </div>
    </div>
  )
}


export default memo(QueryResultListComponent)
