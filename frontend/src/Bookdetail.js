import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Bookdetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [error , setError] = useState(false);
  const navigate = useNavigate();
  //const port = process.env.REACT_APP_PORT;
  const url = process.env.REACT_APP_BACKEND_URL;
  const auth = localStorage.getItem('user');

  useEffect(() => {
    console.log(`${url}/api/v1/book/${id}/${auth}`);
    fetch(`${url}/api/v1/book/${id}/${auth}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="row mt-5 pt-5">
          <div className="d-flex justify-content-center col col-lg-6 col-md-12 col-sm-12">
            <img style={{ width: "30rem" }} src={data.Bookimage} alt="book" />
          </div>
          <div className="mt-5 col col-lg-6 col-sm-12 col-md-12">
            <h3>
              <strong>{data.Booktitle}</strong>
            </h3>

            <div className="d-flex justify-content-center">
              <span className="m-5">{data.Bookdescription}</span>
            </div>
            <div class="container text-center">
              <div class="row d-flex justify-content-around my-3">
                <div
                  class="col-4 btn btn-lg btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Edit
                </div>
                <div
                  class="col-4 btn btn-lg btn-outline-danger"
                  onClick={() => {
                    fetch(
                      `${url}/api/v1/book/${id}/${auth}`,
                      { method: "DELETE" }
                    ).then(() => {
                      navigate("/detail");
                    });
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  book Data
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <form>
                {error && !data.Booktitle && <span className="invalid-input text-danger">*Enter Book Title</span>}
                  <div class="form-floating mb-3 text-start">
                    <input
                      type="text"
                      value={data.Booktitle}
                      class="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setData({ ...data, Booktitle: e.target.value });
                      }}
                    />
                    <label for="floatingInput">Book Title</label>
                  </div>

                  <div class="form-floating mb-3 text-start">
                    <input
                      type="url"
                      value={data.Bookimage}
                      class="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setData({ ...data, Bookimage: e.target.value });
                      }}
                    />
                    <label for="floatingInput">Image</label>
                  </div>
                  {error && !data.Bookprice && <span className="invalid-input text-danger">*Enter Book Price </span>}
                  <div class="form-floating mb-3 text-start">
                    <input
                      type="text"
                      value={data.Bookprice}
                      class="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setData({ ...data, Bookprice: e.target.value });
                      }}
                    />
                    <label for="floatingInput">Price</label>
                  </div>

                  <div class="form-floating mb-3 text-start">
                    <input
                      type="text"
                      value={data.Bookpages}
                      class="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setData({ ...data, Bookpages: e.target.value });
                      }}
                    />
                    <label for="floatingInput">Pages</label>
                  </div>

                  <div class="form-floating mb-3 text-start">
                    <input
                      type="textarea"
                      value={data.Bookdescription}
                      class="form-control"
                      id="floatingInput"
                      onChange={(e) => {
                        setData({ ...data, Bookdescription: e.target.value });
                      }}
                    />
                    <label for="floatingInput">Description</label>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    if (!data.Booktitle || !data.Bookprice) {
                      setError(true)
                      return false;
                    }
                    else {
                      fetch(
                        `${url}/api/v1/book/${id}/${auth}`,
                        {
                          method: "PUT",
                          body: JSON.stringify(data),
                          headers: {
                            "Content-Type": "application/json"
                          }
                        }
                      ).then(() => navigate("/detail"));
                    }
                  }}
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Bookdetail;
