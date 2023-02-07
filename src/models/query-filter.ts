import { QueryCondition } from '@models/query-condition'

export interface QueryFilter {
  filter: {
    includeColumns?: string[],
    conditions: QueryCondition[]
  }
}
