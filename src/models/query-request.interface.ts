import { QueryFilter } from './query-filter.interface'
import { QueryParams } from './query-params.interface'

export interface QueryRequest {
  url: string,
  method: string,
  params?: QueryParams,
  data?: QueryFilter
}
