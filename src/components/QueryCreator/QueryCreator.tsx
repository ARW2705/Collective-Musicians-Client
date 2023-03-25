import React, { memo, useContext } from 'react'
import { useSelector } from 'react-redux'

import { QueryAction       } from '../../actions/query'
import { QueryContext      } from '../../contexts/query'
import { QueryCondition    } from '../../models/query-condition'
import { SelectOption      } from '../../models/select-option'
import { selectColumnNames } from '../../state/spreadsheet-metadata/selector'
import { RootState         } from '../../state/store'

import Button  from '../Button/Button'
import Divider from '../Divider/Divider'
import Filter  from '../Filter/Filter'
import Select  from '../Select/Select'

import './QueryCreator.css'


function QueryCreatorComponent(): JSX.Element {
  const { sheetNames, submitQuery, state, dispatch } = useContext(QueryContext)
  const { selectedSheetIndex, queryInProgress, queryResponse, reset } = state
  const columnNames: string[] = useSelector((rootState: RootState) => selectColumnNames(rootState, selectedSheetIndex))
  
  if (!sheetNames || !state) return <></>

  return (
    <section className='query-creator-container'>
      <Select
        title='Select a Sheet'
        options={ sheetNames.map((name: string, index: number): SelectOption<number> => ({ label: name, value: index })) }
        onChange={ (sheetIndex: number[]): void => dispatch({ type: QueryAction.SET_SHEET_INDEX, payload: sheetIndex[0] }) }
        optionAsTitle
      />
      {
        selectedSheetIndex !== -1 &&
        <>
          <Divider />
          <Select
            title='Include Columns'
            options={ columnNames.map((name: string): SelectOption => ({ label: name })) }
            onChange={ (columns: string[]): void => dispatch({ type: QueryAction.SET_INCLUDE_COLUMNS, payload: columns }) }
            defaultSelections={ [columnNames.length] }
            reset={ reset }
            grid
            multi
          />
          <Divider />
          <Filter
            onChange={ (conditions: QueryCondition[]): void => dispatch({ type: QueryAction.SET_FILTER_CONDITIONS, payload: conditions }) }
            reset={ reset }
          />
          <Divider />
          <Button
            name='submit-query'
            onClick={ () => submitQuery(true) }
            disabled={ queryInProgress }
          >
            Submit Query
          </Button>
        </>
      }
      {
        !!queryResponse?.results.length &&
        <Button
          name='clear-query'
          onClick={ () => dispatch({ type: QueryAction.SET_QUERY_RESPONSE, payload: undefined }) }
        >
          Clear Query
        </Button>
      }
    </section>
  )
}


export default memo(QueryCreatorComponent)
