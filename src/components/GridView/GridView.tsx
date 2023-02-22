import React, { memo } from 'react'

import { GridCell } from '../../models/grid-cell'

import './GridView.css'


export interface GridViewProps {
  grid: GridCell[][]
  customClass?: string
}

function buildGridElement(grid: GridCell[][]): JSX.Element[] {
  return grid.reduce((cellElements: JSX.Element[], row: GridCell[], rowIndex: number): JSX.Element[] => {
    const rowElements: JSX.Element[] = row.map((cell: GridCell, cellIndex: number): JSX.Element => (
      <div
        key={ `${rowIndex}${cellIndex}` }
        className={ `grid-cell ${rowIndex === 0 ? 'top' : ''} ${cellIndex === row.length - 1 ? 'end' : ''}` }
      >
        { cell }
      </div>
    ))
    return [...cellElements, ...rowElements]
  }, [])
}

function GridViewComponent({ grid, customClass = '' }: GridViewProps): JSX.Element {
  if (grid.length === 0) return <></>

  const colCount: number = grid[0].length
  const gridElement: JSX.Element[] = buildGridElement(grid)
  
  return (
    <div
      className={ `grid-view-container ${customClass}`}
      style={ { gridTemplateColumns: `repeat(${colCount}, 1fr)` } }
    >
      { gridElement }
    </div>
  )
}


export default memo(GridViewComponent)
