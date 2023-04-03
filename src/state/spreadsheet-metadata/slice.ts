import { createSlice } from '@reduxjs/toolkit'

import { SheetColumnContext    } from '../../models/sheet-column-context'
import { SpreadsheetMetadata } from '../../models/spreadsheet-metadata'
import { SheetMetadata } from '../../models/sheet-metadata'


const initialState: SpreadsheetMetadata = {
  id: null,
  name: null,
  sheets: [],
  sheetContext: {}
}

interface SheetContextPayload {
  name: string
  columnNames: string[]
  context: { [columnName: string]: SheetColumnContext }
}

export const spreadsheetMetadataSlice = createSlice({
  name: 'spreadsheetMetadata',
  initialState,
  reducers: {
    clear: (): SpreadsheetMetadata => initialState,
    set: (state: SpreadsheetMetadata, action: { type: string, payload: SpreadsheetMetadata | SheetContextPayload }): SpreadsheetMetadata => {
      if (action.payload.hasOwnProperty('id')) return (action.payload as SpreadsheetMetadata)
      if (state.id === null || action.payload === null) return state

      const { name, columnNames, context } = action.payload as SheetContextPayload
      const sheetIndex: number = state.sheets.findIndex((sheet: SheetMetadata) => sheet.name === name)
      if (sheetIndex === -1) throw new Error(`Sheet with name ${name} not found`)

      state.sheets[sheetIndex].columnNames = columnNames
      state.sheetContext[name].columnContext = context
      return state
    }
  }
})

export const { clear, set } = spreadsheetMetadataSlice.actions

export default spreadsheetMetadataSlice.reducer
