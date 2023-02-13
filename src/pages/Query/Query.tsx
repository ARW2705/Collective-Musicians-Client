import React, { useEffect, useState } from 'react'

import { SpreadsheetMetadata, SearchParams } from '../../models/interfaces'
import store from '../../state/store'
import Query from '../../components/Query/Query'
// import Search from '../../components/Search/Search'

import './Query.css'


function QueryPage(): JSX.Element {
  const [searchParams, setSearchParams] = useState<SearchParams>()
  const { spreadsheetMetadata: initialSpreadsheetMetadata } = store.getState()
  const [ spreadsheetMetadata, setSpreadsheetMetadata ] = useState<SpreadsheetMetadata>(initialSpreadsheetMetadata)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setSpreadsheetMetadata(store.getState().spreadsheetMetadata)
    })

    return () => unsubscribe()
  }, [])

  //   <Search
//   customClass='page-search-section'
//   onSubmit={ (search: SearchParams) => setSearchParams(search) }
// />
  return (
    <div id='query-page' className='route'>
      <h2>{ spreadsheetMetadata.name }</h2>
      <Query
        customClass='page-query-section'
        searchParams={ searchParams }
      />

    </div>
  )
}


export default QueryPage
