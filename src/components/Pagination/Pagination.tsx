import React, { memo, useContext } from 'react'

import { PaginationContext } from '../../contexts/pagination'
import { QueryContext      } from '../../contexts/query'

import Button from '../Button/Button'

import './Pagination.css'


function PaginationComponent(): JSX.Element {
  const { page, setPage, pageLimit } = useContext(PaginationContext)
  const { state } = useContext(QueryContext)
  const { queryResponse } = state
  if (!queryResponse) return <></>

  const pageCount = Math.ceil(queryResponse.resultCount / pageLimit)

  return (
    <div className='pagination-container'>
      {
        page > 1 ?
        <Button
          name='previous-page'
          customClass='pagination-button'
          onClick={ () => setPage(prevPage => prevPage - 1) }
        >
          Previous
        </Button>
        : <div></div>
      }
      <span>
        Page { page } of { pageCount }
      </span>
      {
        page < pageCount ?
        <Button
          name='next-page'
          customClass='pagination-button'
          onClick={ () => setPage(prevPage => prevPage + 1) }
        >
          Next
        </Button>
        : <div></div>
      }
    </div>
  )
}


export default memo(PaginationComponent)
