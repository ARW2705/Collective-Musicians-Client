import { ValidatorFn } from '../../models/validator-function'
import { ValidationError } from '../../models/validation-error'


export function required(): ValidatorFn<any> {
  return function(value: any): ValidationError<any> | null {
    if (value === null || value === undefined || (typeof value === 'string' && !value.length)) {
      return { required: { required: 'any value', value } }
    }

    return null
  }
}
