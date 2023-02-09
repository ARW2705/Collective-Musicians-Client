import React, { useState } from 'react'

import { SearchParams } from '../../models/interfaces'
import store from '../../state/store'
import Query from '../../components/Query/Query'
import Search from '../../components/Search/Search'

import './Query.css'


function QueryPage(): JSX.Element {
  const [searchParams, setSearchParams] = useState<SearchParams>()
  const { spreadsheetMetadata } = store.getState()

  return (
    <div id='query-page' className='route'>
      <h2>{ spreadsheetMetadata.name }</h2>
      <Query
        customClass='page-query-section'
        searchParams={ searchParams }
      />
      <Search
        customClass='page-search-section'
        onSubmit={ (search: SearchParams) => setSearchParams(search) }
      />
    </div>
  )
}


export default QueryPage
