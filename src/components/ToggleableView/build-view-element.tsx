import React from 'react'

import { Primitive } from '../../models/interfaces'

import GridView from '../GridView/GridView'
import ListView from '../ListView/ListView'


function buildListElement<T extends {[key: string]: Primitive}>(data: T): JSX.Element {
  let list: Primitive[] = []
  for (const key in data) {
    list = [...list, `${key}: ${data[key]}`]
  }

  return <ListView list= { list } />
}

function buildGridElement<T extends {[key: string]: Primitive}>(data: T): JSX.Element {
  let grid: Primitive[][] = []
  for (const key in data) {
    grid = [...grid, [key, data[key]]]
  }

  return <GridView grid={ grid } />
}

function buildDataView<T extends {[key: string]: Primitive}>(data: T, viewType: string): JSX.Element {
  switch (viewType) {
    case 'list':
      return buildListElement(data)
    case 'grid':
      return buildGridElement(data)
    default:
      throw new Error(`Cannot build view, view type of ${viewType} is not valid`)
  }
}


export {
  buildDataView
}
