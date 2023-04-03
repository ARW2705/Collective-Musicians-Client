import { SheetColumnContext } from './sheet-column-context'

export interface SheetContextProps {
  userFocusedIdentifier: string
  internalSheetSpecificIdentifier: string
  columnContext: { [columnName: string]: SheetColumnContext }
}
