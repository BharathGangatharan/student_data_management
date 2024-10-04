import React,{useState} from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import {leaveApprove,leaveReject} from '../../store/staffReducer/action';
import Table from "react-bootstrap/Table";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";

const LeaveAccordion = () => {
  const data = useSelector((state) => state?.staffReducer);
  const [rejectionData, setRejectionData] = useState([]);
  const [rejectionError, setRejectionError] = useState(false);

  const dispatch = useDispatch();

  const approveLeave = (data) => {
    const approveData = {
        StudentID: data?.StudentId,
        DateOnLeave: data?.DateOnLeave?.slice(0, 10),
        IsPartial: data?.IsPartial,
        Noon: data?.Noon
    }
    dispatch(leaveApprove(approveData));
  }

  const rejectLeave = (data) => {
        // Ensure rejectionData is an array
        if (Array.isArray(rejectionData) && rejectionData.length > 0) {
            const studentId = data?.StudentId || data?.StudentID; // Ensure you use the correct property name

            // Use findIndex to get the index
            const existingCommentIndex = rejectionData.findIndex((item) => item?.id === studentId);

            if (existingCommentIndex !== -1 && rejectionData[existingCommentIndex]?.text !== "") {
                const getRejectionComment = rejectionData.filter((item) => item?.id === studentId);
                const rejectData = {
                    StudentID: studentId,
                    DateOnLeave: data?.DateOnLeave?.slice(0, 10),
                    IsPartial: data?.IsPartial,
                    Noon: data?.Noon,
                    TeacherComment: getRejectionComment[0]?.text
                };
                dispatch(leaveReject(rejectData));
            } else {
                setRejectionError(true);
            }
        } else {
            setRejectionError(true);
        }
    };


  const rejectionHandler = (e, data) => {

        rejectionError && setRejectionError(false);
        
        const itemData = {
            id: data?.StudentId, // Make sure this is consistent
            text: e.target.value
        };

        setRejectionData((prevComment) => {
            // Use prevComment instead of rejectionData
            const existingCommentIndex = prevComment.findIndex((item) => item.id === itemData.id);

            if (existingCommentIndex !== -1) {
                // Update existing comment
                return prevComment.map((item, index) =>
                    index === existingCommentIndex ? { ...item, text: e.target.value } : item
                );
            } else {
                // Add a new rejection comment
                return [...prevComment, itemData];
            }
        });
    };


  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Leave Approval &nbsp;({data?.getLeaveApprovals.length})
        </Accordion.Header>
        <Accordion.Body>
          <div>
            {data?.getLeaveApprovals.length > 0 ? (
              <>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Leave On</th>
                      <th>Noon</th>
                      <th>Half Day</th>
                      <th>Approve</th>
                      <th>Reject</th>
                      <th>Reason for Rejection</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        data?.getLeaveApprovals?.map((itm,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{itm?.StudentName}</td>
                                    <td>{itm?.DateOnLeave.slice(0, 10)}</td>
                                    <td>{itm?.Noon}</td>
                                    <td>{itm?.IsPartial === 0 ? 'No': 'Yes'}</td>
                                    <td className="approve"><TiTick onClick={()=>{approveLeave(itm)}}/></td>
                                    <td className="reject"><IoMdClose onClick={()=>{rejectLeave(itm)}}/></td>
                                    <td><input type="text" onChange={(e)=>{rejectionHandler(e,itm)}} /></td>
                                </tr>
                            )
                        })
                    }
                  </tbody>
                </Table>
                {
                    rejectionError && <div className="errorMsg">Please update the rejection comment.</div>
                }
              </>
            ) : (
              <h4>No Pending Request.</h4>
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default LeaveAccordion;
