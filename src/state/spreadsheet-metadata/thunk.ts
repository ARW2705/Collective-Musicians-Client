import { Dispatch } from 'redux'

import { get                 } from '../../http/client'
import { SpreadsheetMetadata } from '../../models/spreadsheet-metadata'

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


export {
  setSpreadsheetMetadata
}
