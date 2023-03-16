import React, { useEffect, useState } from 'react'

import { PaginationContext   } from '../../contexts/Pagination/PaginationContext'
import { SearchParams        } from '../../models/search-params'
import { SpreadsheetMetadata } from '../../models/spreadsheet-metadata'
import store                   from '../../state/store'

import Loader from '../../components/Loaders/Loader'
import Query  from '../../components/Query/Query'

import './Query.css'


function QueryPage(): JSX.Element {
  const [ page, setPage ] = useState<number>(1)
  const [ pageLimit, setPageLimit ] = useState<number>(5)
  const [searchParams, setSearchParams] = useState<SearchParams>()
  const { spreadsheetMetadata: initialSpreadsheetMetadata } = store.getState()
  const [ spreadsheetMetadata, setSpreadsheetMetadata ] = useState<SpreadsheetMetadata>(initialSpreadsheetMetadata)

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setSpreadsheetMetadata(store.getState().spreadsheetMetadata)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div id='query-page' className='route'>
      <Loader
        show={ !spreadsheetMetadata.id }
        type='bar'
        color='primary'
        blocking
      />
      <h2>{ spreadsheetMetadata.name }</h2>
      <PaginationContext.Provider value={ { page, setPage, pageLimit, setPageLimit } }>
        <Query
          customClass='page-query-section'
          searchParams={ searchParams }
        />
      </PaginationContext.Provider>
    </div>
  )
}


export default QueryPage
