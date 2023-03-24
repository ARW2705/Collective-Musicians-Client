import { QueryCondition } from './query-condition'
import { QueryResponse  } from './query-response'

export interface QueryState {
  selectedSheetIndex: number
  includeColumns: string[]
  filterConditions: QueryCondition[]
  queryResponse: QueryResponse | undefined
  queryInProgress: boolean
  reset: boolean
}
