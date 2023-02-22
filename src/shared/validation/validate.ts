import { ValidatorFn } from '../../models/validator-function'
import { ValidationError } from '../../models/validation-error'


export function validate<T>(value: T | null, validators: ValidatorFn<T>[]): ValidationError<T> {
  if (!validators) return {}

  return validators.reduce(
    (errors: ValidationError<T>, validator: ValidatorFn<T>): ValidationError<T> => {
      const error: ValidationError<T> | null = validator(value)
      if (error) Object.assign(errors, error)
      return errors
    },
    {}
  )
}
