import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [e, setE] = useState(false);
    const [pass, repPass] = useState("");
    const url = process.env.REACT_APP_BACKEND_URL;


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
    console.log("pass = ", data.pass, " repPass = ", pass);

    return (
        <>
            <section style={{ backgroundColor: `#eee` }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: `25px` }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4">
                                                <div>
                                                    {e && (data.pass !== pass) && <span className="invalid-input text-danger">*Password not matched</span>}
                                                </div>
                                                {error && !data.userName && <span className="invalid-input text-danger">*Enter UserName</span>}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example1c">Your Name</label>
                                                        <input type="text" id="form3Example1c" className="form-control"
                                                            onChange={(e) => {
                                                                setData({ ...data, userName: e.target.value });
                                                            }} />

                                                    </div>
                                                </div>

                                                {error && !data.email && <span className="invalid-input text-danger">*Enter Email Address</span>}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example3c">Your Email</label>
                                                        <input type="email" id="form3Example3c" className="form-control"
                                                            onChange={(e) => {
                                                                setData({ ...data, email: e.target.value });
                                                            }} />

                                                    </div>
                                                </div>

                                                {error && !data.password && <span className="invalid-input text-danger">*Enter Password</span>}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example4c">Password</label>
                                                        <input type="password" id="form3Example4c" className="form-control"
                                                            onChange={(e) => {
                                                                setData(setE(false))
                                                                setData({ ...data, password: e.target.value });
                                                            }} />

                                                    </div>
                                                </div>
                                                {error && !pass && <span className="invalid-input text-danger">*Enter Repeat Password</span>}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" for="form3Example4cd">Confirm your password</label>
                                                        <input type="password" id="form3Example4cd" className="form-control"
                                                            onChange={(e) => {
                                                                repPass(e.target.value);
                                                            }} />

                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg"
                                                        onClick={() => {
                                                            if (!data.userName || !data.email || !data.password) {
                                                                setError(true)
                                                                return false;
                                                            }
                                                            else if (data.password !== pass) {
                                                                console.log(data.password, "=== check ===", pass)
                                                                setE(true);
                                                                return false;
                                                            }
                                                            else {
                                                                fetch(`${url}/api/v1/user/register`, {
                                                                    method: "POST",
                                                                    body: JSON.stringify(data),
                                                                    headers: {
                                                                        "Content-Type": "application/json"
                                                                    }
                                                                }).then(async (result) => {
                                                                    result = await result.json();
                                                                    localStorage.setItem("user", JSON.stringify(result.user._id));
                                                                    localStorage.setItem("userName", JSON.stringify(result.user.userName));
                                                                    localStorage.setItem("token", JSON.stringify(result.token));
                                                                    navigate("/detail");
                                                                }).catch((e) => {
                                                                    setE(true)
                                                                    return false;
                                                                });
                                                            }
                                                        }
                                                        }
                                                    >Register</button>

                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <Link to={"/Login"}>Login here</Link>
                                                </div>

                                                {/* <div className="d-flex flex-row align-items-right mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Link to={"/login"}>Login here</Link>
                                                    </div>
                                                </div> */}

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Registration;