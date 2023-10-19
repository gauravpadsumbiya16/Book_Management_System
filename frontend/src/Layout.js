import React from "react";
import { Outlet } from "react-router-dom";
import Registration from "./Registration";

function Layout() {
  const auth = localStorage.getItem('user');
  return (
    <>
      {auth ? <Outlet /> : <Registration/>}
    </>
  );
}

export default Layout;
