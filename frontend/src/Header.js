import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  let auth = localStorage.getItem('user');
  let userName = localStorage.getItem("userName");
  let userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();
  console.log("auth ", auth, " userRole ", userRole);
  
  return (
    <>
      <div className="sticky-top">
        <nav className="navbar bg-dark navbar-dark">
          {auth
            ? (auth && userRole === "admin") ? (
              console.log("\n\n\n\n nexted called"),
              <div className="d-flex justify-content-end container-fluid">
                <Link className="navbar-brand" to="/getAll">
                  GetAllProduct
                </Link>
                <Link className="navbar-brand" to="/getAllUser">
                  GetAllUser
                </Link>
                <Link className="navbar-brand" onClick={() => {
                  fetch(`http://localhost:7000/api/v1/user/logout`)
                    .then(() => {
                      return localStorage.clear();
                    }).then(() => {
                      navigate('/register');
                    })

                }} to="/register">
                  logout ({userName})
                </Link>
              </div>
            ) : 
            (
            console.log("\n\n\n\n nexted don't called"),
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
              <Link className="navbar-brand" onClick={() => {
                fetch(`http://localhost:7000/api/v1/user/logout`)
                  .then(() => {
                    return localStorage.clear();
                  }).then(() => {
                    navigate('/register');
                  })

              }} to="/register">
                logout ({userName})
              </Link>
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