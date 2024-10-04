import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {summarySubject,summaryRowHeader} from '../../dummyData';
import {useLocation} from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import Loader from '../../components/loading/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {getMyClassMarks,getMyClassSubjects,getStudentSummary,approveStudentsMarks,getApprovedStudentsMarks,resetApproveStudentsMarks,getMyClassSubAverage} from '../../store/staffReducer/action';
import Button from '../../components/button/Button';
import { IoTrophy } from "react-icons/io5";

const MarksApproval = () => {
    const [exam,setExam] = useState('');
    const [approveCells, setApproveCells] = useState([]);
    const [remark, setRemark] = useState([]);
    const [approveError, setApproveError] = useState(false);
    const [remarksError, setRemarksError] = useState(false);
    const [approvStatus, setApproveStatus] = useState(false);
    const [updatedStatus, setUpdateStatus] = useState(false);
    const [makeDisabled, setMakeDisabled] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();
    const studentDataState = useSelector((state)=>state?.staffReducer);

    //console.log(studentDataState?.classStudentList)
    
    //exam selection handler
    const examSelectHandler = (e)=>{
        setExam(e.target.value);
    }

    const updateApproval = (e,studentId,totMarks,percentage,subjectsFailed,index,rowIndex) => {

        if(remark.length === studentDataState?.getMyClassMarks.length){
            remarksError && setRemarksError(false);
            approveError && setApproveError(false);
            const getRemarks = remark.length > 0 && remark.filter((item)=> item.id === studentId)
            if(e.target.checked) {
                const approvedData = {
                    STUDENTID: studentId,
                    TYPEOFEXAM: exam,
                    TEACHERID: studentDataState?.teacherDetail?.TEACHERID,
                    TOTAL_MARKS: totMarks,
                    PERCENTAGEMARKS: percentage,
                    NO_OF_SUBJECTS_FAILED: subjectsFailed,
                    ISAPPROVED: e.target.checked ? 1 : 0,
                    REMARKS: getRemarks ? getRemarks[0]?.text : ""
                }
                setApproveCells((prev)=>{
                    return [...prev,approvedData]
                });
            } else {
                const updatedData = approveCells.filter((id)=> id.STUDENTID !== studentId)
                setApproveCells(updatedData);
            }
        } else {
            setRemarksError(true);
        }

    }

    const updateRemark = (e, studentId) => {
        const remarksData = {
            text: e.target.value,
            id: studentId
        }

        setRemark((prevRemarks) => {
            const existingRemarkIndex = prevRemarks.findIndex((item) => item.id === studentId);
            if (existingRemarkIndex !== -1) {
              // Update the existing remark
              return prevRemarks.map((item, index) =>
                index === existingRemarkIndex ? { ...item, text: e.target.value } : item
              );
            } else {
              // Add a new remark
              return [...prevRemarks, remarksData];
            }
          });

    };

    const approveHandler = () => {
        if((approveCells.length === studentDataState?.getMyClassMarks.length) && (remark.length === studentDataState?.getMyClassMarks.length)) {
            setApproveStatus(true);
            dispatch(approveStudentsMarks(approveCells));
        } else {
            setApproveError(true);
            console.log("Please approve all the data")
        }
    }

    //top rank students
    const combinedStudentsData = studentDataState?.displaySummary.map(score => {
      const studentNameObj = studentDataState?.classStudentList.find(name => name.STUDENTID === score.STUDENTID);
      return {
          ...score,
          STUDENT_NAME: studentNameObj ? studentNameObj.STUDENT_NAME : ''
      };
      
    });

    const sortedStudents = combinedStudentsData.sort((a, b) => b.TOTAL_MARKS - a.TOTAL_MARKS);
    const topStudents = sortedStudents.slice(0, 3);

    //remarks for students
    const remarkStudentsData = studentDataState?.getApprovedStudentsList.map(remark=>{
      const studentObj = studentDataState?.classStudentList.find(name => name.STUDENTID === remark.STUDENTID);
      return {
        ...remark,
        STUDENT_NAME: studentObj ? studentObj.STUDENT_NAME : ''
      }
    });

    useEffect(()=>{
        if(exam !== ""){
            const getAllSubjects = {
                    CLASSID: location?.state?.data?.CLASSID,
                    TYPEOFEXAM: exam
            }
            const getClassMarks = {
                TEACHERID: studentDataState?.teacherDetail?.TEACHERID,
                TYPEOFEXAM: exam
            }

            const allStudentSummary = {
                CLASSID: location?.state?.data?.CLASSID,
                TEACHERID: studentDataState?.teacherDetail?.TEACHERID,
                TYPEOFEXAM: exam
            }

            dispatch(getMyClassSubjects(getAllSubjects));
            dispatch(getMyClassMarks(getClassMarks));
            dispatch(getStudentSummary(allStudentSummary));
            dispatch(getApprovedStudentsMarks(getClassMarks));
            dispatch(getMyClassSubAverage(getAllSubjects))
        }
        
        // eslint-disable-next-line
    },[exam])

    useEffect(()=>{
        if(studentDataState?.approvedMarks?.RESULT?.toLowerCase() === "marks approved"){
            setUpdateStatus(true);
            setMakeDisabled(true);
            const getApprovedStud = {
                TEACHERID: studentDataState?.teacherDetail?.TEACHERID,
                TYPEOFEXAM: exam
            }
            const getClassSubAvg = {
                CLASSID: location?.state?.data?.CLASSID,
                TYPEOFEXAM: exam
            }
            setApproveStatus(false);
            dispatch(getApprovedStudentsMarks(getApprovedStud));
            dispatch(resetApproveStudentsMarks([]));
            dispatch(getMyClassSubAverage(getClassSubAvg))
        }

        //eslint-disable-next-line
    },[studentDataState?.approvedMarks])

    // useEffect(()=>{
    //     console.log(approveCells);
    // },[approveCells])

    return (
      <div id="staffMarksApprovalId">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="approvalWrapper">
                <h2>MARKS APPROVAL</h2>
                <div className="tableTopHeader">
                  <h4>Class: {location?.state?.data?.CLASSDESCRIPTION}</h4>
                  <div className="examType">
                    <Form.Select
                      size="sm"
                      value={exam}
                      onChange={(e) => {
                        examSelectHandler(e);
                      }}
                    >
                      <option>Select Exams</option>
                      {studentDataState?.typeofExams &&
                        studentDataState?.typeofExams?.map((exmType) => {
                          return (
                            <option key={exmType.EXAMID} value={exmType.EXAMID}>
                              {exmType.EXAMTYPE}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </div>
                </div>
                <div className="summaryTable">
                  {exam !== "" ? (
                    studentDataState?.getMyClassMarks.length === 0 ? (
                      <div className="loader">
                        <Loader
                          label={"Loading..."}
                          labelColor={"#fff"}
                          horizontal={true}
                        >
                          <ColorRing
                            visible={true}
                            height="50"
                            width="50"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                          />
                        </Loader>
                      </div>
                    ) : (
                      <div className="marksTable">
                        <Table bordered responsive>
                          <thead>
                            <tr>
                              <th>Names</th>
                              {studentDataState?.getMyClassSubjects?.map(
                                (sub) => {
                                  return summarySubject?.map((subId) => {
                                    const subjectName = subId[sub?.SUBJECTID];
                                    if (subjectName) {
                                      return (
                                        <th key={sub?.SUBJECTID}>
                                          {subjectName}
                                        </th>
                                      );
                                    }
                                    return null;
                                  });
                                }
                              )}
                              <th>Total</th>
                              <th>Avg</th>
                              <th>Remarks</th>
                              <th>Approval</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({
                              length: studentDataState?.classStudentList.length,
                            }).map((_, rowIndex) => {
                              return (
                                <tr key={rowIndex}>
                                  <td>
                                    {
                                      studentDataState?.getMyClassMarks[
                                        rowIndex
                                      ].STUDENT_NAME
                                    }
                                  </td>
                                  <td>
                                    {
                                      studentDataState?.getMyClassMarks[
                                        rowIndex
                                      ]?.SB001
                                    }
                                  </td>
                                  <td>
                                    {
                                      studentDataState?.getMyClassMarks[
                                        rowIndex
                                      ]?.SB002
                                    }
                                  </td>
                                  <td>
                                    {
                                      studentDataState?.getMyClassMarks[
                                        rowIndex
                                      ]?.SB003
                                    }
                                  </td>
                                  <td>
                                    {
                                      studentDataState?.getMyClassMarks[
                                        rowIndex
                                      ]?.SB004
                                    }
                                  </td>
                                  <td>
                                    {
                                      studentDataState?.getMyClassMarks[
                                        rowIndex
                                      ]?.SB005
                                    }
                                  </td>
                                  <td>
                                    {
                                      studentDataState?.displaySummary[rowIndex]
                                        ?.TOTAL_MARKS
                                    }
                                  </td>
                                  <td>
                                    {
                                      studentDataState?.displaySummary[rowIndex]
                                        ?.PERCENTAGE
                                    }
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      disabled={makeDisabled}
                                      value={
                                        remark.length > 0 &&
                                        remark[rowIndex]?.id ===
                                          studentDataState?.getMyClassMarks[
                                            rowIndex
                                          ]?.STUDENTID
                                          ? remark[rowIndex].text
                                          : ""
                                      }
                                      className="remarks"
                                      onChange={(e) => {
                                        updateRemark(
                                          e,
                                          studentDataState?.getMyClassMarks[
                                            rowIndex
                                          ]?.STUDENTID
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      disabled={makeDisabled}
                                      checked={approveCells.some(
                                        (cell) =>
                                          cell.STUDENTID ===
                                          studentDataState?.getMyClassMarks[
                                            rowIndex
                                          ]?.STUDENTID
                                      )}
                                      className="approval"
                                      onChange={(e, index) => {
                                        updateApproval(
                                          e,
                                          studentDataState?.getMyClassMarks[
                                            rowIndex
                                          ]?.STUDENTID,
                                          studentDataState?.displaySummary[
                                            rowIndex
                                          ]?.TOTAL_MARKS,
                                          studentDataState?.displaySummary[
                                            rowIndex
                                          ]?.PERCENTAGE,
                                          studentDataState?.displaySummary[
                                            rowIndex
                                          ]?.NO_OF_SUBJECTS_FAIL,
                                          index,
                                          rowIndex
                                        );
                                      }}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )
                  ) : (
                    <div className="infoMsg">
                      *Please select the exam type to see the Students Marks
                      Summary.
                    </div>
                  )}
                </div>
                <div className="approveButton">
                  {approveCells.length > 0 && (
                    <Button
                      label={`${
                        updatedStatus
                          ? "Approved Successfully"
                          : approvStatus
                          ? "Loading..."
                          : "Approve"
                      }`}
                      onClick={approveHandler}
                    />
                  )}
                </div>
                {remarksError && (
                  <div className="approveError">
                    <sup>*</sup>Please update remarks for all the students.
                  </div>
                )}
                {approveError && (
                  <div className="approveError">
                    <sup>*</sup>Please approve all the students marks data.
                  </div>
                )}
                {exam !== "" && studentDataState?.getClassSubAvg.length > 0 && (
                  
                    <div className="OverAllStatus">
                      <div className="subjectStatus">
                        <Table bordered responsive>
                          <thead>
                            <tr>
                              <th>Subject Status</th>
                              {studentDataState?.getClassSubAvg?.map((sub) => {
                                return summarySubject?.map((subId) => {
                                  const subjectName = subId[sub?.SUBJECTID];
                                  if (subjectName) {
                                    return (
                                      <th key={sub?.SUBJECTID}>{subjectName}</th>
                                    );
                                  }
                                  return null;
                                });
                              })}
                            </tr>
                          </thead>
                          <tbody>
                              <tr>
                                <td>Sub Average</td>
                                <td>{studentDataState?.getClassSubAvg[0]?.AVERAGEMARKS}</td>
                                <td>{studentDataState?.getClassSubAvg[1]?.AVERAGEMARKS}</td>
                                <td>{studentDataState?.getClassSubAvg[2]?.AVERAGEMARKS}</td>
                                <td>{studentDataState?.getClassSubAvg[3]?.AVERAGEMARKS}</td>
                                <td>{studentDataState?.getClassSubAvg[4]?.AVERAGEMARKS}</td>
                              </tr>
                              <tr>
                                <td>Student's Passed</td>
                                <td>{studentDataState?.getClassSubAvg[0]?.NOOFSTUDENTSPASSED}</td>
                                <td>{studentDataState?.getClassSubAvg[1]?.NOOFSTUDENTSPASSED}</td>
                                <td>{studentDataState?.getClassSubAvg[2]?.NOOFSTUDENTSPASSED}</td>
                                <td>{studentDataState?.getClassSubAvg[3]?.NOOFSTUDENTSPASSED}</td>
                                <td>{studentDataState?.getClassSubAvg[4]?.NOOFSTUDENTSPASSED}</td>
                              </tr>
                              <tr>
                                <td>Student's Failed</td>
                                <td>{studentDataState?.getClassSubAvg[0]?.NOOFSTUDENTSFAILED}</td>
                                <td>{studentDataState?.getClassSubAvg[1]?.NOOFSTUDENTSFAILED}</td>
                                <td>{studentDataState?.getClassSubAvg[2]?.NOOFSTUDENTSFAILED}</td>
                                <td>{studentDataState?.getClassSubAvg[3]?.NOOFSTUDENTSFAILED}</td>
                                <td>{studentDataState?.getClassSubAvg[4]?.NOOFSTUDENTSFAILED}</td>
                              </tr>
                              <tr>
                                <td>Pass %</td>
                                <td>{studentDataState?.getClassSubAvg[0]?.PASSPERCENTAGE}</td>
                                <td>{studentDataState?.getClassSubAvg[1]?.PASSPERCENTAGE}</td>
                                <td>{studentDataState?.getClassSubAvg[2]?.PASSPERCENTAGE}</td>
                                <td>{studentDataState?.getClassSubAvg[3]?.PASSPERCENTAGE}</td>
                                <td>{studentDataState?.getClassSubAvg[4]?.PASSPERCENTAGE}</td>
                              </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="studentStatus">
                        <Table bordered responsive>
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Names</th>
                                <th>Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                            {topStudents.map((student, index) => (
                              <tr key={student.STUDENTID}>
                                  <td>{index + 1}-<IoTrophy /></td>
                                  <td>{student.STUDENT_NAME}</td>
                                  <td>{student.PERCENTAGE}%</td>
                              </tr>
                            ))}
                            </tbody>
                        </Table>
                      </div>
                    </div>
                  
                )}

                {
                  exam !== "" && studentDataState?.getApprovedStudentsList.length > 0 && (
                    <div className='remarksBlock'>
                      <Table bordered responsive>
                        <thead>
                          <tr>
                            <th>Names</th>
                            <th>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                              remarkStudentsData?.map((student,index)=>(
                                <tr key={student.STUDENTID}>
                                  <td>{student?.STUDENT_NAME}</td>
                                  <td>{student?.REMARKS}</td>
                                </tr>
                              ))
                            }
                        </tbody>
                      </Table>
                    </div>
                  )
                }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default MarksApproval;