import React from 'react'

import Announcements from '../../components/Announcements/Announcements'
import Image from '../../components/Image/Image'

import './Home.css'


function Home(): JSX.Element {
  const bannerMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Velit ut tortor pretium viverra'
  
  return (
    <div id='home-page' className='route'>
      <div id='content-container'>
        <Image
          src='home_640.jpg'
          alt='sheet music with orchestra in background'
          customClass='banner-image'
        />
        <p>{ bannerMessage }</p>
        <Announcements />
      </div>
    </div>
  )
}


export default Home
