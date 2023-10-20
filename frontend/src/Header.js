import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  useEffect(()=>{
    const auth = localStorage.getItem('user');
  })

  const url = process.env.REACT_APP_BACKEND_URL;
  let auth = localStorage.getItem('user');
  let userName = localStorage.getItem("userName");
  let userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();
  
  return (
    <>
      <div className="sticky-top">
        <nav className="navbar bg-dark navbar-dark">
          {auth
            ? (auth && userRole === "admin") ? (
              <div className="d-inline-block d-flex justify-content-end container-fluid">
                <Link className="navbar-brand" to="/getAll">
                  GetAllProduct
                </Link>
                <Link className="navbar-brand" to="/getAllUser">
                  GetAllUser
                </Link>
                <button className="d-inline-block btn btn-dark" onClick={() => {
                  fetch(`${url}/api/v1/user/logout`)
                    .then(() => {
                      return localStorage.clear();
                    }).then(() => {
                      navigate('/register');
                    })

                }} >
                  logout ({userName})
                </button>
              </div>
            ) : 
            (
            <div className="container-fluid">
              <Link className="navbar-brand" to="/home">
                Home
              </Link>
              <Link className="navbar-brand" to="/detail">
                Book Details
              </Link>
              <Link className="navbar-brand" to="/addBook">
                Add Book
              </Link>
              <button className="btn btn-dark btn btn-dark" onClick={() => {
                  fetch(`${url}/api/v1/user/logout`)
                    .then(() => {
                      return localStorage.clear();
                    }).then(() => {
                      navigate('/register');
                    })

                }} >
                  logout ({userName})
                </button>
            </div>)
            : 
              <div className="d-flex justify-content-end container-fluid">
                <Link className="navbar-brand " to="/register">
                  Signup
                </Link>
                <Link className="navbar-brand" to="/login">
                  Login
                </Link>
              </div>
          }
        </nav>
      </div>
    </>
  );
};
export default Header;