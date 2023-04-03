import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { QueryAction        } from '../../actions/query'
import { QueryContext       } from '../../contexts/query'
import { QueryCondition     } from '../../models/query-condition'
import { SelectOption       } from '../../models/select-option'
import { SheetColumnContext } from '../../models/sheet-column-context'
import { compare            } from '../../shared/shallow-compare'
import { setSheetContext    } from '../../state/spreadsheet-metadata/thunk'
import {
  selectColumnNames,
  selectColumnContext
}                             from '../../state/spreadsheet-metadata/selector'
import store, { RootState   } from '../../state/store'

import Button  from '../Button/Button'
import Divider from '../Divider/Divider'
import Filter  from '../Filter/Filter'
import Loader  from '../Loaders/Loader'
import Select  from '../Select/Select'

import './QueryCreator.css'


function QueryCreatorComponent(): JSX.Element {
  const { sheetNames, submitQuery, state, dispatch } = useContext(QueryContext)
  const { selectedSheetIndex, queryInProgress, queryResponse, reset } = state
  const columnNames: string[] = useSelector((rootState: RootState) => selectColumnNames(rootState, selectedSheetIndex))
  const columnContext: { [columnName: string]: SheetColumnContext } | undefined = useSelector((rootState: RootState) => selectColumnContext(rootState, sheetNames[selectedSheetIndex]))
  const [ awaitingContext, setAwaitingContext ] = useState<boolean>(false)
  const previousSelectedSheetIndex = useRef<number>(selectedSheetIndex)
  const previousColumnContext = useRef<{ [columnName: string]: SheetColumnContext } | undefined>()

  useEffect(() => {
    if (previousSelectedSheetIndex.current === selectedSheetIndex) return

    previousSelectedSheetIndex.current = selectedSheetIndex
    store.dispatch(setSheetContext(sheetNames[selectedSheetIndex]))
    setAwaitingContext(true)
  }, [sheetNames, selectedSheetIndex])

  useEffect(() => {
    if (!columnContext || compare(columnContext, previousColumnContext.current)) return

    setAwaitingContext(false)
    previousColumnContext.current = columnContext
  }, [columnContext])

  if (!sheetNames || !state) return <></>

  return (
    <section className='query-creator-container'>
      <Select
        title='Select a Sheet'
        options={ sheetNames.map((name: string, index: number): SelectOption<number> => ({ label: name, value: index })) }
        onChange={ (sheetIndex: number[]): void => dispatch({ type: QueryAction.SET_SHEET_INDEX, payload: sheetIndex[0] }) }
        optionAsTitle
      />
      <Loader
        type='bar'
        show={ awaitingContext }
        color='primary'
      />
      {
        selectedSheetIndex !== -1 && !awaitingContext &&
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
