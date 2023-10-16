import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Layout from "./Layout";
import Bookdetail from "./Bookdetail";
import Bookdisplay from "./Bookdisplay";
import { Add } from "./add";
import NoPage from "./NoPage";
import Registration from "./Registration";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import Logout from "./Logout";
import GetAll from "./GetAll";
import GetAllUser from "./GetAllUser";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <>
  <BrowserRouter>
  <Header/>
  <Logout/>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Registration />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail" element={<Bookdisplay />}></Route>
        <Route path="/detail/:id" element={<Bookdetail />}></Route>
        <Route path="/addbook" element={<Add />}></Route>
        <Route path="/getAll" element={<GetAll />}></Route>
        <Route path="/getAllUser" element={<GetAllUser />}></Route>
        <Route path="*" element={<NoPage />} />
      </Route>
       <Route path="/register" element={<Registration/>}></Route>
       <Route path="/login" element={<Login/>}></Route> 
    </Routes>
    <Footer/>
  </BrowserRouter>
  // </>
);
