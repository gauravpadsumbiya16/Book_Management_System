import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetAllUser = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    fetch(`${url}/api/v1/user/AllUsers/`)
      .then((res) => { return res.json() })
      .then((result) => setData(result));
  })

  const Allusers = data.map((datas) => {
    return (
      <>
        <div className="container h-100 my-3">
          <div className="container my-3">
            <div className="d-flex justify-content-center container-fluid">
              <h4 className="d-inline-block"> {datas.userName} </h4> &nbsp;&nbsp;&nbsp;
              <h5 className="d-inline-block my-1"> {datas.role} </h5>
              <div className="d-flex justify-content-end">
                <button className="mx-2 btn btn-success" onClick={() => {
                    fetch(`${url}/api/v1/user/updateRole/${datas._id}/`, {
                      method: "PUT",
                      body: JSON.stringify(datas),
                      headers: {
                          "Content-Type": "application/json"
                      }
                  }).then((res)=>{res.json()})
                  .then(()=>{navigate("/getAllUser")})
                }}>
                  change role
                </button>
              </div>
            
            </div>
            
          </div>
        </div>
      </>)
  });

  return (
  <>
  <div className="container h-100 my-3 border border-primary rounded">
          <div className="container my-3">
            <div className="d-flex flex-column mb-3 justify-content-center container-fluid">
              {Allusers}
            </div>
          </div>
        </div>
  </>);
}

export default GetAllUser;