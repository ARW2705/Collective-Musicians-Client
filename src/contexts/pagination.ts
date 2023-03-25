import { createContext, Dispatch, SetStateAction } from 'react'

export interface PaginationContextProps {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  pageLimit: number
  setPageLimit?: Dispatch<SetStateAction<number>>
  pageCount: number
  setPageCount?: Dispatch<SetStateAction<number>>
}

export const PaginationContext = createContext<PaginationContextProps>({
  page: 1,
  setPage: () => {},
  pageLimit: 1,
  setPageLimit: () => {},
  pageCount: 0,
  setPageCount: () => {}
})
