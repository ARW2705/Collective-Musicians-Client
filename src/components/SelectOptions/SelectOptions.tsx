import React, { memo, MouseEvent, useContext } from 'react'

import { SelectOption } from '../../models/select-option'
import { SelectContext } from '../../contexts/Select/SelectContext'

import './SelectOptions.css'


export interface SelectOptionsProps {
  onClick: (index: number) => void
}

function SelectOptionsComponent<T>({ onClick: handleOnClick }: SelectOptionsProps): JSX.Element {
  const { showList, setShowList, selected, options, selectAllFlag, grid, multi } = useContext(SelectContext)

  const handleClick = (event: MouseEvent<HTMLUListElement>): void => {
    handleOnClick(parseInt((event.target as HTMLUListElement).getAttribute('data-index') || ''))
  }
  
  return (
    showList
    ? (
      <ul
        className='select-options-list'
        style={ { gridTemplateColumns: `repeat(${grid ? Math.ceil(Math.sqrt(options.length)) : 1}, 1fr)` } }
        onMouseLeave={ () => setShowList(false) }
        onClick={ handleClick }
      >
        {
          options.map((option: SelectOption<T>, index: number): JSX.Element => (
            <li
              key={ index }
              data-index={ index }
              className={`select-option ${selected.includes(index) ? 'active' : ''}`}
            >
              { option.label }
            </li>
          ))
        }
        {
          multi &&
          <li
            data-index={ selectAllFlag }
            className={`select-option ${selected.includes(selectAllFlag) ? 'active' : ''}`}
          >
            Select All
          </li>
        }
      </ul>
    )
    : <></>
  )
}


export default memo(SelectOptionsComponent)
