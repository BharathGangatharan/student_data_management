import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import {Outlet} from 'react-router-dom';
import AutoLogout from './AutoLogout';

const PrivateRoute = ({roles}) => {

    let location = useLocation();
    const getLoginState = localStorage.getItem("isLoggedIn");

    const user = {
        role:"staff"
    }

    const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
     
    // if(authState?.RESULT === "success" && !userHasRequiredRole) {
    //     return "Access Denied"
    // }

    if(getLoginState === null || getLoginState === undefined){
        return  <Navigate to="/login" state={{ from: location }} />
    }

    if(getLoginState && userHasRequiredRole) {
        return <AutoLogout><Outlet /></AutoLogout>
    }
}

export default PrivateRoute;