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
     
    // if(authState?.output === "success" && !userHasRequiredRole) {
    //     return "Access Denied"
    // }
     
    return (
        (getLoginState && userHasRequiredRole)? <AutoLogout><Outlet /></AutoLogout> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default PrivateRoute;