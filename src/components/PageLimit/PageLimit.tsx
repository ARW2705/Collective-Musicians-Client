import React, { memo, useContext } from 'react'

import { PaginationContext } from '../../contexts/pagination'
import { SelectOption } from '../../models/select-option'

import Select from '../Select/Select'

import './PageLimit.css'


function PageLimitComponent(): JSX.Element {
  const { pageLimit, setPageLimit = () => {} } = useContext(PaginationContext)
  const pageOptions: SelectOption<number>[] = [
    { label: '5'  , value: 5   },
    { label: '15' , value: 15  },
    { label: '50' , value: 50  },
    { label: '100', value: 100 }
  ]

  return (
    <div className='page-limit-container'>
      <Select
        onChange={ (values: number[]) => setPageLimit(values[0]) }
        options={ pageOptions }
        defaultSelections={ [0] }
        title={ `Page Limit: ${pageLimit}` }
      />
    </div>
  )
}


export default memo(PageLimitComponent)
