import React from 'react';
import Button from '../../components/button/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

const StaffHome = () => {
    const classList = ['ECE-A','BME-B','CSE-A'];
    const navigate = useNavigate();

    const navigateNext = (e,item)=> {
        if(!e.target.classList.contains('button-d')) {
            navigate(`marks-attendance?${item}`);
        }
    }

    const navigateMark = (e,item)=>{
        if(e.target.classList.contains('button-d')) {
            navigate(`marks/${item}`);
        }
    }

    const navigateAttendance = (e,item)=>{
        if(e.target.classList.contains('button-d')) {
            navigate(`attendance/${item}`);
        }
    }
    
    return (
        <div id="staffHomeId">
            <Container className='staffHome'>
                <div className='classContainer'>
                    {
                        classList.map((item,index)=>{
                        return (
                            <div key={index} className='itemBlock' onClick={(e)=>{navigateNext(e,item)}}>
                                {item}
                                <div className='hoverButton'>
                                    <Button label={"Marks"} onClick={(e)=>{navigateMark(e,item)}}/>
                                    <Button label={"Attendance"} onClick={(e)=>{navigateAttendance(e,item)}}/>
                                </div>
                            </div>
                        )
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default StaffHome;