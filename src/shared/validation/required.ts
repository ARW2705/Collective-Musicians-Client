import { ValidatorFn, ValidationError } from '../../models/interfaces'

export function required(): ValidatorFn<any> {
  return function(value: any): ValidationError<any> | null {
    if (value === null || value === undefined || (typeof value === 'string' && !value.length)) {
      return { required: { required: 'any value', value } }
    }

    return null
  }
}
