import { SpreadsheetMetadata } from '../../models/interfaces'
import { SheetMetadata } from '../../models/interfaces'


function selectSheetNames(state: SpreadsheetMetadata): string[] {
  return state.sheets.map((sheet: SheetMetadata) => sheet.name)
}

function selectSheet(state: SpreadsheetMetadata, sheetName: string): SheetMetadata | null {
  const sheet = state.sheets.find((sheet: SheetMetadata): boolean => sheet.name === sheetName)
  if (!sheet) return null

  return sheet
}


export {
  selectSheetNames,
  selectSheet
}
