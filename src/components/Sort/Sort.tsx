import React, { memo, useContext } from 'react'

import { SortContext  } from '../../contexts/sort'
import { SelectOption } from '../../models/select-option'

import Select from '../Select/Select'

import './Sort.css'


function SortComponent(): JSX.Element {
  const { sortProp, setSortProp, sortPropOptions, isDescending, setIsDescending } = useContext(SortContext)
  return (
    <div className='sort-selection-container'>
      <Select
        onChange={ (values: string[]): void => setSortProp(values[0]) }
        options={ sortPropOptions.map((option: string): SelectOption<string> => ({ label: option })) }
        title={ `Sort${sortProp ? ` By: ${sortProp}` : ''}`}
        customClass='sort-select'
        scroll
      />
    </div>
  )
}


export default memo(SortComponent)
