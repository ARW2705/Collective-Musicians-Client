import { QueryAction    } from '../../actions/query'
import { QueryCondition } from '../../models/query-condition'
import { QueryResponse  } from '../../models/query-response'
import { QueryState     } from '../../models/query-state'
import { ReducerAction  } from '../../models/reducer-action'

export type QueryPayload = number | string[] | QueryCondition[] | QueryResponse | boolean | undefined

export const initialState: QueryState = {
  selectedSheetIndex: -1,
  includeColumns: [],
  filterConditions: [],
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
    case QueryAction.SET_FILTER_CONDITIONS:
      return { ...state, filterConditions: action.payload as QueryCondition[] }
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
