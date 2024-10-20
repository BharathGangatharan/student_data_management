import React,{useState, useEffect, useRef} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from '../../button/Button';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { TiTick } from "react-icons/ti";
import {createTaskList,resetGetTaskList,editTaskList,resetCreateTaskList} from '../../../store/staffReducer/action';
import {useDispatch, useSelector} from 'react-redux';
import './taskModal.scss';

const TaskModal = ({classId,subjectId,editedData,editStatus,modalHide,setTaskStatus}) => {

    let data = {
        taskHeading: "",
        taskContent: "",
    }

    const [taskData, setTaskData] = useState(data);
    const [assignDate, setAssignDate] = useState(new Date());
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(false);

    const dateRef1 = useRef();
    const dateRef2 = useRef();
    const dispatch = useDispatch();

    const staffData = useSelector((state)=>state?.staffReducer);

    const taskAddHandler = (e) =>{

        error && setError(false);

        setTaskData((prev) => {
            return {...prev,[e.target.name]:e.target.value}
        });
    }

    const createTaskHandler = () => {

        const [amonth, aday, ayear] = dateRef1?.current?.input?.value.split("/");
        const [dmonth, dday, dyear] = dateRef2?.current?.input?.value.split("/");

        const availableNumbers = Array.from({ length: 5 }, (_, i) => i + 1).filter(num => !staffData?.getTaskList?.some(task => task.TASKNUMBER === num));
        const nextTaskNumber = availableNumbers.length > 0 ? availableNumbers[0] : (staffData?.getTaskList.length > 0 ? Math.max(...staffData?.getTaskList.map(task => task.TASKNUMBER)) + 1 : 1);


        if(taskData?.taskHeading !=="" && taskData?.taskContent !=="" && assignDate !=="" && dueDate !==""){

            const taskEntry = {
                CLASSID: classId,
                SUBJECTID: subjectId,
                TASKNUMBER: nextTaskNumber,
                DATEOFTASK: `${ayear}-${amonth}-${aday}`,
                TASKHEADING: taskData?.taskHeading,
                TASKCONTENT: taskData?.taskContent,
                DUEDATE: `${dyear}-${dmonth}-${dday}`
            }

            dispatch(createTaskList(taskEntry));
        } else {
            setError(true);
        }
    }

    const updateTaskHandler = () => {

        const [amonth, aday, ayear] = dateRef1?.current?.input?.value.split("/");
        const [dmonth, dday, dyear] = dateRef2?.current?.input?.value.split("/");

        if(taskData?.taskHeading !=="" && taskData?.taskContent !=="" && assignDate !=="" && dueDate !==""){

            const editEntry = {
                CLASSID: classId,
                SUBJECTID: subjectId,
                TASKNUMBER: editedData?.TASKNUMBER,
                DATEOFTASK: `${ayear}-${amonth}-${aday}`,
                TASKHEADING: taskData?.taskHeading,
                TASKCONTENT: taskData?.taskContent,
                DUEDATE: `${dyear}-${dmonth}-${dday}`
            }
            dispatch(editTaskList(editEntry));

        } else {
            setError(true);
        }
    }

    // Effect to populate the form with edited data
    useEffect(() => {
        console.log(editStatus)
        if (editStatus && Object.keys(editedData).length > 0 && editedData?.taskHeading !== "") {
            setTaskData({
                taskHeading: editedData?.TaskHeading || "",
                taskContent: editedData?.TaskContent || "",
            });
            setAssignDate(new Date(editedData?.TaskDate));
            setDueDate(new Date(editedData?.Duedate));
        }

        // eslint-disable-next-line
    }, [editedData]);

    useEffect(()=>{
        if(staffData?.createTaskList?.RESULT?.toLowerCase() === "task added successfully") {
            dispatch(resetCreateTaskList({}));
            dispatch(resetGetTaskList([]));
            toast.success("Task Added Successfully", { icon: <TiTick />, position: "top-center",autoClose: 2000, draggable: true, closeOnClick: true,theme: "light" });
            modalHide();
            setTaskStatus(true);
        }
        // eslint-disable-next-line
    },[staffData?.createTaskList])

    return (
        <div id="taskCreate">
            <Row>
                <Col sm={12}>
                    <Form>
                        <Form.Group controlId="formTaskHeading">
                            <Form.Label>Task's Header</Form.Label>
                            <Form.Control value={taskData.taskHeading} name="taskHeading" type="text" onChange={(e)=>{taskAddHandler(e)}}/>
                        </Form.Group>
                        <Form.Group controlId="formTaskContent">
                            <Form.Label>Task's Content</Form.Label>
                            <Form.Control value={taskData.taskContent}  as="textarea" name="taskContent" onChange={(e)=>{taskAddHandler(e)}}/>
                        </Form.Group>
                        <Form.Group controlId="formAssignedDate">
                            <Form.Label>Assigned Date</Form.Label>
                            <DatePicker ref={dateRef1} className='form-control' selected={assignDate} onChange={(date) => setAssignDate(date)} />
                        </Form.Group>
                        <Form.Group controlId="formDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <DatePicker ref={dateRef2} className='form-control' selected={dueDate} onChange={(date) => setDueDate(date)} />
                        </Form.Group>
                        {error && <span className="error"><sup>*</sup>Please update all the entries.</span>}
                    </Form>
                    <div className="buttonBlock">
                        {
                            editStatus ? <Button label={"Update"} onClick={updateTaskHandler}/> : <Button label={"Add"} onClick={createTaskHandler}/>
                        }
                        
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default TaskModal;