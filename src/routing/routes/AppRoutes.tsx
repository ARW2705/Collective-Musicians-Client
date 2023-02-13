import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../../pages/Home/Home'
import Query from '../../pages/Query/Query'

import './AppRoutes.css'

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/query' element={ <Query /> } />
    </Routes>
  )
}


export default AppRoutes
