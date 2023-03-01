import React, { memo } from 'react'
import { FaMinusCircle } from 'react-icons/fa'

import { QueryCondition } from '../../models/query-condition'
import { QueryTarget    } from '../../models/query-target'
import { SingleQueryArgs } from '../../models/single-query-args'
import { SelectOption   } from '../../models/select-option'

import { FILTER_CONDITION_OPTIONS } from '../../shared/filter-condition-defs'

import Button from '../Button/Button'

import './FilterPreview.css'


function buildPreviewElement(column: string, index: number, selectOption: SelectOption, target: QueryTarget, handleOnClick: (query: SingleQueryArgs) => void): JSX.Element {
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
        innerElement={ <FaMinusCircle /> }
        onClick={ () => handleOnClick({ column, target, condition: selectOption?.value || selectOption.label }) }
        flat
      />
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
      if (!selectOption) {
        throw new Error(`Select option of ${key} is not valid`)
      }

      if (flattenedIndex > 0) {
        previews = [
          ...previews,
          <div className='filter-separator' key={ flattenedIndex }>
            <span>AND</span>
          </div>
        ]
      }

      previews = [...previews, buildPreviewElement(key, flattenedIndex, selectOption, queryArgs.target, handleOnClick)]
      flattenedIndex++
    }
  }

  return (
    <div className='filter-preview-container'>
      { previews }
    </div>
  )
}


export default memo(FilterPreviewComponent)
