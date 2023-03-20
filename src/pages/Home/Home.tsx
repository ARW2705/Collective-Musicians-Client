import React from 'react'

import Announcements from '../../components/Announcements/Announcements'
import Image         from '../../components/Image/Image'

import './Home.css'


function HomePage(): JSX.Element {
  const bannerMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  
  return (
    <div id='home-page' className='route'>
      <div id='content-container'>
        <Image
          src='home_640.jpg'
          alt='sheet music with orchestra in background'
          customClass='banner-image'
        />
        <h2>{ bannerMessage }</h2>
        <Announcements />
      </div>
    </div>
  )
}


export default HomePage
