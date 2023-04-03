import { SelectOption } from '../models/select-option'

import {
  greaterThan,
  greaterThanOrEqualTo,
  lesserThan,
  lesserThanOrEqualTo,
  equalTo,
  notEqualTo,
  before,
  beforeOrOn,
  after,
  afterOrOn,
  matchesDate
} from './constants/filter-condition-defs'


function getFilterConditions(datatype: string): SelectOption<string>[] {
  const [ baseType, ...remainder ] = datatype.split(':')
  switch (baseType) {
    case 'string':
      return [
        equalTo,
        notEqualTo
      ]
    case 'number':
      return [
        greaterThan,
        greaterThanOrEqualTo,
        lesserThan,
        lesserThanOrEqualTo,
        equalTo,
        notEqualTo
      ]
    case 'date':
      return [
        before,
        beforeOrOn,
        after,
        afterOrOn,
        matchesDate
      ]
    case 'enum':
      const enumValues: string[] = remainder[0].split(',')
      return enumValues.map((enumValue: string): SelectOption<string> => ({ label: enumValue }))
    default:
      throw new Error(`Datatype ${datatype} is not a valid filter`)
  }
}


export { getFilterConditions }
