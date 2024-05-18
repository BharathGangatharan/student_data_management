import React,{useState} from 'react';
import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import './header.scss';
import { CgProfile } from "react-icons/cg";
import ModalPopup from '../modal/ModalPopup';
import TimeTable from '../time-table/TimeTable';

const Header = () => {

    const [modalShow, setModalShow] = useState(false);

    const modalHideHandler = ()=>{
        setModalShow(false)
    }

    return (
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
                    <div>Logout</div>
                </Dropdown.Menu>
            </Dropdown>
            <div id="detail">
                <Outlet />
            </div>
            {modalShow && 
                (
                    <ModalPopup modalTitle={"Time Table"} modalShow={modalShow} modalHide={modalHideHandler}>
                        <TimeTable tcoloumn={9}/>
                    </ModalPopup>
                )
            }
        </Container>
    )
}

export default Header;