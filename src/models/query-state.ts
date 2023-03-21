import { QueryResponse } from './query-response'

export interface QueryState {
  selectedSheetIndex: number
  includeColumns: string[]
  queryResponse: QueryResponse | undefined
  queryInProgress: boolean
  reset: boolean
}
