import React,{useState,useEffect} from 'react';
import './adminTimeTable.scss';
import Table from 'react-bootstrap/Table';
import {useDispatch, useSelector} from 'react-redux';
import Form from 'react-bootstrap/Form';
import {getTimeTableClassList,getTimeTableSubjectList,resetTimeTableSubjectList,timeTableUpdation} from '../../store/timeTableReducer/action';
import Button from '../../components/button/Button';
import { ColorRing } from 'react-loader-spinner';
import Loader from '../../components/loading/Loader';


const AdminTimeTable = () => {

    const [classId,setClassId] = useState("");
    const [selectedData, setSelectedData] = useState([]);
    const [highlightedCell, setHighlightedCell] = useState([{ row: null, column: null }]);

    const dispatch = useDispatch();

    const timeTableData = useSelector((state)=>state?.timeTableReducer);
    const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


    const selectClassHandler = (e)=>{
        setClassId(e.target.value);
        selectedData.length > 0 && setSelectedData([]);
    }

    const selectTeacherHandler = (e,row,col)=>{
        const selectedOption = e.target.options[e.target.selectedIndex];
        const teacherId = selectedOption.getAttribute('data');
        const subjectId = selectedOption.value;

        let timeTableObj = {
            "ClassID": classId,
            "Day": DAYS[row],
            "Period": (col)+1,
            "SubjectId": subjectId,
            "TeacherId": teacherId
        }

        setHighlightedCell((prev)=>{
          return [...prev,{ row: row, column: col }]
        });

        setSelectedData((prev)=>{
            return [...prev,timeTableObj]
        });
        
    }

    const updateTableHandler = ()=>{
        if(selectedData.length > 0) {
          dispatch(timeTableUpdation(selectedData));
        }
    }


    useEffect(()=>{
        dispatch(getTimeTableClassList());
        // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        if(classId !== "" && classId !== "select") {
            const sendClassId = {
                "classId": classId
            }
            if(timeTableData?.tableSubjectList.length > 0){
              dispatch(resetTimeTableSubjectList([]))
            }
            dispatch(getTimeTableSubjectList(sendClassId));
            
        }
        // eslint-disable-next-line
    },[classId]);

    useEffect(()=>{
        if(timeTableData?.tableUpdate?.Result?.toLowerCase() === "success") {
          setSelectedData([]);
        }
        // eslint-disable-next-line
    },[timeTableData?.tableUpdate]);


    return (
      <div className="adminTimeTableContainer">
        <div className="timeTableContent">
          <div className="dropDownHeader">
            <h4>Class</h4>
            <Form.Select
              value={classId}
              onChange={(e) => {
                selectClassHandler(e);
              }}
            >
              <option value="select">select</option>
              {timeTableData?.tableAllClassList?.map((eachClass) => {
                return (
                  <option value={eachClass.ClassID}>
                    {eachClass.ClassValue}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          {classId !== "" ? timeTableData?.tableSubjectList.length === 0 ?(
            <div className='loader'>
              <Loader label={"Loading..."} horizontal={true} labelColor={'#ffdb70'}>
                <ColorRing
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#ffdb70','#ffdb70','#ffdb70','#ffdb70','#ffdb70']}
                />
              </Loader>
            </div>
          ):  (
            <>
              <div className="timeTableWrapper">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Periods/Days</th>
                      {Array.from({ length: 8 }).map((_, index) => (
                        <th key={index}>{`Period-${index + 1}`}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 6 }).map((_, rowIndex) => {
                      return (
                        <tr key={rowIndex}>
                          <td className="weekdays">{DAYS[rowIndex]}</td>
                          {Array.from({ length: 8 }).map((_, colIndex) => (
                            <td key={colIndex} className="subjects">
                              <select
                                onChange={(e) => {
                                  selectTeacherHandler(e, rowIndex, colIndex);
                                }}
                                className={((highlightedCell[0].row !==null) && (highlightedCell[rowIndex].row === rowIndex && highlightedCell[colIndex].column === colIndex)) ? 'highlighted' : ''}
                              >
                                <option value={"select"}>select</option>
                                {timeTableData?.tableSubjectList?.filter((data)=> (data.Day === DAYS[rowIndex] && data.Period === colIndex + 1)).map((classDesc, index) => {
                                  return (
                                    <option
                                      key={index}
                                      data={classDesc.TeacherId}
                                      value={classDesc.SubjectId}
                                    >
                                      {classDesc.Description}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="updateButtonWrapper">
                {
                  selectedData.length > 0 && (
                    <Button
                      label={"Update Table"}
                      style={{ backgroundColor: "#fff" }}
                      onClick={updateTableHandler}
                      className={`${selectedData.length === 0 && `disbaled`}`}
                    />
                  )
                }
              </div>
            </>
          ) : (
            <div className="info">To view the schedule, please select your class from the dropdown menu above.*</div>
          )}
        </div>
      </div>
    );
}

export default AdminTimeTable;