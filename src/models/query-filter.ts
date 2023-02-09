import { QueryCondition } from './query-condition'

export interface QueryFilter {
  filter: {
    includeColumns?: string[],
    conditions?: QueryCondition[]
  }
}
