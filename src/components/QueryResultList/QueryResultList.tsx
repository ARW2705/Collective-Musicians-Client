import React, { memo, useContext } from 'react'

import { QueryContext } from '../../contexts/query'
import { QueryResult  } from '../../models/query-result'

import Loader               from '../Loaders/Loader'
import Pagination           from '../Pagination/Pagination'
import QueryResultComponent from '../QueryResult/QueryResult'

import './QueryResultList.css'


function QueryResultListComponent(): JSX.Element {
  const { state } = useContext(QueryContext)
  const { queryResponse, queryInProgress } = state
  if (!queryResponse) return <></>

  const results: JSX.Element[] = queryResponse.results
    .map((queryResult: QueryResult, index: number): JSX.Element => (
      <QueryResultComponent results={ queryResult } key={ index } />
    ))

  return (
    <div className='query-results-container'>
      <div className='query-results-content'>
        <div className='query-results-header'>
          <Pagination />
        </div>
        {
          !!queryInProgress
          ? <Loader
            show={ true }
            type='bar'
            color='primary'
            customClass='query-in-progress'
          />
          : results
        }
      </div>
    </div>
  )
}


export default memo(QueryResultListComponent)
