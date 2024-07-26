import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import staffReducer from './staffReducer';
import timeTableReducer from './timeTableReducer';

const RootReducer = combineReducers({
    loginReducer: loginReducer,
    staffReducer: staffReducer,
    timeTableReducer: timeTableReducer
    
});
 
export default RootReducer;