import React from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

const StaffHome = () => {
    const classList = ['ECE-A','BME-B','CSE-A'];
    const navigate = useNavigate();

    const navigateNext = (item)=>{
        navigate(`marks-attendance/${item}`);
    }
    
    return (
        <div id="staffHomeId">
            <Container className='staffHome'>
                <div className='classContainer'>
                    {
                        classList.map((item,index)=>{
                        return (
                            <div key={index} className='itemBlock' onClick={()=>{navigateNext(item)}}>
                                {item}
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