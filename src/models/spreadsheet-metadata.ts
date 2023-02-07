import { SheetMetadata } from '@models/sheet-metadata'

export interface SpreadsheetMetadata {
  id: string | null
  name: string | null
  sheets: SheetMetadata[]
}
