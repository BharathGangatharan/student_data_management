import actionType from "./actionType";

const initialState = {
    classList: [],
    teacherDetail:{}
}

const staffReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionType.GET_CLASSLIST:
            return {
                ...state, classList: action.payload
            }
        case actionType.GET_TEACHER_DETAILS:
            return {
                ...state, teacherDetail: action.payload
            }
        default:
            return state;
    }
}

export default staffReducer;