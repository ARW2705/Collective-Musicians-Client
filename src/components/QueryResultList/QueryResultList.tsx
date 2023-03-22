import React, { memo, useContext, useEffect, useRef, useState } from 'react'

import { QueryContext, QueryContextProps } from '../../contexts/query'
import { QueryResult                     } from '../../models/query-result'

import Loader               from '../Loaders/Loader'
import PageLimit            from '../PageLimit/PageLimit'
import Pagination           from '../Pagination/Pagination'
import QueryResultComponent from '../QueryResult/QueryResult'

import './QueryResultList.css'


function QueryResultListComponent(): JSX.Element {
  const { state } = useContext<QueryContextProps>(QueryContext)
  const { queryResponse, queryInProgress } = state
  const [ results, setResults ] = useState<JSX.Element[]>([])
  const scrollRef = useRef<HTMLElement>(null)
  const queryEnd = useRef<boolean>(true)

  useEffect(() => {
    if (queryInProgress) queryEnd.current = false
    else if (!queryEnd.current && scrollRef.current) {
      scrollRef.current.scrollIntoView()
      queryEnd.current = true
    }
  }, [queryInProgress])

  useEffect(() => {
    if (queryResponse) {
      setResults(queryResponse.results.map((queryResult: QueryResult, index: number): JSX.Element => (
        <QueryResultComponent results={ queryResult } key={ index } />
      )))
    } else {
      setResults([])
    }
  }, [queryResponse])

  return (
    <section ref={ scrollRef } className={ `query-results-container ${!queryResponse ? 'hide' : ''}` }>
      {
        !!queryResponse &&
        <div className='page-bar'>
          <Pagination />
          <PageLimit />
        </div>
      }
      <Loader
        show={ queryInProgress }
        type='bar'
        color='primary'
        customClass='query-loader'
      />
      <div className={ `query-results-list ${queryInProgress ? 'query-in-progress' : ''}` }>
        { results }
      </div>
    </section>
  )
}


export default memo(QueryResultListComponent)
