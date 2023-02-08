import { SpreadsheetMetadata } from '../../models/interfaces'
import { get } from '../../http/client'
import { set } from './slice'
import { Dispatch } from 'redux'


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
