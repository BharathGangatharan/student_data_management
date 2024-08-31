import actionType from "./actionType";

const initialState = {
    classList: [],
    teacherDetail:{},
    typeofExams: [],
    classStudentList: [],
    updatePassword: {},
    studentMarksData: [],
    updateStudentMarks: {},
    averageMarks: {},
    getMyClass: {}
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
        case actionType.GET_STUDENT_MARKS_DATA:
            return {
                ...state, studentMarksData: action.payload
            }
        case actionType.UPDATE_STUDENT_MARKS:
            return {
                ...state, updateStudentMarks: action.payload
            }
        case actionType.GET_AVG_MARKS:
            return {
                ...state, averageMarks: action.payload
            }
        case actionType.RESET_STUDENT_MARKS_DATA:
            return {
                ...state, studentMarksData: []
            }
        case actionType.RESET_DATA:
            return {
                ...state, updateStudentMarks: action.payload
            }
        case actionType.GET_MY_CLASS:
            return {
                ...state, getMyClass: action.payload
            }
        default:
            return state;
    }
}

export default staffReducer;