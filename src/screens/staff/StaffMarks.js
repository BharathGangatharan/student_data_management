import React,{useState,useEffect} from 'react';
import {dummyStdMarksTable,dummyStdMarksHeader} from '../../dummyData';
import {getTypesofExam,getClassStudenList} from '../../store/staffReducer/action';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import * as XLSX from 'xlsx';
import './staff.scss';

const StaffMarks = () => {

    const [exam,setExam] = useState('');
    const [studentData, setStudentData] = useState([]);
    const [fileName, setFileName]= useState('');
    const [fileNameType, setFileNameType]= useState([]);
    const [wrongFileUpload, setWrongFileUpload]= useState('');
    const [defaultExamType,setDefaultExamType] = useState('');

    const location = useLocation();
    const dispatch = useDispatch();

    const loginState = useSelector((state)=>state?.loginReducer?.login);

    //exam selection handler
    const examSelectHandler = (e)=>{
        setExam(e.target.value);
    }

    const importFileHandler = async (e)=>{
        setWrongFileUpload("");
        let file = e.target.files[0];

        if(file && file.name.split('.')[1]==="xlsx") {

            let examTypes = [...fileNameType];
            examTypes.push(file.name.split('_')[1].split('.')[0]);
            setFileNameType((prev)=>{
                return [...prev,examTypes];
            });

            const data = await file.arrayBuffer();
            /* data is an ArrayBuffer */
            const workBook = XLSX.read(data);

            const workSheet = workBook.Sheets[workBook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(workSheet);
            setStudentData(jsonData);
            jsonData && setFileName(e.target.files[0].name);
            
        } else {
            setWrongFileUpload("Please Update Corret Excel File");
        }
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
        
    },[])

    useEffect(()=>{
        if(fileNameType.length === 1) {
            setDefaultExamType(fileNameType[0])
        }
    },[fileNameType,studentData])


    return (
        <div id="staffMarks">
            <Container>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="leftBlock">
                            <div className="classDetails">
                                <div>V A 24 </div>
                                <div><span>Subject:&nbsp;</span>Maths</div>
                                <div className='selectContainer'>
                                    <Form.Select size="sm" value={exam} defaultValue={defaultExamType[0]} onChange={(e)=>{examSelectHandler(e)}}>
                                        <option>Select Exams</option>
                                        {
                                            fileNameType &&  fileNameType?.map((exmType,index)=>{
                                                return (<option key={index} value={exmType}>{exmType}</option>)
                                            })
                                        }
                                    </Form.Select>
                                </div>
                            </div>
                            <div className="marksTable">
                                <Table bordered responsive>
                                    <thead>
                                        <tr>
                                            {
                                                (studentData.length <=0) ?
                                                (
                                                    dummyStdMarksHeader.map((item,index)=>(<th key={index}>{item}</th>))
                                                ):
                                                (
                                                    studentData.map((item, index) => (
                                                        <th key={index}>{Object.keys(item)[index]}</th>
                                                    ))
                                                )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (studentData.length <= 0)?
                                            (
                                                dummyStdMarksTable.map((itm,index)=>{
                                                    return (
                                                        <tr key={index}>
                                                            <td>{itm}</td>
                                                            <td>{Math.floor(Math.random()*100)}</td>
                                                            <td>Pass</td>
                                                        </tr>
                                                    )
                                                })
                                            ):
                                            (
                                                studentData.map((itm,index)=>{
                                                    return (
                                                        <tr key={index}>
                                                            <td>{itm?.Names}</td>
                                                            <td>{itm?.Marks}</td>
                                                            <td>{itm?.Grade}</td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <div></div>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className='rightBlock'>
                            <div className='importBlock'>
                                <div className='title'>Tap to upload marks sheet*</div>
                                <Form.Group>
                                    <Form.Label htmlFor="file">Upload File</Form.Label>
                                    <Form.Control id="file" type="file" style={{display:'none'}} onChange={(e)=>{importFileHandler(e)}}/>
                                </Form.Group>
                                {fileName && <span>{fileName} - Updated Successfully</span>}
                                {wrongFileUpload && <span style={{color: '#ef4b4c'}}>{wrongFileUpload}</span>}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    ) 
}

export default StaffMarks;