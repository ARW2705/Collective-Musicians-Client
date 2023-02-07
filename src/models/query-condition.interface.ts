import { QueryConditionOptions } from './query-condition-options.interface'

export interface QueryCondition {
  [key: string]: {
    condition: string
    target: (string | number) | (string[] | number[])
    options?: QueryConditionOptions
  }
}
