import actionType from "./actionType";

const initialState = {
    tableAllClassList: [],
    tableSubjectList: [],
    tableUpdate: {},
    staffTimeTable: [],
    getTimeTable: []
}

const timeTableReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionType.GET_TIME_TABLE_CLASSLIST:
            return {
                ...state, tableAllClassList: action.payload
            }
        case actionType.GET_TIME_TABLE_SUBJECTLIST:
            return {
                ...state, tableSubjectList: action.payload
            }
        case actionType.TIME_TABLE_UPDATE:
            return {
                ...state, tableUpdate: action.payload
            }
        case actionType.GET_STAFF_TIME_TABLE:
            return {
                ...state, staffTimeTable: action.payload
            }
        case actionType.GET_UPDATED_TIME_TABLE:
            return {
                ...state, getTimeTable: action.payload
            }
        case actionType.RESET_SUBJECT_DATA:
            return {
                ...state, tableSubjectList: action.payload
            }
        default:
            return state;
    }
}

export default timeTableReducer;