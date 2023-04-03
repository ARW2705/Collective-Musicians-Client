import { SheetContext } from './sheet-context'
import { SheetMetadata } from './sheet-metadata'

export interface SpreadsheetMetadata {
  id: string | null
  name: string | null
  sheets: SheetMetadata[]
  sheetContext: SheetContext
}
