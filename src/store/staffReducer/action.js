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
