import { createContext } from 'react'

export interface QueryContextProps {
  columnNames: string[]
}

export const QueryContext = createContext<QueryContextProps>({ columnNames: [] })
