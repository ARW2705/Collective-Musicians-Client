import React from 'react'

import { QueryResponse } from '../../models/interfaces'

import QueryResult from '../QueryResult/QueryResult'

import './QueryResultList.css'


export interface QueryResultListProps {
  queryResults: QueryResponse[],
  customClass?: string
}

function QueryResultListComponent({ queryResults, customClass = '' }: QueryResultListProps): JSX.Element {
  const results: JSX.Element[] = queryResults
    .map((queryResult: QueryResponse, index: number): JSX.Element => (
      <QueryResult results={ queryResult } key={ index } />
    ))

  return (
    <div className={ `query-results-container ${customClass}` }>
      { results }
    </div>
  )
}


export default React.memo(QueryResultListComponent)
