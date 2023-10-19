import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const auth = localStorage.getItem('user');
  //const port = process.env.REACT_APP_PORT;

  return (
    <>
      <div
        style={{
          border: "3px solid black",
          justifyContent: "center",
          borderRadius: 20
        }}
        className="container center col-md-4 my-5 py-5"
      >
        <div style={{ textAlign: "center" }}>
          <h5 className="modal-title" id="exampleModalLabel">
            ADD BOOK
          </h5>
        </div>

        <div className="modal-body">
          <form>
            {error && !data.Booktitle && <span className="invalid-input text-danger">*Enter Book Title</span>}
            <div className="form-floating mb-3 text-start">
              <input
                type="text"
                value={data.Booktitle}
                className="form-control"
                id="floatingInput"
                onChange={(e) => {
                  setData({ ...data, Booktitle: e.target.value });
                }}
              />
              <label for="floatingInput">*Book Title</label>

            </div>

            <div className="form-floating mb-3 text-start">
              <input
                type="url"
                value={data.Bookimage}
                className="form-control"
                id="floatingInput"
                onChange={(e) => {
                  setData({ ...data, Bookimage: e.target.value });
                }}
              />
              <label for="floatingInput">Image</label>
            </div>
            {error && !data.Bookprice && <span className="invalid-input text-danger">*Enter Book Price</span>}
            <div className="form-floating mb-3 text-start">
              <input
                type="text"
                value={data.Bookprice}
                className="form-control"
                id="floatingInput"
                onChange={(e) => {
                  setData({ ...data, Bookprice: e.target.value });
                }}
              />

              <label for="floatingInput">*Price</label>

            </div>

            <div className="form-floating mb-3 text-start">
              <input
                type="text"
                value={data.Bookpages}
                className="form-control"
                id="floatingInput"
                onChange={(e) => {
                  setData({ ...data, Bookpages: e.target.value });
                }}
              />
              <label for="floatingInput">Pages</label>
            </div>

            <div className="form-floating mb-3 text-start">
              <input
                type="textarea"
                value={data.Bookdescription}
                className="form-control"
                id="floatingInput"
                onChange={(e) => {
                  setData({ ...data, Bookdescription: e.target.value });
                }}
              />
              <label for="floatingInput">Description</label>
            </div>
            <div className="form-floating mb-3 text-start">
              <input
                type="textarea"
                value={data.Bookauthor}
                className="form-control"
                id="floatingInput"
                onChange={(e) => {
                  setData({ ...data, Bookauthor: e.target.value });
                }}
              />
              <label for="floatingInput">Bookauthor</label>
            </div>
          </form>
        </div>

        <div className="">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (!data.Booktitle || !data.Bookprice) {
                setError(true)
                return false;
              }
              else {
                data.UserId = auth;
                console.log(data);
                fetch(`http://localhost:7000/api/v1/addBook/`, {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json"
                  }
                }).then(() => {
                  navigate("/detail");
                });
              }
            }
            }
          >
            Submit
          </button>

          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={() => {
              navigate(`/detail`);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
export { Add };

/*
fetch(`https://mernbackend-8fos.onrender.com/addBook`, {
                  method: "POST",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json"
                  }
                }).then(() => {
                  console.log("data = ",data);
                  navigate("/detail");
                });
*/