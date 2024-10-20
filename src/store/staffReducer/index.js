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
    getMyClass: {},
    getMyClassMarks: [],
    getMyClassSubjects: [],
    displaySummary: [],
    approvedMarks: {},
    getApprovedStudentsList: [],
    getClassSubAvg: [],
    getLeaveApprovals: [],
    approveStudentLeave: {},
    rejectStudentLeave: {},
    createTaskList: {},
    editTaskList: {},
    deleteTaskList: {},
    getTaskList: []
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
        case actionType.GET_MY_CLASS_MARKS:
            return {
                ...state, getMyClassMarks: action.payload
            }
        case actionType.GET_MY_CLASS_SUBJECTS:
            return {
                ...state, getMyClassSubjects: action.payload
            }
        case actionType.DISPLAY_STUDENT_SUMMARY:
            return {
                ...state, displaySummary: action.payload
            }
        case actionType.APPROVE_MARKS:
            return {
                ...state, approvedMarks: action.payload
            }
        case actionType.GET_APPROVED_STUDENTS_MARKS:
            return {
                ...state, getApprovedStudentsList: action.payload
            }
        case actionType.GET_CLASS_SUB_AVG:
            return {
                ...state, getClassSubAvg: action.payload
            }
        case actionType.GET_MY_CLASS:
            return {
                ...state, getMyClass: action.payload
            }
        case actionType.GET_LEAVE_APPROVALS:
            return {
                ...state, getLeaveApprovals: action.payload
            }
        case actionType.APPROVE_STUDENT_LEAVE:
            return {
                ...state, approveStudentLeave: action.payload
            }
        case actionType.REJECT_STUDENT_LEAVE:
            return {
                ...state, rejectStudentLeave: action.payload
            }
        case actionType.CREATE_TASK_LIST:
            return {
                ...state, createTaskList: action.payload
            }
        case actionType.EDIT_TASK_LIST:
            return {
                ...state, editTaskList: action.payload
            }
        case actionType.DELETE_TASK_LIST:
            return {
                ...state, deleteTaskList: action.payload
            }
        case actionType.GET_TASK_LIST:
            return {
                ...state, getTaskList: action.payload
            }
        case actionType.RESET_STUDENT_MARKS_DATA:
            return {
                ...state, studentMarksData: []
            }
        case actionType.RESET_DATA:
            return {
                ...state, updateStudentMarks: action.payload
            }
        case actionType.RESET_APPROVE_MARKS:
            return {
                ...state, approvedMarks: action.payload
            }
        case actionType.RESET_CREATE_TASK_LIST:
            return {
                ...state, createTaskList: action.payload
            }
        case actionType.RESET_EDIT_TASK_LIST:
            return {
                ...state, editTaskList: action.payload
            }
        case actionType.RESET_DELETE_TASK_LIST:
            return {
                ...state, deleteTaskList: action.payload
            }
        case actionType.RESET_GET_TASK_LIST:
            return {
                ...state, getTaskList: action.payload
            }
        default:
            return state;
    }
}

export default staffReducer;