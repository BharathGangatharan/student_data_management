import React,{useState,useEffect} from 'react'
import LoginImg from '../../images/loginScreen.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Button from '../../components/button/Button';
import './login.scss';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginRequest} from '../../store/loginReducer/action';
import { ColorRing } from 'react-loader-spinner';
import Loader from '../../components/loading/Loader';

const Login = () => {

  let loginInputValues = {
    userEmail:'',
    password:''
  }

  let loginInputErroStatus = {
    userEmail:false,
    password:false
  }

  const [inputValues, setInputValues] = useState(loginInputValues);
  const [inputErrStatus, setInputErrStatus] = useState(loginInputErroStatus);
  const [formErrStatus, setFormErrStatus] = useState(false);
  const [customErrStatus, setCustomErrStatus] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [loginUser, setLoginUser] = useState('student');
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state)=>state?.loginReducer?.login);

  //password eye icon switch function
  const passwordShowHandler=()=>{
    setPasswordShow(!passwordShow);
  }

  //change login user handler
  const loginUserHandler=(user)=>{

    if(user === 'student') {
      setLoginUser('student');
    } else {
      setLoginUser('teacher');
    }
    
  }

  //onchange handler for login input
  const inputHandler = (e)=>{

    setFormErrStatus(false);
    setCustomErrStatus(false);

    setInputValues((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    });

    //clear error value on change
    if(inputErrStatus.userEmail || inputErrStatus.password) {
      setInputErrStatus((prev)=>{
        return {...prev,[e.target.name]:false}
      });
    }
  }

  //showing error on focusout
  const focusoutHandler = (e)=>{
    let value = e.target.value
    if(value.length === 0) {
      setInputErrStatus((prev)=>{
        return {...prev,[e.target.name]:true}
      });
    } else {
      setInputErrStatus((prev)=>{
        return {...prev,[e.target.name]:false}
      });
    }
  }

  //formSubmit
  const formSubmit = ()=>{
    if (validateInputFields()){
      const loginData = {
        "email": inputValues.userEmail,
        "Password": inputValues.password
      }

      dispatch(loginRequest(loginData));
      setIsLoading(true);
      //resetting the input value
      //setInputValues(loginInputValues);
    }
  }

  //formValidation
  function validateInputFields(){
    if((inputValues.userEmail && inputValues.password)) {
      setFormErrStatus(false)
      return true;
    } else {
      setFormErrStatus(true);
      return false;
    }
  }

  useEffect(()=>{
    if(loginState && loginState?.output === "success") {
        localStorage.setItem("isLoggedIn", true);
        navigate('/staff');
    } else if(loginState?.output === "Error") {
        setIsLoading(false);
        setCustomErrStatus(true);
    }

  },[loginState])

  return (
      <Container className='loginContainer' fluid id="loginForm">
        <Row>
            <Col xs={12} md={6}>
              <div className='imageContainer'>
                <img src={LoginImg} alt="login_image"/>
              </div>    
            </Col>
            <Col xs={12} md={6}>
              <div className='loginFormContainer'>
                  <div>LOGIN</div>
                  <div className='loginTitle'>
                    <Button label={"Student"} className={loginUser === 'student'&&'active'} onClick={()=>{loginUserHandler('student')}}/>
                    <Button label={"Teacher"} className={loginUser === 'teacher'&&'active'} onClick={()=>{loginUserHandler('teacher')}}/>
                  </div>
                  <Form>
                    <Form.Group className={`${inputErrStatus.userEmail ? 'mb-0':'mb-3'}`}controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control value={inputValues.userEmail} name="userEmail" type="email" placeholder="Enter email" onChange={(e)=>{inputHandler(e)}} onBlur={(e)=>{focusoutHandler(e)}}/>
                    </Form.Group>
                    {inputErrStatus.userEmail && <span id="userEmailError" className="error">Please enter a valid email</span>}
                    <Form.Group className={`${inputErrStatus.password ? 'mb-0':'mb-3'}`} controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control value={inputValues.password} name="password"  type={`${passwordShow ? 'text':'password'}`} placeholder="Enter password" onChange={(e)=>{inputHandler(e)}} onBlur={(e)=>{focusoutHandler(e)}}/>
                      {
                        passwordShow ? <FaEye className='eyeIcon' onClick={passwordShowHandler}/>:<FaEyeSlash className='eyeIcon' onClick={passwordShowHandler}/>            
                      }
                    </Form.Group>
                    {inputErrStatus.password && <span id="passwordError" className="error">Please enter a password</span>}
                    
                    {
                        isLoading ? 
                        (           
                            <Loader>
                                <ColorRing
                                    visible={true}
                                    height="50"
                                    width="50"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />
                            </Loader>
                            
                        ) : (<Button  className="submitButton" label={"Submit"} onClick={formSubmit}/>)
                    }
                    {(formErrStatus) && <span id="passwordError" className="error"><sup>*</sup>Please fill all the fields</span>}
                    {(customErrStatus) && <span className="error">Please enter the correct credentials*</span>}
                </Form>
              </div>
            </Col>
        </Row>
      </Container>
  )

}

export default Login;