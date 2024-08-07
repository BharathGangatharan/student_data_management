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