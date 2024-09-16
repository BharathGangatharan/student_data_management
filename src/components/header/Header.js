import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import './header.scss';
import { CgProfile } from "react-icons/cg";
import ModalPopup from '../modal/ModalPopup';
import TimeTable from '../time-table/TimeTable';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {resetOnLogout} from '../../store/loginReducer/action'
import {useSelector} from 'react-redux';

const Header = () => {

    const [modalShow, setModalShow] = useState(false);
    const checkLoginState = localStorage.getItem("isLoggedIn");

    const getTeacherData = useSelector((state)=>state?.staffReducer?.teacherDetail);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const modalHideHandler = ()=>{
        setModalShow(false)
    }

    const viewProfileHandler = ()=>{
        navigate('/profile');
    }

    const logoutHandler = ()=>{
        const getIsLogin = localStorage.getItem("isLoggedIn");
        
        if(getIsLogin && getIsLogin) {
            localStorage.removeItem("isLoggedIn");
            dispatch(resetOnLogout({}));
            navigate('/login');
        }
    }

    return (
        <>
            {
                checkLoginState? 
                (
                    <Container className='headerContainer' fluid>
                        <div>
                            {getTeacherData?.NAME}
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <CgProfile/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div onClick={viewProfileHandler}>View Profile</div>
                                <div onClick={()=>{setModalShow(true)}}>Time Table</div>
                                <div onClick={logoutHandler}>Logout</div>
                            </Dropdown.Menu>
                        </Dropdown>
                        {modalShow && 
                            (
                                <ModalPopup modalTitle={"Time Table"} modalShow={modalShow} modalHide={modalHideHandler}>
                                    <TimeTable tcoloumn={8}/>
                                </ModalPopup>
                            )
                        }
                    </Container>
                ) : null
            }
        </>
    )
}

export default Header;