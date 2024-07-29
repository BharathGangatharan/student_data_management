import actionType from "./actionType";

const initialState = {
    classList: [],
    teacherDetail:{},
    typeofExams: [],
    classStudentList: [],
    updatePassword: {}
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
        case actionType.GET_TYPEOF_EXAM:
            return {
                ...state, typeofExams: action.payload
            }
        case actionType.GET_STUDENT_LIST:
            return {
                ...state, classStudentList: action.payload
            }
        case actionType.UPDATE_PASSWORD:
            return {
                ...state, updatePassword: action.payload
            }
        default:
            return state;
    }
}

export default staffReducer;