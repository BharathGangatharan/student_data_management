import React,{useState,useEffect} from 'react';
import './staff.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDispatch,useSelector} from 'react-redux';
import Button from '../../components/button/Button';
import {updatePassword} from  '../../store/staffReducer/action';
import { ColorRing } from 'react-loader-spinner';
import Loader from '../../components/loading/Loader';
import { TiTickOutline } from "react-icons/ti";

const StaffProfile = () => {

    const error = {
        lowerCaseErr:"",
        upperCaseErr:"",
        digitErr:"",
        lengthErr:""
    }
    const [showUpdateForm,setShowUpdateForm] = useState(false);
    const [updatePwdInput,setUpdatePwdInput] = useState("");
    const [mainErr,setMainErr] = useState(error);
    const [errorStatus, setErrorStatus] = useState(false);
    const [updatePwdStatus, setUpdatePwdStatus] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const getTeacherData = useSelector((state)=>state?.staffReducer?.teacherDetail);
    const updatePwdData = useSelector((state)=>state?.staffReducer?.updatePassword);
    const dispatch = useDispatch();
    

    const inputUpdatePwdHandler = (e)=>{
        setUpdatePwdInput(e.target.value);
        setMainErr(error);
    }

    const focusoutPwdHandler = (e)=>{
        let value = (e.target.value).trim();
        let err = false;

        if(value.length >=8) {
            if(!((/^(?=.*[a-z])/).test(value))){
                err = true;
                setMainErr((prev)=>{
                    return {...prev, "lowerCaseErr": "*Password must contain at least one lowercase letter"}
                    }
                )
            }
            if(!((/^(?=.*[A-Z])/).test(value))){
                err = true;
                setMainErr((prev)=>{
                    return {...prev, "upperCaseErr": "*Password must contain at least one uppercase letter"}
                    }
                )
            }
            if(!((/^(?=.*[0-9])/).test(value))){
                err = true;
                setMainErr((prev)=>{
                    return {...prev, "digitErr": "*Password must contain at least one digit"}
                    }
                )
            }
        } else {
            err = true;
            setMainErr((prev)=>{
                return {...prev, "lengthErr": "*Password must be at least 8 characters long"}
                }
            )
        }

        if(err) {
            setErrorStatus(true);
        } else {
            setErrorStatus(false);
        }
    }

    const submitUpdatePwdHandler = () => {

        if(!(errorStatus)){
            const newPasswordPayload = {
                "TEACHERID": getTeacherData?.TEACHERID,
                "NEWPASSWORD": updatePwdInput
            }

            dispatch(updatePassword(newPasswordPayload));
            setLoadingStatus(true);
        }
    }

    const showUpdatedFormHandler = () =>{
        setShowUpdateForm(true);
        updatePwdStatus && setUpdatePwdStatus(false);
    }

    useEffect(()=>{
        updatePwdStatus && setUpdatePwdStatus(false);
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(Object.keys(updatePwdData).length > 0){
            if(updatePwdData?.RESULT.toLowerCase() === "password successfully updated") {
                setLoadingStatus(false);
                setUpdatePwdStatus(true);
                setUpdatePwdInput("");
                setShowUpdateForm(false);
            }
        }
    },[updatePwdData])

    return (
        <div id='profileContainer'>
            <Container>
                <Row>
                    <Col sm={12}>
                    <h2>User profile</h2>
                    <div className='profileContent'>
                        <Col md={7}>
                            <div className='information'>
                                <Row>
                                    <Col>
                                        <h4>Name:</h4>
                                    </Col>
                                    <Col>
                                        <div>{getTeacherData?.NAME}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Email:</h4>
                                    </Col>
                                    <Col>
                                        <div>{getTeacherData?.EMAIL}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>DOB:</h4>
                                    </Col>
                                    <Col>
                                        <div>{getTeacherData?.DATEOFBIRTH.split('T')[0]}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Gender:</h4>
                                    </Col>
                                    <Col>
                                        <div>{getTeacherData?.GENDER}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Blood Group:</h4>
                                    </Col>
                                    <Col>
                                        <div>{getTeacherData?.BLOODGROUP}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Ph No:</h4>
                                    </Col>
                                    <Col>
                                        <div>91+{getTeacherData?.CONTACT}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className='updatePasswordWrapper'>
                                {
                                    showUpdateForm ? <Button label={'Update & Submit'} className={`${!(errorStatus) ? 'enabled':'disabled'}`} onClick={submitUpdatePwdHandler} /> : <Button label={'Update Password'} onClick={showUpdatedFormHandler} /> 
                                }
                                
                                    {
                                        showUpdateForm && (
                                            <div className="updatePasswordForm">
                                                <Form>
                                                    <Form.Group controlId="updateBasicPassword">
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control value={updatePwdInput} name="newPassword" type="text" placeholder="Enter your new password" onChange={(e)=>{inputUpdatePwdHandler(e)}} onBlur={(e)=>{focusoutPwdHandler(e)}}/>
                                                    {mainErr.lowerCaseErr !== "" && <span className='errorMsg'>{mainErr.lowerCaseErr}</span>}
                                                    {mainErr.upperCaseErr !== "" && <span className='errorMsg'>{mainErr.upperCaseErr}</span>}
                                                    {mainErr.digitErr !== "" && <span className='errorMsg'>{mainErr.digitErr}</span>}
                                                    {mainErr.lengthErr !== "" && <span className='errorMsg'>{mainErr.lengthErr}</span>}
                                                    {loadingStatus &&
                                                        <Loader horizontal={true}>
                                                            <ColorRing
                                                                visible={true}
                                                                height="50"
                                                                width="50"
                                                                ariaLabel="color-ring-loading"
                                                                wrapperStyle={{}}
                                                                wrapperClass="color-ring-wrapper"
                                                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                                            />
                                                        </Loader>}
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        )
                                    }
                                {
                                    updatePwdStatus && 
                                        <div className='successWrapper'>
                                            <span className='pwdSuccess'>Password Updated Successfully</span>
                                            <div className='successIconWrapper'>
                                                <TiTickOutline />
                                            </div>
                                        </div>
                                }
                            </div>
                        </Col>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default StaffProfile;