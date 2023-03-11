import { ValidationError } from './validation-error'

export interface ErrorState<T> {
  errors: ValidationError<T>,
  show: boolean
}
