import React, { memo, useEffect, useState } from 'react'
import { FaListUl, FaTable } from 'react-icons/fa'

import { QueryResult } from '../../models/query-result'

import Accordion      from '../Accordion/Accordion'
import Button         from '../Button/Button'
import KeyVal         from '../KeyVal/KeyVal'
import ToggleableView from '../ToggleableView/ToggleableView'

import './QueryResult.css'


export interface QueryResultProps {
  results: QueryResult
}

function QueryResultComponent({ results }: QueryResultProps): JSX.Element {
  const [ showAdditional, setShowAdditional ] = useState<boolean>(false)

  useEffect(() => {
    setShowAdditional(false)
  }, [results])
  
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
      const { [aboveFoldKey]: _, ...belowFoldResults }: QueryResult = results
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
          onClick={ () => setShowAdditional(prevState => !prevState) }
          flat
        >
          { `Show ${showAdditional ? 'Less' : 'More'}` }
        </Button>
      </div>
      <Accordion
        show={ showAdditional }
        customClass='query-result-remainder'
      >
        { belowFoldElement }
      </Accordion>
    </div>
  )
}


export default memo(QueryResultComponent)
