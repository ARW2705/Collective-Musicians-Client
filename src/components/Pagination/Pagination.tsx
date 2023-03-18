import React, { memo } from 'react'

import PaginationButton from './PaginationComponents/Button/PaginationButton'
import PaginationPip    from './PaginationComponents/Pip/PaginationPip'

import './Pagination.css'


export interface PaginationProps {
  type?: string
}

function PaginationComponent({ type = 'button' }: PaginationProps): JSX.Element {
  switch (type) {
    case 'button':
      return <PaginationButton />
    case 'pip':
      return <PaginationPip />
    default:
      return <></>
  }
}


export default memo(PaginationComponent)
