import React,{useState} from 'react'
import LoginImg from '../../images/loginScreen.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Button from '../../components/button/Button';
import './login.scss';

const Login = () => {

  let loginInputValues = {
    userId:'',
    password:''
  }

  let loginInputErroStatus = {
    userId:false,
    password:false
  }

  const [inputValues, setInputValues] = useState(loginInputValues);
  const [inputErrStatus, setInputErrStatus] = useState(loginInputErroStatus);
  const [formErrStatus, setFormErrStatus] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [loginUser, setLoginUser] = useState('student');

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

    setInputValues((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    });

    //clear error value on change
    if(inputErrStatus.userId || inputErrStatus.password) {
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
      console.log('succes');

      //resetting the input value
      setInputValues(loginInputValues);
    }
  }

  //formValidation
  function validateInputFields(){
    if((inputValues.userId && inputValues.password)) {
      setFormErrStatus(false)
      return true;
    } else {
      setFormErrStatus(true);
      return false;
    }
  }

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
                    <Form.Group className={`${inputErrStatus.userId ? 'mb-0':'mb-3'}`}controlId="formBasicEmail">
                      <Form.Label>User Id</Form.Label>
                      <Form.Control value={inputValues.userId} name="userId" type="text" placeholder="Enter userid" onChange={(e)=>{inputHandler(e)}} onBlur={(e)=>{focusoutHandler(e)}}/>
                    </Form.Group>
                    {inputErrStatus.userId && <span id="userIdError" className="error">Please enter a valid userId</span>}
                    <Form.Group className={`${inputErrStatus.password ? 'mb-0':'mb-3'}`} controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control value={inputValues.password} name="password"  type={`${passwordShow ? 'text':'password'}`} placeholder="Enter password" onChange={(e)=>{inputHandler(e)}} onBlur={(e)=>{focusoutHandler(e)}}/>
                      {
                        passwordShow ? <FaEye className='eyeIcon' onClick={passwordShowHandler}/>:<FaEyeSlash className='eyeIcon' onClick={passwordShowHandler}/>            
                      }
                    </Form.Group>
                    {inputErrStatus.password && <span id="passwordError" className="error">Please enter a password</span>}
                    <Button  className="submitButton" label={"Submit"} onClick={formSubmit}/>
                    {(formErrStatus) && <span id="passwordError" className="error"><sup>*</sup>Please fill all the fields</span>}
                </Form>
              </div>
            </Col>
        </Row>
      </Container>
  )

}

export default Login;