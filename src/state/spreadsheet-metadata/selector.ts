import { SpreadsheetMetadata } from '../../models/spreadsheet-metadata'
import { SheetMetadata } from '../../models/sheet-metadata'


function selectSheetNames({ spreadsheetMetadata }: { spreadsheetMetadata: SpreadsheetMetadata }): string[] {
  return spreadsheetMetadata.sheets.map((sheet: SheetMetadata) => sheet.name)
}

function selectSheet({ spreadsheetMetadata }: { spreadsheetMetadata: SpreadsheetMetadata }, sheetName: string): SheetMetadata | null {
  const sheet = spreadsheetMetadata.sheets.find((sheet: SheetMetadata): boolean => sheet.name === sheetName)
  if (!sheet) return null

  return sheet
}

function selectColumnNames({ spreadsheetMetadata }: { spreadsheetMetadata: SpreadsheetMetadata }, selectedSheetIndex: number): string[] {
  if (selectedSheetIndex < 0 || selectedSheetIndex >= spreadsheetMetadata.sheets.length) return []

  return spreadsheetMetadata.sheets[selectedSheetIndex].columnNames
}


export {
  selectSheetNames,
  selectSheet,
  selectColumnNames
}
