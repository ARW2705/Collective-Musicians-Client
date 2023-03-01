import { QueryArgs } from './query-args'

export interface QueryCondition {
  [key: string]: QueryArgs[]
}
