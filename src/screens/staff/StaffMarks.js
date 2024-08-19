import React,{useState,useEffect,useRef} from 'react';
import {dummyStdMarksHeader} from '../../dummyData';
import {getTypesofExam,getClassStudenList,getStudentListData,updateStudentMarksList,resetStudentListData} from '../../store/staffReducer/action';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Button from '../../components/button/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import * as XLSX from 'xlsx';
import './staff.scss';
import { ColorRing } from 'react-loader-spinner';
import Loader from '../../components/loading/Loader';
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";

const StaffMarks = () => {

    const [exam,setExam] = useState('');
    const [fileName, setFileName]= useState('');
    const [wrongFileUpload, setWrongFileUpload]= useState('');
    const [defaultStudentData,setDefaultStudentData] = useState([]);
    const [editableFieldId,setEditableFieldId] = useState('');
    const [editMark,setEditMark] = useState('');
    const [updatedMarksData,setUpdatedMarksData] = useState([]);
    const [updatedMarkStatus,setUpdatedMarkStatus] = useState(false);
    const [updateButtonStatus, setUpdateButtonStatus] = useState(false);
    const [importFileStatus, setImportFileStatus] = useState(true);

    const location = useLocation();
    const dispatch = useDispatch();
    const tableRef = useRef(null);

    const loginState = useSelector((state)=>state?.loginReducer?.login);
    const studentDataState = useSelector((state)=>state?.staffReducer);

    //exam selection handler
    const examSelectHandler = (e)=>{
        setFileName("");
        setDefaultStudentData([]);
        if(importFileStatus){
            setExam(e.target.value);

            const classData = {
                "CLASSID": location?.state?.data?.CLASSID,
                "SUBJECTID": 'SB002',
                "TEACHERID": loginState?.TEACHERID,
                "TYPEOFEXAM": e.target.value
            }
    
            dispatch(getStudentListData(classData))
        }
    }

    const importFileHandler = async (e)=>{
        setFileName("");
        setImportFileStatus(false);
        setWrongFileUpload("");
        let file = e.target.files[0];

        if(file && file.name.split('.')[1]==="xlsx") {
            dispatch(resetStudentListData([]));
            const data =  await file.arrayBuffer();
            /* data is an ArrayBuffer */
            const workBook = XLSX.read(data);

            const workSheet = workBook.Sheets[workBook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(workSheet);

            const updateStudentData = {
                "STUDENTID": "",
                "MARKS": "",
                "TEACHERID": loginState?.TEACHERID,
                "SUBJECTID": "SB002",
                "TYPEOFEXAM": exam,
                "CLASSID": location?.state?.data?.CLASSID,
            }

            const modifiedMarksData=[];

            jsonData.length > 0 && jsonData.forEach((stud,index)=>{
                studentDataState?.classStudentList.forEach((classStud,index)=>{
                    if(stud.Names.toLowerCase().trim() === classStud.STUDENT_NAME.toLowerCase().trim()){
                       const modifyObj =  {...updateStudentData, STUDENTID:classStud.STUDENTID, MARKS: stud.Marks }
                       modifiedMarksData.push(modifyObj);
                    }
                })
            });

            if(modifiedMarksData.length > 0) {
                setFileName(file.name)
                setUpdatedMarkStatus(false);
                dispatch(updateStudentMarksList(modifiedMarksData));
            }

            // Reset file input value for making subsequent import file calling
            e.target.value = null;
        } else {
            setWrongFileUpload("Please Update Correct Excel File");
        }
    }

    const doubleClickHandler = (e,id)=>{
        setEditableFieldId(id);
    }

    const editMarksHandler = (e,id,studentDetail)=>{
        const updateStudentData = {
            "STUDENTID": studentDetail.STUDENTID,
            "MARKS": e.target.value,
            "TEACHERID": loginState?.TEACHERID,
            "SUBJECTID": "SB002",
            "TYPEOFEXAM": exam,
            "CLASSID": location?.state?.data?.CLASSID,
        }

        setUpdatedMarksData((prev)=>{
            return [...prev, updateStudentData]
        });

        setEditMark('');
        setEditableFieldId('');
        setUpdateButtonStatus(true);
        
    }

    const updateMarksHandler = ()=>{
        if(updatedMarksData.length > 0) {
            setDefaultStudentData([]);
            dispatch(resetStudentListData([]));
            setUpdatedMarkStatus(false);
            dispatch(updateStudentMarksList(updatedMarksData));
        }
    }

    const downLoadExcelHandler = ()=>{
        let downLoadedFileName;
        switch(exam) {
            case '0':
                downLoadedFileName =  'Annual Exam';
                break;
            case '10':
                downLoadedFileName =  'Quarterly Exam';
                break;
            case '20':
                downLoadedFileName =  'Halfyerly Exam';
                break;
            case '4':
                downLoadedFileName =  'Midterm 1 Exam';
                break;
            case '5':
                downLoadedFileName =  'Midterm 2 Exam';
                break;
            case '6':
                downLoadedFileName =  'Midterm 3 Exam';
                break;
            default:
                return null;
        
        }


        const wb =  XLSX.utils.table_to_book(tableRef.current);
        XLSX.writeFile(wb, `${downLoadedFileName}.xlsx`);
    }


    useEffect(()=>{

        const getTypesofExamData = {
            "CLASSID": location?.state?.data?.CLASSID
        }

        const getClassStudentListData = {
            "TEACHERID": loginState?.TEACHERID,
            "CLASSID": location?.state?.data?.CLASSID,
            "SUBJECTID": location?.state?.data?.SUBJECTID
        }

        dispatch(getTypesofExam(getTypesofExamData));
        dispatch(getClassStudenList(getClassStudentListData));
        
        // eslint-disable-next-line
    },[])

    useEffect(()=>{

        if(studentDataState?.studentMarksData.length > 0){
            setDefaultStudentData(studentDataState?.studentMarksData);
        } else {
            if(exam !== "" && updatedMarkStatus){
                const dummyStudenDataList = studentDataState?.classStudentList.map((eachData,index)=>{
                    return {
                        ...eachData,
                        MARKS:0
                    }
                });
                setDefaultStudentData(dummyStudenDataList);
            }
            
        }

        // eslint-disable-next-line
    },[studentDataState?.studentMarksData])

    useEffect(()=>{
       
        if(updatedMarksData.length > 0) {
            // Create a map for quick lookup based on STUDENTID
            const updatedMarksMap = new Map(updatedMarksData.map(item => [item.STUDENTID, item]));

            // Update defaultStudentData with data from updatedMarksData
            const newDefaultStudentData = defaultStudentData.map(item => {
                if (updatedMarksMap.has(item.STUDENTID)) {
                    return { ...item, ...updatedMarksMap.get(item.STUDENTID) };
                }
                return item;
            });

            // Set the updated state
            setDefaultStudentData(newDefaultStudentData);
        }

        // eslint-disable-next-line
    },[updatedMarksData])

    useEffect(()=>{
        if(studentDataState?.updateStudentMarks?.RESULT === "MARKS ARE UPDATED SUCESSFULLY"){
            setUpdatedMarkStatus(true);
            setImportFileStatus(true);
            setUpdateButtonStatus(false);
        }

        // eslint-disable-next-line

    },[studentDataState?.updateStudentMarks])

    useEffect(()=>{
        if(updatedMarkStatus){
            const classData = {
                "CLASSID": location?.state?.data?.CLASSID,
                "SUBJECTID": 'SB002',
                "TEACHERID": loginState?.TEACHERID,
                "TYPEOFEXAM": exam
            }
    
            dispatch(getStudentListData(classData))
        }
                // eslint-disable-next-line
    },[updatedMarkStatus])


    return (
        <div id="staffMarks">
        {
            studentDataState?.typeofExams.length === 0 ? 
            <div className='loader'>
                <Loader label={"Loading..."} horizontal={true}>
                    <ColorRing
                        visible={true}
                        height="50"
                        width="50"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#361954', '#361954', '#361954', '#361954', '#361954']}
                    />
                </Loader>
            </div> : (
                <Container>
                    <Row>
                        <Col sm={12} md={6}>
                            <div className="leftBlock">
                                <div className="classDetails">
                                    <div>{location?.state?.data?.CLASSDESCRIPTION}</div>
                                    <div><span>Subject:&nbsp;</span>{location?.state?.data?.DESCRIPTION}</div>
                                    <div className='selectContainer'>
                                        <Form.Select size="sm" value={exam} onChange={(e)=>{examSelectHandler(e)}}>
                                            <option>Select Exams</option>
                                            {
                                                studentDataState?.typeofExams &&  studentDataState?.typeofExams?.map((exmType,index)=>{
                                                    return (<option key={exmType.EXAMID} value={exmType.EXAMID}>{exmType.EXAMTYPE}</option>)
                                                })
                                            }
                                        </Form.Select>
                                    </div>
                                </div>
                                {
                                    exam !=="" ? defaultStudentData.length === 0 ? <div className='loader'>
                                        <Loader label={"Loading..."} labelColor={"#fff"} horizontal={true}>
                                            <ColorRing
                                                visible={true}
                                                height="50"
                                                width="50"
                                                ariaLabel="color-ring-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="color-ring-wrapper"
                                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                            />
                                        </Loader></div> 
                                        : (<div className="marksTable">
                                        <Table bordered responsive ref={tableRef}>
                                            <thead>
                                                <tr>
                                                    {
                                                        (
                                                            dummyStdMarksHeader.map((item,index)=>(<th key={index}>{item}</th>))
                                                        )
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    defaultStudentData.map((itm,index)=>{
                                                        return (
                                                            <tr key={index}>
                                                                <td>{itm.STUDENT_NAME}</td>
                                                                {
                                                                    editableFieldId === index? <td style={{width: '158px'}}><input style={{width: '100%'}} type='number' min={0} max={100} value={editMark} onChange={(e)=>{setEditMark(e.target.value)}} onBlur={(e)=>{editMarksHandler(e,index,itm)}} /></td> : 
                                                                    <td onDoubleClick={(e)=>{doubleClickHandler(e,index)}}>{itm.MARKS}</td>
                                                                }
                                                                {
                                                                    studentDataState?.studentMarksData.length > 0 ? <td className={`${itm.MARKS < 40 ? 'fail':'pass'}`}><span>{itm.MARKS < 40 ? 'FAIL':'PASS'}</span></td> : <td></td>
                                                                }

                                                            </tr>
                                                        )
                                                    })
                                                    
                                                }
                                            </tbody>
                                        </Table>
                                        {
                                            updateButtonStatus && (
                                                <div className='updateMarkWrapper'>
                                                    <Button label={"Update Marks"} onClick={updateMarksHandler}/>
                                                </div>
                                            )
                                        }
                                    </div>
                                    
                                    )
                                    :<div className="infoMsg">*Please select the exam type to see the student marks list.</div>
                                                                            
                                }
 
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className='rightBlock'>
                                <div className='importBlock'>
                                    {/* <div className='title'>{exam !== ""? (studentDataState?.studentMarksData.length > 0 ) ?( <span>Here, you can tap & upload your marks.</span>):(<span>No data dound.</span>):<span>Select any exam type to import the file.</span> }</div> */}
                                    <Form.Group className={`actionButtonBlock ${exam !=="" && studentDataState?.studentMarksData.length > 0 ? 'active':'disabled'}`}>
                                        <Form.Label htmlFor="file">Upload File <FiUpload /></Form.Label>
                                        <Form.Control id="file" type="file" style={{display:'none'}} onChange={(e)=>{importFileHandler(e)}}/>
                                        {fileName && <span>{fileName} - Updated Successfully.</span>}
                                        {wrongFileUpload && <span style={{color: '#ef4b4c'}}>{wrongFileUpload}</span>}
                                    </Form.Group>
                                    <Form.Group className={`actionButtonBlock ${exam !=="" && studentDataState?.studentMarksData.length > 0 ? 'active':'disabled'}`}>
                                        <Form.Label htmlFor="markFile">Download Marksheet <FiDownload /></Form.Label>
                                        <Form.Control id="markFile" type="file" style={{display:'none'}} onClick={downLoadExcelHandler} disabled={exam !=="" && studentDataState?.studentMarksData.length > 0 ? false:true}/>
                                    </Form.Group>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )
        }
        </div>
    ) 
}

export default StaffMarks;