import { QueryConditionOptions } from './query-condition-options'

export interface QueryCondition {
  [key: string]: {
    condition: string
    target: (string | number) | (string[] | number[])
    options?: QueryConditionOptions
  }
}
