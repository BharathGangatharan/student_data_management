import React,{useEffect} from 'react';
import Button from '../../components/button/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loader from '../../components/loading/Loader';
import { Bars } from 'react-loader-spinner';
import {useSendTeacherId} from '../../utils/payload/useStaffPayload';

const StaffHome = () => {
    const navigate = useNavigate();

    const sendTeacherId = useSendTeacherId();
    const getClassData = useSelector((state)=>state?.staffReducer);

    const navigateNext = (e,item)=> {
      e.preventDefault();
        if(!e.target.classList.contains('button-d') && !e.target.classList.contains('approval')) {
            navigate(`marks-attendance?${item.CLASSDESCRIPTION.replace(" ","")}`,{
                state:{
                    data:item
                }
            });
        }
    }

    const navigateMark = (e,item)=>{
        e.preventDefault();
        if(e.target.classList.contains('button-d') && !e.target.classList.contains('approval')) {
            navigate(`marks/${item.CLASSDESCRIPTION.replace(" ","")}`,{
                state:{
                    data:item
                }
            });
        }
    }

    const navigateAttendance = (e,item)=>{
      e.preventDefault();
        if(e.target.classList.contains('button-d') && !e.target.classList.contains('approval')) {
            navigate(`attendance/${item.CLASSDESCRIPTION.replace(" ","")}`);
        }
    }

    const navigateApproval = (e,item) => {
      e.preventDefault();
      if(e.target.classList.contains('approval')) {
        navigate(`/approval`,{
          state:{
            data:item
        }
        });
      }
    }

    useEffect(()=>{

      if(getClassData?.classList.length === 0) {
        sendTeacherId();
      }
        
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
                      navigateApproval(e, getClassData?.getMyClass);
                    }}
                    className={"approval"}
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