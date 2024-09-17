import {getClassList,getTeacherDetails,getMyClass} from '../../store/staffReducer/action';
import {getStaffTimeTable} from '../../store/timeTableReducer/action';
import {useDispatch, useSelector} from 'react-redux';

export const useSendTeacherId  = ()=>{

    const loginState = useSelector((state)=>state?.loginReducer?.login);
    const dispatch = useDispatch();

    const sendTeacherIdPayload = (id) => {
        const sendTeacherId = {
            "TEACHERID": loginState?.TEACHERID
        };

        dispatch(getClassList(sendTeacherId));
        dispatch(getTeacherDetails(sendTeacherId));
        dispatch(getMyClass(sendTeacherId));
        dispatch(getStaffTimeTable(sendTeacherId));
    };

    return sendTeacherIdPayload;
    
}