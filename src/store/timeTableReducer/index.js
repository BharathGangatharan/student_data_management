import actionType from "./actionType";

const initialState = {
    tableAllClassList: [],
    tableSubjectList: [],
    tableUpdate: {}
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
        default:
            return state;
    }
}

export default timeTableReducer;