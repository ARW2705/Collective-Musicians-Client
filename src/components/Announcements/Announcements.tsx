import React, { useEffect, useRef, useState } from 'react'

import { PaginationContext } from '../../contexts/pagination'
import { get               } from '../../http/client'
import { Announcement      } from '../../models/announcement'

import Pagination from '../Pagination/Pagination'

import './Announcements.css'


function AnnouncementsComponent(): JSX.Element {
  const [ announcement, setAnnouncement ] = useState<Announcement>()
  const [ page, setPage ] = useState<number>(0)
  const [ pageCount, setPageCount ] = useState<number>(0)
  const announcements = useRef<Announcement[]>([])

  useEffect(() => {
    async function getAnnouncements() {
      try {
        const recentAnnouncements = await get<Announcement[]>('announcements')
        if (recentAnnouncements && recentAnnouncements.length) {
          announcements.current = recentAnnouncements
            .sort((a1: Announcement, a2: Announcement): number => a2.importance - a1.importance)
          setPageCount(announcements.current.length)
          setAnnouncement(announcements.current[0])
        }
      } catch (error) {
        console.log('announcements error', error)
      }
    }

    getAnnouncements()
  }, [])

  useEffect(() => {
    if (page < announcements.current.length) setAnnouncement(announcements.current[page])
  }, [page])
  
  return (
    <div className={ `announcements-container importance-${ announcement?.importance }` }>
      <PaginationContext.Provider value={ { page, setPage, pageCount, pageLimit: 5 } }>
        <p>{ announcement?.message }</p>
        <Pagination type='pip' />
      </PaginationContext.Provider>
    </div>
  )
}


export default AnnouncementsComponent
