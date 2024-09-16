import React,{useEffect} from 'react';
import Button from '../../components/button/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getClassList,getTeacherDetails,getMyClass} from '../../store/staffReducer/action';
import {getStaffTimeTable} from '../../store/timeTableReducer/action';
import Loader from '../../components/loading/Loader';
import { Bars } from 'react-loader-spinner';

const StaffHome = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getClassData = useSelector((state)=>state?.staffReducer);
    const loginState = useSelector((state)=>state?.loginReducer?.login);

    const navigateNext = (e,item)=> {
        if(!e.target.classList.contains('button-d')) {
            navigate(`marks-attendance?${item.CLASSDESCRIPTION.replace(" ","")}`,{
                state:{
                    data:item
                }
            });
        }
    }

    const navigateMark = (e,item)=>{
        if(e.target.classList.contains('button-d')) {
            navigate(`marks/${item.CLASSDESCRIPTION.replace(" ","")}`,{
                state:{
                    data:item
                }
            });
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

        dispatch(getMyClass(sendTeacherId));

        dispatch(getStaffTimeTable(sendTeacherId));
        
        // eslint-disable-next-line
    },[])
    
    return (
      <div id="staffHomeId">
        <Container className="staffHome">
          <div className="classContainer">
            {getClassData?.classList?.length === 0 ? (
              <Loader
                label={"Fetching Data"}
                labelColor={"#ffdb70"}
                horizontal={false}
              >
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
            ) : (
              <div>
                {getClassData?.classList?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="itemBlock"
                      onClick={(e) => {
                        navigateNext(e, item);
                      }}
                    >
                      <div className="itemContent">
                        <div>{item?.CLASSDESCRIPTION}</div>
                        <div>{item?.DESCRIPTION}</div>
                      </div>
                      <div className="hoverButton">
                        <Button
                          label={"Marks"}
                          onClick={(e) => {
                            navigateMark(e, item);
                          }}
                        />
                        <Button
                          label={"Attendance"}
                          onClick={(e) => {
                            navigateAttendance(e, item);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="myClassContainer">
            <div>
            {Object.keys(getClassData?.getMyClass).length > 0 && (
              <div
                className="itemBlock"
                onClick={(e) => {
                  navigateNext(e, getClassData?.getMyClass);
                }}
              >
                <div className="itemContent">
                  <div>MY CLASS</div>
                  <div>{getClassData?.getMyClass?.CLASSDESCRIPTION}</div>
                </div>
                <div className="hoverButton">
                  <Button
                    label={"Marks Approval"}
                    onClick={(e) => {
                      navigateMark(e, getClassData?.getMyClass);
                    }}
                  />
                  <Button
                    label={"Attendance"}
                    onClick={(e) => {
                      navigateAttendance(e, getClassData?.getMyClass);
                    }}
                  />
                  <Button
                    label={"Timetable"}
                    onClick={(e) => {
                      navigateAttendance(e, getClassData?.getMyClass);
                    }}
                  />
                </div>
              </div>
            )}
            </div>
          </div>
        </Container>
      </div>
    );
}

export default StaffHome;