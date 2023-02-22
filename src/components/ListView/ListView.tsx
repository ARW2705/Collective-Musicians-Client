import React, { memo } from 'react'

import { Primitive } from '../../models/primitive'

import './ListView.css'


function buildListElement(list: Primitive[]): JSX.Element[] {
  return list.reduce((itemElements: JSX.Element[], listItem: Primitive, index: number): JSX.Element[] => {
    const itemElement: JSX.Element = (
      <li className='list-view-item' key={ index }>
        { listItem }
      </li>
    )

    return [...itemElements, itemElement]
  }, [])
}

export interface ListViewProps {
  list: Primitive[]
  customClass?: string
}

function ListViewComponent({ customClass = '', list }: ListViewProps): JSX.Element {
  if (list.length === 0) return <></>

  const listElement: JSX.Element[] = buildListElement(list)
  
  return (
    <ul className={ `list-view-container ${customClass}` }>
      { listElement }
    </ul>
  )
}


export default memo(ListViewComponent)
