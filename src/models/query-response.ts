import { QueryResult } from './query-result'

export interface QueryResponse {
  results: QueryResult[]
  resultCount: number
}
