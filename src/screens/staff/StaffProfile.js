import React from 'react';
import './staff.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useSelector} from 'react-redux';

const StaffProfile = () => {

    const getTeacherData = useSelector((state)=>state?.staffReducer?.teacherDetail);

    return (
        <div id='profileContainer'>
            <Container>
                <Row>
                    <Col col={12}>
                    <h2>User profile</h2>
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
                </Row>
            </Container>
        </div>
    )
}

export default StaffProfile;