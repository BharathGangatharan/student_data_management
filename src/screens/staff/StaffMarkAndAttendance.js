import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './staff.scss';

const StaffMarkAndAttendance = () => {

    const navigate = useNavigate();
    const urlId = window.location.href.split('?')[1];

    const navigateMark = ()=>{
        navigate(`/staff/marks/${urlId}`);
    }

    const navigateAttendance = ()=>{
        navigate(`/staff/attendance/${urlId}`);
    }

    return (
        <div id='staffMarkAttendanceId'>
            <Container className='staffMarkAndAttendance'>
                <div className='markAttendanceBlocks'>
                    <div onClick={navigateMark}>Marks</div>
                    <div onClick={navigateAttendance}>Attendance</div>
                </div>
            </Container>
        </div>
    )
}

export default StaffMarkAndAttendance;