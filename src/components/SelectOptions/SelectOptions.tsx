import React, { memo, MouseEvent, useContext } from 'react'

import { SelectContext } from '../../contexts/select'
import { SelectOption  } from '../../models/select-option'

import './SelectOptions.css'


export interface SelectOptionsProps {
  onClick: (index: number) => void
  scroll: boolean
}

function SelectOptionsComponent<T>({ onClick: handleOnClick, scroll }: SelectOptionsProps): JSX.Element {
  const { showList, setShowList, selected, options, selectAllFlag, grid, multi } = useContext(SelectContext)

  const handleClick = (event: MouseEvent<HTMLUListElement>): void => {
    handleOnClick(parseInt((event.target as HTMLUListElement).getAttribute('data-index') || ''))
  }
  
  return (
    showList
    ? (
      <ul
        className={ `select-options-list ${scroll ? 'scroll' : ''}` }
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
            SELECT ALL
          </li>
        }
      </ul>
    )
    : <></>
  )
}


export default memo(SelectOptionsComponent)
