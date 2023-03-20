import { createContext } from 'react'

import { ScrollIntoViewOptions } from '../models/scroll'


export interface ScrollContextProps {
  scrollIntoView: (element: HTMLElement | null, options?: ScrollIntoViewOptions) => void
}

export const ScrollContext = createContext<ScrollContextProps>({
  scrollIntoView: () => {}
})
