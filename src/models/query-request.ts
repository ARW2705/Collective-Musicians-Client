import { QueryFilter } from './query-filter'
import { QueryParams } from './query-params'

export interface QueryRequest {
  url: string,
  method: string,
  params?: QueryParams,
  data?: QueryFilter
}
