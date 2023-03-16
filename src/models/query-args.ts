import { QueryConditionOptions } from './query-condition-options'
import { QueryTarget           } from './query-target'

export interface QueryArgs {
  condition: string
  target: QueryTarget
  options?: QueryConditionOptions
}
