import { QueryAction    } from '../../actions/query'
import { QueryResponse  } from '../../models/query-response'
import { ReducerAction  } from '../../models/reducer-action'


export interface QueryState {
  selectedSheetIndex: number
  includeColumns: string[]
  queryResponse: QueryResponse | undefined
  queryInProgress: boolean
  reset: boolean
}

export type QueryPayload = number | string[] | QueryResponse | boolean | undefined

export const initialState: QueryState = {
  selectedSheetIndex: -1,
  includeColumns: [],
  queryResponse: undefined,
  queryInProgress: false,
  reset: false
}

function reducer(state: QueryState, action: ReducerAction<QueryPayload, QueryAction>): QueryState {
  switch (action.type) {
    case QueryAction.SET_SHEET_INDEX:
      const index: number = action.payload as number
      return {
        ...state,
        selectedSheetIndex: index,
        queryResponse: undefined,
        reset: !state.reset
      }
    case QueryAction.SET_INCLUDE_COLUMNS:
      return { ...state, includeColumns: action.payload as string[] }
    case QueryAction.SET_QUERY_RESPONSE:
      return {
        ...state,
        queryResponse: action.payload as (QueryResponse | undefined),
        reset: action.payload === undefined ? !state.reset : state.reset
      }
    case QueryAction.SET_QUERY_IN_PROGRESS:
      return { ...state, queryInProgress: action.payload as boolean }
    case QueryAction.TOGGLE_RESET:
      return { ...state, reset: !state.reset }
    case QueryAction.CLEAR:
      return initialState
    default:
      return state
  }
}

export default reducer
