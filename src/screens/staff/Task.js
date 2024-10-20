import React,{useState, useEffect, useRef} from 'react';
import './staff.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../components/button/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getTaskList,deleteTaskList,resetCreateTaskList} from '../../store/staffReducer/action';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import ModalPopup from '../../components/modal/ModalPopup';
import TaskModal from '../../components/modal/taskModal/TaskModal';
import { ToastContainer } from 'react-toastify';

const Task = () => {

    const [taskModal, setTaskModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [editedData, setEditedData] = useState({});
    const [editStatus, setEditStatus] = useState(false);
    const [dateStatus, setDateStatus] = useState(false);
    const [taskStatus, setTaskStatus] = useState(false);

    const data = useSelector((state)=>state?.staffReducer);

    const location = useLocation();
    const dispatch = useDispatch();
    const dateRef = useRef();
    //const disabledDates = (date) => new Date() < date;

    
    const modalHideHandler = () => {
        setTaskModal(false);
    }

    const changeDateHandler = (date) => {
        setDateStatus(true);
        setStartDate(date);
    }

    const openTaskHandler = () => {
        editStatus && setEditStatus(false);
        setTaskModal(true);
    }

    const editTaskHandler = (editData) => {
        setEditedData(editData);
        setEditStatus(true);
        setTaskModal(true);
    }

    const deleteTaskHandler = (data) => {
        const deleteData = {
            CLASSID: location?.state?.data?.CLASSID,
            SUBJECTID: location?.state?.data?.SUBJECTID,
            TASKNUMBER: data?.TASKNUMBER,
            DATEOFTASK: data?.TaskDate
        }
        dispatch(deleteTaskList(deleteData));
    }

    function getDailyTaskLists(){
        const [month, day, year] = dateRef?.current?.input?.value.split("/");

        const getTasks = {
            CLASSID: location?.state?.data?.CLASSID,
            SUBJECTID: location?.state?.data?.SUBJECTID,
            DATEOFTASK: `${year}-${month}-${day}`
        }
        
        dispatch(getTaskList(getTasks));
    }

    useEffect(()=>{

        getDailyTaskLists();
        // eslint-disable-next-line
    },[]);

    useEffect(()=>{

        if(dateStatus) {
            setDateStatus(false);
            getDailyTaskLists();
        }

        // eslint-disable-next-line
    },[startDate]);

    useEffect(()=>{
        if(taskStatus){
            setTaskStatus(false);
            getDailyTaskLists();
        }
        // eslint-disable-next-line
    },[taskStatus]);

    return (
        <div id="taskId">
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="taskContainerHeader">
                                Task Update
                        </div>
                        <div className="taskContent">
                            <div className="addButton" onClick={openTaskHandler}>
                                <IoAddCircleSharp />
                                <Button label={"Add Task"} />
                            </div>
                            <div className="datePicker">
                                <MdDateRange />
                                <DatePicker ref={dateRef} selected={startDate} onChange={(date)=>{changeDateHandler(date)}} />
                            </div>
                        </div>
                        <div className="showTaskLists">
                            {
                               dateStatus || taskStatus ? <div>Loading...</div> :
                              data?.getTaskList?.length === 0 ? <div>No tasks updated for this date.</div>: (                              <>
                                <div className='taskMainHeader'>
                                    Assigned Task's
                                </div>
                                {
                                    data?.getTaskList?.map((task,index)=>{
                                        return (
                                            <div className="taskContainer" key={index}>
                                                <div>{task?.TaskHeading}</div>
                                                <div>Assigned Date: <span>{task?.TaskDate}</span></div>
                                                <div>Due Date: <span>{task?.Duedate}</span></div>
                                                <div onClick={()=>{editTaskHandler(task)}}><AiFillEdit /></div>
                                                <div onClick={()=>{deleteTaskHandler(task)}}><MdDeleteForever /></div>
                                            </div>
                                        )
                                    })
                                }
                              </>)
                            }
                        </div>
                        {
                            taskModal && (
                            <ModalPopup modalTitle={"Add your Task"} className={"taskModal"}  modalShow={taskModal} modalHide={modalHideHandler}>
                                <TaskModal editedData={editedData} setTaskStatus={setTaskStatus} editStatus={editStatus} modalHide={modalHideHandler} classId={location?.state?.data?.CLASSID} subjectId={location?.state?.data?.SUBJECTID}/>
                            </ModalPopup>
                            )
                        }
                        <ToastContainer autoClose={2000} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Task;