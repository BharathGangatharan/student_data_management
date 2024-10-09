import React from 'react';
import './announcementBanner.scss';
import { TfiAnnouncement } from "react-icons/tfi";

const AnnouncementBanner = () => {
  return (
    <div className='banner'>
        <div className='bannerText'>
            <span><TfiAnnouncement />&nbsp;&nbsp;Please check and approve the pending leave requests.</span>
            <span><TfiAnnouncement />&nbsp;&nbsp;Please check and approve the pending leave requests.</span>
        </div>
    </div>
  )
}

export default AnnouncementBanner;