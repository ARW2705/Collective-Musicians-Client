import React, { useState } from 'react'
import { FaListUl, FaTable } from 'react-icons/fa'

import { QueryResponse } from '../../models/interfaces'

import Accordion from '../Accordion/Accordion'
import Button from '../Button/Button'
import KeyVal from '../KeyVal/KeyVal'
import ToggleableView from '../ToggleableView/ToggleableView'

import './QueryResult.css'


export interface QueryResultProps {
  results: QueryResponse
}

function QueryResultComponent({ results }: QueryResultProps): JSX.Element {
  const [ showAdditional, setShowAdditional ] = useState<boolean>(false)
  
  const keys: string[] = Object.keys(results)
  let aboveFoldElement: JSX.Element = <span>Missing Results</span>
  let belowFoldElement: JSX.Element = <span>No Further Data</span>

  if (keys.length > 0) {
    const aboveFoldKey: string = keys[0]
    aboveFoldElement = (
      <KeyVal
        customClass='query-result'
        pair={ { [aboveFoldKey]: results[aboveFoldKey] } }
      />
    )

    if (keys.length > 1) {
      const { [aboveFoldKey]: _, ...belowFoldResults }: QueryResponse = results
      belowFoldElement = (
        <ToggleableView
          displayData={ belowFoldResults }
          viewOptions={ [
            { name: 'list', icon: <FaListUl /> },
            { name: 'grid', icon: <FaTable /> }
          ] }
        />
      )
    }
  }

  return (
    <div className='query-result-container'>
      <div className={ `query-result-header ${showAdditional ? 'divider' : ''}` }>
        { aboveFoldElement }
        <Button
          name='toggle-accordion'
          customClass='accordion-button'
          innerText={ `Show ${showAdditional ? 'Less' : 'More'}` }
          onClick={ () => setShowAdditional(prevState => !prevState) }
          flat
        />
      </div>
      <Accordion
        element={ belowFoldElement }
        show={ showAdditional }
        customClass='query-result-remainder'
      />
    </div>
  )
}


export default React.memo(QueryResultComponent)
