import React, { useContext } from 'react'

import { PaginationContext } from '../../../../contexts/pagination'

import Button from '../../../Button/Button'

import './PaginationButton.css'


function PaginationButtonComponent(): JSX.Element {
  const { page, setPage, pageCount } = useContext(PaginationContext)

  return (
    <div className='pagination-button-container'>
      <Button
        name='previous-page'
        customClass='pagination-button'
        onClick={ () => setPage(prevPage => prevPage - 1) }
        disabled={ page <= 1 }
        flat
      >
        Previous
      </Button>
      <span>Page { page } { `${pageCount ? `of ${pageCount}` : ''}` }</span>
      <Button
        name='next-page'
        customClass='pagination-button'
        onClick={ () => setPage(prevPage => prevPage + 1) }
        disabled={ page >= pageCount }
        flat
      >
        Next
      </Button>
    </div>
  )
}


export default PaginationButtonComponent
