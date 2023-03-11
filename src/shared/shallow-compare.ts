function compare<T>(arg1: T, arg2: T): boolean {
  return JSON.stringify(arg1) === JSON.stringify(arg2)
}

export { compare }
