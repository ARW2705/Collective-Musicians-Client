import { createContext, Dispatch, MutableRefObject } from 'react'

import { QueryPayload, QueryState, QueryAction, initialState } from '../../components/Query/query-reducer'
import { QueryCondition                                      } from '../../models/query-condition'
import { ReducerAction                                       } from '../../models/reducer-action'


export interface QueryContextProps {
  sheetNames: string[]
  filterConditions: MutableRefObject<QueryCondition[]>
  submitQuery: (submit?: boolean) => Promise<void>
  state: QueryState
  dispatch: Dispatch<ReducerAction<QueryPayload, QueryAction>>
}

export const QueryContext = createContext<QueryContextProps>({
  sheetNames: [],
  filterConditions: { current: [] },
  submitQuery: () => Promise.resolve(),
  state: initialState,
  dispatch: () => {}
})
