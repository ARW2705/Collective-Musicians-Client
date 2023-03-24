import { createContext, Dispatch } from 'react'

import { QueryAction                } from '../actions/query'
import { QueryPayload, initialState } from '../components/Query/query-reducer'
import { QueryState                 } from '../models/query-state'
import { ReducerAction              } from '../models/reducer-action'


export interface QueryContextProps {
  sheetNames: string[]
  submitQuery: (submit?: boolean) => Promise<void>
  state: QueryState
  dispatch: Dispatch<ReducerAction<QueryPayload, QueryAction>>
}

export const QueryContext = createContext<QueryContextProps>({
  sheetNames: [],
  submitQuery: () => Promise.resolve(),
  state: initialState,
  dispatch: () => {}
})
