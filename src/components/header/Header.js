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

const Header = () => {

    const [modalShow, setModalShow] = useState(false);
    const checkLoginState = localStorage.getItem("isLoggedIn");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const modalHideHandler = ()=>{
        setModalShow(false)
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
                            Bharath
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <CgProfile/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div>View Profile</div>
                                <div onClick={()=>{setModalShow(true)}}>Time Table</div>
                                <div onClick={logoutHandler}>Logout</div>
                            </Dropdown.Menu>
                        </Dropdown>
                        {modalShow && 
                            (
                                <ModalPopup modalTitle={"Time Table"} modalShow={modalShow} modalHide={modalHideHandler}>
                                    <TimeTable tcoloumn={9}/>
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