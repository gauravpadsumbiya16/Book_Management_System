import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = ()=>{
    const auth = JSON.parse(localStorage.getItem('user'));
    console.log(auth);
    return auth ? <Outlet /> : <Navigate to="/register"/>
}

export default PrivateComponent;