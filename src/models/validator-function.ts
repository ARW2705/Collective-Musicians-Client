import { ValidationError } from './validation-error'

export type ValidatorFn<T> = {
  (param: T | null): ValidationError<T> | null
}
