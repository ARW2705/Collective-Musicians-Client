import React, { useContext } from 'react'

import { PaginationContext } from '../../../../contexts/pagination'

import './PaginationPip.css'


function PaginationPipComponent(): JSX.Element {
  const { page, setPage, pageCount } = useContext(PaginationContext)

  return (
    <div className='pagination-pip-container'>
      {
        Array.from(Array(pageCount), (_: any, index: number): JSX.Element => (
          <svg
            viewBox="0 0 100 100"
            key={ index }
            className={ `pip ${index === page ? 'active' : ''}` }
            onClick={ () => setPage(index) }
          >
            <circle r='48' cx='50' cy='50' />
          </svg>
        ))
      }
    </div>
  )
}


export default PaginationPipComponent
