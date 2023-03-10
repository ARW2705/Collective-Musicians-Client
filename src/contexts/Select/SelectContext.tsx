import { createContext, Dispatch, SetStateAction } from 'react'

import { SelectOption } from '../../models/select-option'


export interface SelectContextProps<T> {
  showList: boolean
  setShowList: Dispatch<SetStateAction<boolean>>
  displayTitle: string
  options: SelectOption<T>[]
  selected: number[]
  selectAllFlag: number
  grid: boolean
  multi: boolean
}

export const SelectContext = createContext<SelectContextProps<any>>({
  showList: false,
  setShowList: () => {},
  displayTitle: '',
  options: [],
  selected: [],
  selectAllFlag: -1,
  grid: false,
  multi: false
})
