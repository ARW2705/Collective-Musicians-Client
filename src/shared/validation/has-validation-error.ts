import { ValidationError } from '../../models/validation-error'


export function hasValidationError<T>(errors: ValidationError<T> | null | undefined): boolean {
  return !!errors ? Object.keys(errors).length > 0 : false
}
