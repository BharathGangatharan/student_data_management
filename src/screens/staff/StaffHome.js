import React,{useEffect} from 'react';
import Button from '../../components/button/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getClassList,getTeacherDetails} from '../../store/staffReducer/action';
import Loader from '../../components/loading/Loader';
import { Bars } from 'react-loader-spinner';

const StaffHome = () => {
    // const classList = ['ECE-A','BME-B','CSE-A'];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getClassAllList = useSelector((state)=>state?.staffReducer?.classList);
    const loginState = useSelector((state)=>state?.loginReducer?.login);

    const navigateNext = (e,item)=> {
        if(!e.target.classList.contains('button-d')) {
            navigate(`marks-attendance?${item.CLASSDESCRIPTION.replace(" ","")}`);
        }
    }

    const navigateMark = (e,item)=>{
        if(e.target.classList.contains('button-d')) {
            navigate(`marks/${item.CLASSDESCRIPTION.replace(" ","")}`);
        }
    }

    const navigateAttendance = (e,item)=>{
        if(e.target.classList.contains('button-d')) {
            navigate(`attendance/${item.CLASSDESCRIPTION.replace(" ","")}`);
        }
    }

    useEffect(()=>{

        const sendTeacherId = {
            "TEACHERID":loginState?.TEACHERID
        }

        dispatch(getClassList(sendTeacherId));

        dispatch(getTeacherDetails(sendTeacherId));

    },[])
    
    return (
        <div id="staffHomeId">
            <Container className='staffHome'>
                <div className='classContainer'>
                    {
                        
                        (getClassAllList?.length === 0) ? 
                        (
                            <Loader label={"Fetching Data"} labelColor={'#ffdb70'} horizontal={false}>
                                <Bars
                                    height="80"
                                    width="80"
                                    color="#ffdb70"
                                    ariaLabel="bars-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </Loader>
                        ):(
                            getClassAllList?.map((item,index)=>{
                                return (
                                    <div key={index} className='itemBlock' onClick={(e)=>{navigateNext(e,item)}}>
                                        <div className="itemContent">
                                            <div>{item?.CLASSDESCRIPTION}</div>
                                            <div>{item?.DESCRIPTION}</div>
                                        </div>
                                        <div className='hoverButton'>
                                            <Button label={"Marks"} onClick={(e)=>{navigateMark(e,item)}}/>
                                            <Button label={"Attendance"} onClick={(e)=>{navigateAttendance(e,item)}}/>
                                        </div>
                                    </div>
                                );
                            })
                        )

                    }
                </div>
            </Container>
        </div>
    )
}

export default StaffHome;