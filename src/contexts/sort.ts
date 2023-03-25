import { createContext, Dispatch, SetStateAction } from 'react'

export interface SortContextProps {
  sortProp: string
  setSortProp: Dispatch<SetStateAction<string>>
  sortPropOptions: string[]
  isDescending: boolean
  setIsDescending: Dispatch<SetStateAction<boolean>>
}

export const SortContext = createContext<SortContextProps>({
  sortProp: '',
  setSortProp: () => {},
  sortPropOptions: [],
  isDescending: false,
  setIsDescending: () => {}
})
