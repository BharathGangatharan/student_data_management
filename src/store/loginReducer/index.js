import actionType from "./actionType";

const initialState = {
    login: {},
}

const loginReducer = (state = initialState, action)=>{

    switch (action.type) {
        case actionType.LOGIN_REQUEST:
            return {
                ...state, login: action.payload
            }
        case actionType.RESET_STATE:
            return {
                ...state, login: action.payload
            }
        default:
            return state;
    }

}

export default loginReducer;