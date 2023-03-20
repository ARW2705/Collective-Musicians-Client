import React, { useEffect, useRef, useState } from 'react'

import { get          } from '../../http/client'
import { Announcement } from '../../models/announcement'

import './Announcements.css'


function AnnouncementsComponent(): JSX.Element {
  const [ message, setMessage ] = useState<string[]>([])
  const [ page, setPage ] = useState<number>(0)
  const announcements = useRef<Announcement[]>([])

  useEffect(() => {
    async function getAnnouncements() {
      try {
        const recentAnnouncements = await get<Announcement[]>('announcements')
        if (recentAnnouncements) announcements.current = recentAnnouncements
      } catch (error) {
        console.log('announcements error', error)
      }
    }

    getAnnouncements()
  }, [])

  
  return (
    <div className='announcements-container'>

    </div>
  )
}


export default AnnouncementsComponent
