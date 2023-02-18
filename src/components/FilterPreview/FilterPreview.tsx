import React from 'react'

import { QueryCondition, SelectOption, QueryTarget } from '../../models/interfaces'
import { FILTER_CONDITION_OPTIONS } from '../../shared/filter-condition-defs'

import './FilterPreview.css'


function buildPreviewElement(key: string, index: number, condition: string, target: QueryTarget): JSX.Element {
  return (
    <div className='filter-preview' key={ `${key}${index}` }>
      <span>{ key }</span>
      <span>{ condition }</span>
      <span>{ target }</span>
    </div>
  )
}

export interface FilterPreviewProps {
  filters: QueryCondition | undefined
}

function FilterPreviewComponent({ filters }: FilterPreviewProps): JSX.Element {
  let previews: JSX.Element[] = []
  let index: number = 0
  for (const key in filters) {
    const selectOption: SelectOption | undefined = FILTER_CONDITION_OPTIONS
      .find((option: SelectOption): boolean => option.value === filters[key].condition)
    const condition: string = selectOption ? selectOption.label : filters[key].condition
    const preview: JSX.Element = buildPreviewElement(key, index, condition, filters[key].target)

    if (index % 2 !== 0) {
      previews = [...previews, <div className='filter-separator' key={ index }><span>AND</span></div>]
    }

    previews = [...previews, preview]
    index++
  }

  return (
    <div className='filter-preview-container'>
      { previews }
    </div>
  )
}


export default React.memo(FilterPreviewComponent)
