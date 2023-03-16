export interface ReducerAction<V, T = string> {
  type: T
  payload: V | undefined
}
