import React, { memo, useContext } from 'react'

import { QueryResult } from '../../models/query-result'

import { QueryContext } from '../../contexts/Query/QueryContext'

import Pagination           from '../Pagination/Pagination'
import QueryResultComponent from '../QueryResult/QueryResult'

import './QueryResultList.css'


export interface QueryResultListProps {
  customClass?: string
}

function QueryResultListComponent({ customClass = '' }: QueryResultListProps): JSX.Element {
  const { queryResponse } = useContext(QueryContext)
  if (!queryResponse) return <></>

  const results: JSX.Element[] = queryResponse.results
    .map((queryResult: QueryResult, index: number): JSX.Element => (
      <QueryResultComponent results={ queryResult } key={ index } />
    ))

  return (
    <div className={ `query-results-container ${customClass}` }>
      <div className='query-results-content'>
        <div className='query-results-header'>

        </div>
        { results }
      </div>
      <Pagination />
    </div>
  )
}


export default memo(QueryResultListComponent)
