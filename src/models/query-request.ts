import { QueryFilter } from '@models/query-filter'
import { QueryParams } from '@models/query-params'

export interface QueryRequest {
  url: string,
  method: string,
  params?: QueryParams,
  data?: QueryFilter
}
