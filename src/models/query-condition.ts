import { QueryConditionOptions } from './query-condition-options'
import { QueryTarget } from './query-target'

export interface QueryCondition {
  [key: string]: {
    condition: string
    target: QueryTarget
    options?: QueryConditionOptions
  }
}
