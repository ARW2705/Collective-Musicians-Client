import React, { useEffect, useState } from 'react'

import { SearchParams } from '../../models/interfaces'
import store from '../../state/store'
import Query from '../../components/Query/Query'
import Search from '../../components/Search/Search'

import './Query.css'


function QueryPage(): JSX.Element {
  const [spreadsheetName, setSpreadsheetName] = useState<string>('')
  const [searchParams, setSearchParams] = useState<SearchParams>()

  useEffect(() => {
    const { spreadsheetMetadata } = store.getState()
    setSpreadsheetName(spreadsheetMetadata.name || '')
  }, [])

  return (
    <div id='query-page' className='route'>
      <h2>{ spreadsheetName}</h2>
      <Query
        customClass='page-query-section'
        search={ searchParams }
      />
      <Search
        customClass='page-search-section'
        onSubmit={ (search: SearchParams) => setSearchParams(search) }
      />
    </div>
  )
}


export default QueryPage
