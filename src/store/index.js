import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import staffReducer from './staffReducer';

const RootReducer = combineReducers({
    loginReducer:loginReducer,
    staffReducer:staffReducer
});
 
export default RootReducer;