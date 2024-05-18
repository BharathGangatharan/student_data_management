import React from 'react';
import Container from 'react-bootstrap/Container';
import './staff.scss';

const StaffMarkAndAttendance = () => {
    return (
        <div id='staffMarkAttendanceId'>
            <Container className='staffMarkAndAttendance'>
                <div className='markAttendanceBlocks'>
                    <div>Marks</div>
                    <div>Attendance</div>
                </div>
            </Container>
        </div>
    )
}

export default StaffMarkAndAttendance;