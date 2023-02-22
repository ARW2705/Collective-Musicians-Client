import { createContext } from 'react'

import { QueryResponse } from '../../models/query-response'

export interface QueryContextProps {
  columnNames: string[]
  queryInProgress: boolean
  queryResponse: QueryResponse | undefined
}

export const QueryContext = createContext<QueryContextProps>({
  columnNames: [],
  queryInProgress: false,
  queryResponse: undefined
})
