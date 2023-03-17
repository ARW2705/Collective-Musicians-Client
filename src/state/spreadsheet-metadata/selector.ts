import { SheetContext        } from '../../models/sheet-context'
import { SheetMetadata       } from '../../models/sheet-metadata'
import { SpreadsheetMetadata } from '../../models/spreadsheet-metadata'

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

function selectContextSheet({ spreadsheetMetadata }: { spreadsheetMetadata: SpreadsheetMetadata }): SheetContext {
  return spreadsheetMetadata.contextSheet
}


export {
  selectSheetNames,
  selectSheet,
  selectColumnNames,
  selectContextSheet
}
