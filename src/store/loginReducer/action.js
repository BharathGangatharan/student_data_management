import actionType from "./actionType";
import {API_POST} from "../../services/index"

export const loginRequest = (payload) => (dispatch) => {    
    API_POST("Checkcredential", payload)
    .then(res => {
        dispatch({
            type: actionType.LOGIN_REQUEST,
            payload: res,
        });
    }).catch(err => {
        dispatch({
            type: actionType.LOGIN_REQUEST,
            payload: err,
        });
    });
};

export const resetOnLogout = (payload)=>(dispatch)=>{
    dispatch({
        type: actionType.RESET_STATE,
        payload: payload,
    });
}