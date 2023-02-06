import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../../pages/Home/Home'

import './AppRoutes.css'

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
    </Routes>
  )
}


export default AppRoutes
