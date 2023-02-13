import React, { memo } from 'react'

import './Divider.css'


function Divider(): JSX.Element {
  return (
    <div className='app-divider'></div>
  )
}


export default memo(Divider)
