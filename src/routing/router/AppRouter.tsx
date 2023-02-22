import React from 'react'

import Header    from '../../components/Header/Header'
import Footer    from '../../components/Footer/Footer'
import AppRoutes from '../routes/AppRoutes'

import './AppRouter.css'


function AppRouter() {
  return (
    <div id='app-router-container'>
      <Header />
      <main id='app-router-content'>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}


export default AppRouter
