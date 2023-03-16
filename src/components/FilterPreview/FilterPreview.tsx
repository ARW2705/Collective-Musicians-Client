import React, { memo } from 'react'
import { FaMinusCircle } from 'react-icons/fa'

import { QueryCondition           } from '../../models/query-condition'
import { QueryTarget              } from '../../models/query-target'
import { SelectOption             } from '../../models/select-option'
import { SingleQueryArgs          } from '../../models/single-query-args'
import { FILTER_CONDITION_OPTIONS } from '../../shared/filter-condition-defs'

import Bracket from '../Bracket/Bracket'
import Button  from '../Button/Button'

import './FilterPreview.css'


/**
 * Build a single preview element of a filter
 * 
 * @param column - the column name
 * @param index - a given react key value
 * @param selectOption - the associated select option for the filter
 * @param target - the target value of the filter
 * @param removeFilter - function to handle filter removal
 * @return filter preview element
 */
function buildPreviewElement(column: string, index: number, selectOption: SelectOption, target: QueryTarget, removeFilter: (query: SingleQueryArgs) => void): JSX.Element {
  return (
    <div className='filter-preview' key={ `${column}${index}` }>
      <div className='filter-text'>
        <span>{ column }</span>
        <span>{ selectOption.label }</span>
        <span>{ target }</span>
      </div>
      <Button
        name='remove-filter'
        customClass='remove-button'
        onClick={ () => removeFilter({ column, target, condition: selectOption?.value || selectOption.label }) }
        flat
      >
        <FaMinusCircle />
      </Button>
    </div>
  )
}

export interface FilterPreviewProps {
  filters: QueryCondition | undefined
  onClick: (query: SingleQueryArgs) => void
}

function FilterPreviewComponent({ filters, onClick: handleOnClick }: FilterPreviewProps): JSX.Element {
  let previews: JSX.Element[] = []
  let flattenedIndex: number = 0
  
  for (const key in filters) {
    for (let i = 0; i < filters[key].length; i++) {
      const queryArgs = filters[key][i]
      const selectOption: SelectOption | undefined = FILTER_CONDITION_OPTIONS
        .find((option: SelectOption): boolean => option.value === queryArgs.condition)
        
      if (!selectOption) throw new Error(`Select option of ${key} is not valid`)

      previews = [...previews, buildPreviewElement(key, flattenedIndex, selectOption, queryArgs.target, handleOnClick)]
      flattenedIndex++
    }
  }

  return (
    <div className='filter-preview-container'>
      <div className='preview-container'>
        { previews }
      </div>
      { previews.length > 1 && <Bracket>AND</Bracket> }
    </div>
  )
}


export default memo(FilterPreviewComponent)
