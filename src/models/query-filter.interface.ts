import { QueryCondition } from './query-condition.interface'

export interface QueryFilter {
  filter: {
    includeColumns?: string[],
    conditions: QueryCondition[]
  }
}
