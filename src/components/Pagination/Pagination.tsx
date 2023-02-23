import React, { memo, useContext } from 'react'

import { PaginationContext } from '../../contexts/Pagination/PaginationContext'
import { QueryContext      } from '../../contexts/Query/QueryContext'

import Button from '../Button/Button'

import './Pagination.css'


function PaginationComponent(): JSX.Element {
  const { page, setPage, pageLimit } = useContext(PaginationContext)
  const { queryResponse } = useContext(QueryContext)
  if (!queryResponse) return <></>

  const pageCount = Math.ceil(queryResponse.resultCount / pageLimit)

  return (
    <div className='pagination-container'>
      {
        page > 1 ?
        <Button
          innerText='Previous'
          name='previous-page'
          customClass='pagination-button'
          onClick={ () => setPage(prevPage => prevPage - 1) }
        />
        : <div></div>
      }
      <span>
        Page { page } of { pageCount }
      </span>
      {
        page < pageCount ?
        <Button
          innerText='Next'
          name='next-page'
          customClass='pagination-button'
          onClick={ () => setPage(prevPage => prevPage + 1) }
        />
        : <div></div>
      }
    </div>
  )
}


export default memo(PaginationComponent)