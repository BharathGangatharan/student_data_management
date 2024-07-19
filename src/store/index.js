import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const RootReducer = combineReducers({
    loginReducer:loginReducer
});
 
export default RootReducer;