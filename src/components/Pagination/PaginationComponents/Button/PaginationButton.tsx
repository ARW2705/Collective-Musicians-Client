import React, { useCallback, useContext, useEffect, useState } from 'react'

import { PaginationContext } from '../../../../contexts/pagination'
import { toTitleCase       } from '../../../../shared/to-title-case'

import Button from '../../../Button/Button'

import './PaginationButton.css'


interface PaginationButtonElements {
  previous: JSX.Element
  next: JSX.Element
}

function PaginationButtonComponent(): JSX.Element {
  const { page, setPage, pageCount } = useContext(PaginationContext)
  const [ buttons, setButtons ] = useState<PaginationButtonElements>({
    previous: <></>,
    next: <></>
  })

  const buildButtonElement = useCallback((direction: string): JSX.Element => (
    <Button
      name={ `${direction}-page` }
      customClass='pagination-button'
      onClick={ () => setPage(prevPage => prevPage + (direction === 'next' ? 1 : -1)) }
    >
      { toTitleCase(direction) }
    </Button>
  ), [setPage])

  useEffect(() => {
    const previous: JSX.Element = page > 1 ? buildButtonElement('previous') : <div></div>
    const next: JSX.Element = page < pageCount ? buildButtonElement('next') : <div></div>
    setButtons({ previous, next })
  }, [page, pageCount, buildButtonElement])

  return (
    <div className='pagination-button-container'>
      { buttons.previous }
      <span>Page { page } { `${pageCount ? `of ${pageCount}` : ''}` }</span>
      { buttons.next }
    </div>
  )
}


export default PaginationButtonComponent
