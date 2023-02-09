import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SearchParams, SelectOption, QueryFilter, QueryCondition } from '../../models/interfaces'
import { selectSheetNames } from '../../state/spreadsheet-metadata/selector'
import store from '../../state/store'
import Button from '../Button/Button'
import Collection from '../Collection/Collection'
import FilterGroup from '../FilterGroup/FilterGroup'
import Select from '../Select/Select'

import './Query.css'


function QueryComponent(props : { customClass?: string, searchParams?: SearchParams }): JSX.Element {
  const { searchParams, customClass = '' } = props
  const { spreadsheetMetadata } = store.getState()
  const sheetNames: string[] = useSelector(selectSheetNames)
  const [ columnOptions, setColumnOptions ] = useState<SelectOption[]>([])
  const [ selectedSheetIndex, setSelectedSheetIndex ] = useState<number>(0)
  const [ filter, setFilter ] = useState<QueryFilter>()
  const [ queryResults, setQueryResults ] = useState([])

  useEffect(() => {
    const sheet = spreadsheetMetadata.sheets[selectedSheetIndex]
    if (sheet) {
      setColumnOptions(sheet.columnNames.map((name: string): SelectOption => ({ label: name })))
    }
  }, [selectedSheetIndex, spreadsheetMetadata.sheets])

  const updateFilter = (kwargs: { includeColumns: string[] } | { conditions: QueryCondition[] }): void => {
    setFilter((prevFilter: QueryFilter | undefined): QueryFilter | undefined => {
      if (!kwargs) return prevFilter
      if (!prevFilter && kwargs) return { filter: { ...kwargs } }
      return {
        filter: {
          ...prevFilter,
          ...kwargs
        }
      }
    })
  }

  const submitQuery = () => {
    console.log('submit query', selectedSheetIndex, filter)
  }

  return (
    <section className={ `query-container ${customClass}` }>
      <Select
        title='Select a Sheet'
        options={ sheetNames.map((name: string, index: number): SelectOption<number> => ({ label: name, value: index })) }
        onChange={ (sheetIndex: number): void => setSelectedSheetIndex(sheetIndex) }
      />
      <Select
        title='Include Columns'
        options={ columnOptions }
        onChange={ (includeColumns: string[]): void => updateFilter({ includeColumns }) }
        multi
      />
      <FilterGroup
        columns={ spreadsheetMetadata.sheets[selectedSheetIndex].columnNames }
        onChange={ (conditions: QueryCondition[]): void => updateFilter({ conditions }) }
      />
      <Collection
        customClass='page-query-results'
        items={ queryResults }
      />
      <Button
        onClick={ submitQuery }
      />
    </section>
  )
}


export default QueryComponent
