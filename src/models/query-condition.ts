import { QueryConditionOptions } from '@models/query-condition-options'

export interface QueryCondition {
  [key: string]: {
    condition: string
    target: (string | number) | (string[] | number[])
    options?: QueryConditionOptions
  }
}
