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

export const resetStudentListData = (payload) => (dispatch) =>{
    dispatch({
        type: actionType.RESET_STUDENT_MARKS_DATA,
        payload: payload,
    });
}