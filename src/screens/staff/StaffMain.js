import React from 'react';
import StaffHome from './StaffHome';
import './staff.scss';
import AnnouncementBanner from '../../components/announcement_banner/AnnouncementBanner';
import {useSelector} from 'react-redux';

const StaffMain = () => {

  const getTeacherData = useSelector((state)=>state?.staffReducer?.getLeaveApprovals);

  return (
    <div className="staffContainer">
      {getTeacherData.length > 0 && <AnnouncementBanner />}
      <StaffHome />
    </div>
  )
}

export default StaffMain