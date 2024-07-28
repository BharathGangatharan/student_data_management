import actionType from "./actionType";
import {API_POST} from "../../services/index"

export const getTimeTableClassList = (payload) => (dispatch) => {    
    API_POST("GetTotalClassList", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_TIME_TABLE_CLASSLIST,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_TIME_TABLE_CLASSLIST,
            payload: err,
        });
    });
};

export const getTimeTableSubjectList = (payload) => (dispatch) => {    
    API_POST("GetSubjectList", payload)
    .then(res => {
        dispatch({
            type: actionType.GET_TIME_TABLE_SUBJECTLIST,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.GET_TIME_TABLE_SUBJECTLIST,
            payload: err,
        });
    });
};

export const timeTableUpdation = (payload) => (dispatch) => {    
    API_POST("UpdateTimeTable", payload)
    .then(res => {
        dispatch({
            type: actionType.TIME_TABLE_UPDATE,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.TIME_TABLE_UPDATE,
            payload: err,
        });
    });
};

export const resetTimeTableSubjectList = (payload) => (dispatch) =>{
    dispatch({
        type: actionType.RESET_SUBJECT_DATA,
        payload: payload,
    });
}