import React, { memo, useContext, useEffect, useRef, useState } from 'react'

import { QueryContext } from '../../contexts/query'
import { QueryResult  } from '../../models/query-result'

import Loader               from '../Loaders/Loader'
import Pagination           from '../Pagination/Pagination'
import QueryResultComponent from '../QueryResult/QueryResult'

import './QueryResultList.css'


function QueryResultListComponent(): JSX.Element {
  const { state } = useContext(QueryContext)
  const { queryResponse, queryInProgress } = state
  const [ results, setResults ] = useState<JSX.Element[]>([])
  const scrollRef = useRef<HTMLElement>(null)
  const queryLatch = useRef<boolean>(false)

  useEffect(() => {
    if (queryInProgress) queryLatch.current = true
    else if (!queryInProgress && queryLatch.current && scrollRef.current) {
      scrollRef.current.scrollIntoView()
      queryLatch.current = false
    }
  }, [queryInProgress])

  useEffect(() => {
    if (!queryResponse) return

    setResults(queryResponse.results.map((queryResult: QueryResult, index: number): JSX.Element => (
      <QueryResultComponent results={ queryResult } key={ index } />
    )))
  }, [queryResponse])

  return (
    <section ref={ scrollRef } className='query-results-container'>
      {
        !queryResponse && !!queryInProgress &&
        <Loader
          show={ true }
          type='bar'
          color='primary'
          customClass='query-in-progress'
        />
      }
      {
        !!queryResponse &&
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
      }
    </section>
  )
}


export default memo(QueryResultListComponent)
