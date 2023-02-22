import { createSlice } from '@reduxjs/toolkit'
import { SpreadsheetMetadata } from '../../models/spreadsheet-metadata'


const initialState: SpreadsheetMetadata = {
  id: null,
  name: null,
  sheets: []
}

export const spreadsheetMetadataSlice = createSlice({
  name: 'spreadsheetMetadata',
  initialState,
  reducers: {
    clear: (): SpreadsheetMetadata => initialState,
    set: (_, action: { type: string, payload: SpreadsheetMetadata }): SpreadsheetMetadata => action.payload
  }
})

export const { clear, set } = spreadsheetMetadataSlice.actions

export default spreadsheetMetadataSlice.reducer
