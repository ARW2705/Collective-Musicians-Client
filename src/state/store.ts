import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import spreadsheetMetadataReducer from './spreadsheet-metadata/slice'
import { setSpreadsheetMetadata } from './spreadsheet-metadata/thunk'


const store = configureStore({
  reducer: {
    spreadsheetMetadata: spreadsheetMetadataReducer
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware().concat([
      thunkMiddleware
    ])
  )
})

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(setSpreadsheetMetadata())


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
