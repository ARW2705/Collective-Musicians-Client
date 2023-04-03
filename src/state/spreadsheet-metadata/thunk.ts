import { Dispatch } from 'redux'

import { get                 } from '../../http/client'
import { SheetColumnContext  } from '../../models/sheet-column-context'
import { SpreadsheetMetadata } from '../../models/spreadsheet-metadata'

import { RootState } from '../store'

import { set } from './slice'


function setSpreadsheetMetadata() {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const metadata = await get<SpreadsheetMetadata>('spreadsheets')
      console.log('got metadata', metadata)
      dispatch(set(metadata))
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

function setSheetContext(sheetName: string) {
  return async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      const { columnNames, sheetContext } = await get<{ columnNames: string[], sheetContext: { [columnName: string]: SheetColumnContext } }>('spreadsheets/sheet/context', { sheetName })
      dispatch(set({ name: sheetName, context: sheetContext, columnNames }))
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}


export {
  setSpreadsheetMetadata,
  setSheetContext
}
