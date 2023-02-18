export interface ValidationError<T> {
  [key: string]: {
    [key: string]: T | string
    value: T
  }
}
