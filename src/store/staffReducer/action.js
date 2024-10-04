import actionType from "./actionType";
import {API_POST} from "../../services/index"

export const getClassList = (payload) => (dispatch) => {    
    API_POST("getclasslist", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_CLASSLIST,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_CLASSLIST,
            payload: err,
        });
    });
};

export const getTeacherDetails = (payload) => (dispatch) => {    
    API_POST("Getteacherdetails", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_TEACHER_DETAILS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_TEACHER_DETAILS,
            payload: err,
        });
    });
};

export const getTypesofExam = (payload) => (dispatch) => {    
    API_POST("GETTYPEOFEXAM", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_TYPEOF_EXAM,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_TYPEOF_EXAM,
            payload: err,
        });
    });
};

export const getClassStudenList = (payload) => (dispatch) => {    
    API_POST("GETSTUDENTLIST", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_STUDENT_LIST,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_STUDENT_LIST,
            payload: err,
        });
    });
};

export const updatePassword = (payload) => (dispatch) =>{
    API_POST("UPDATENEWPASSWORD", payload)
    .then(res => {
        dispatch({
            type: actionType.UPDATE_PASSWORD,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.UPDATE_PASSWORD,
            payload: err,
        });
    });
}

export const getStudentListData = (payload) => (dispatch) =>{
    API_POST("GETSTUDENTMARKSLIST", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_STUDENT_MARKS_DATA,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_STUDENT_MARKS_DATA,
            payload: err,
        });
    });
}

export const updateStudentMarksList = (payload) => (dispatch) =>{
    API_POST("EXAMMARKSUPDATE", payload)
    .then(res => {
        dispatch({
            type: actionType.UPDATE_STUDENT_MARKS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.UPDATE_STUDENT_MARKS,
            payload: err,
        });
    });
}

export const getAverageMarks = (payload) => (dispatch) =>{
    API_POST("GETSTUDENTAVGMARKS", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_AVG_MARKS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_AVG_MARKS,
            payload: err,
        });
    });
}

export const resetStudentListData = (payload) => (dispatch) =>{
    dispatch({
        type: actionType.RESET_STUDENT_MARKS_DATA,
        payload: payload,
    });
}

export const resetData = (payload) => (dispatch) =>{
    dispatch({
        type: actionType.RESET_DATA,
        payload: payload,
    });
}

export const getMyClass = (payload) => (dispatch) =>{
    API_POST("GETMYCLASS", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_MY_CLASS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_MY_CLASS,
            payload: err,
        });
    });
}

export const getMyClassMarks = (payload) => (dispatch) =>{
    API_POST("GETMYCLASSMARKS", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_MY_CLASS_MARKS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_MY_CLASS_MARKS,
            payload: err,
        });
    });
}

export const getMyClassSubjects = (payload) => (dispatch) =>{
    API_POST("GETMYCLASSSUBJECTS", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_MY_CLASS_SUBJECTS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_MY_CLASS_SUBJECTS,
            payload: err,
        });
    });
}

export const getStudentSummary = (payload) => (dispatch) =>{
    API_POST("DISPLAYMYCLASSSTUDENTSUMMARY", payload)
    .then(res => {
        dispatch({
            type: actionType.DISPLAY_STUDENT_SUMMARY,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.DISPLAY_STUDENT_SUMMARY,
            payload: err,
        });
    });
}

export const approveStudentsMarks = (payload) => (dispatch) =>{
    API_POST("APPROVEMARKSTUDENTS", payload)
    .then(res => {
        dispatch({
            type: actionType.APPROVE_MARKS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.APPROVE_MARKS,
            payload: err,
        });
    });
}

export const getApprovedStudentsMarks = (payload) => (dispatch) =>{
    API_POST("GETMYCLASSMARKSAPPROVED", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_APPROVED_STUDENTS_MARKS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_APPROVED_STUDENTS_MARKS,
            payload: err,
        });
    });
}

export const resetApproveStudentsMarks  = (payload) => (dispatch) =>{
    dispatch({
        type: actionType.RESET_APPROVE_MARKS,
        payload: payload,
    });
}

export const getMyClassSubAverage = (payload) => (dispatch) =>{
    API_POST("GETMYCLASSSUBAVG", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_CLASS_SUB_AVG,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_CLASS_SUB_AVG,
            payload: err,
        });
    });
}

export const getAllLeaveApprovals = (payload) => (dispatch) =>{
    API_POST("GetTeacherLeaveView", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_LEAVE_APPROVALS,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_LEAVE_APPROVALS,
            payload: err,
        });
    });
}

export const leaveApprove = (payload) => (dispatch) =>{
    API_POST("LeaveApproval", payload)
    .then(res => {
        dispatch({
            type: actionType.APPROVE_STUDENT_LEAVE,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.APPROVE_STUDENT_LEAVE,
            payload: err,
        });
    });
}

export const leaveReject = (payload) => (dispatch) =>{
    API_POST("LeaveRejection", payload)
    .then(res => {
        dispatch({
            type: actionType.REJECT_STUDENT_LEAVE,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.REJECT_STUDENT_LEAVE,
            payload: err,
        });
    });
}
