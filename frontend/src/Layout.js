import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Layout() {
  const auth = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      {auth ? <Outlet /> : <Navigate to="/register"/>}
    </>
  );
}

export default Layout;
