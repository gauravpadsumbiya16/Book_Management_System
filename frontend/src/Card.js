import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = () => {
  const [data, setData] = useState([]);
  const auth = localStorage.getItem('user');
  useEffect(() => {
    getBooks();
  })
  const getBooks = () => {
    fetch(`http://localhost:7000/api/v1/books/${auth}`)
      .then((res) => { return res.json() })
      .then((result) => setData(result));
  }
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      await fetch(`http://localhost:7000/api/v1/search/${auth}/${key}`)
        .then(res => res.json())
        .then((result) => setData(result));
    }
    else {
      getBooks();
    }

  }
  return (
    <>
      <div className=" d-flex justify-content-center mx-2 my-2">
        <input className="border border-warning rounded text-center" type="text" placeholder="Search Book" onChange={searchHandle} />
      </div>

      {data.length > 0 ?
        data.map((datas) => (
          <div className=" col-lg-3 col-sm-12 col-md-6 mb-5 d-flex justify-content-center">
            <div className="w-100 p-3 card rounded h-100 " style={{ width: "20rem" }}>
              <div className="w-100 p-3 d-flex justify-content-center">
                <img className="mt-2 p-1" src={datas.Bookimage} alt="..." />
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  <strong>{datas.Booktitle}</strong>
                </h5>
                <p className="card-text">{datas.Bookdescription}</p>

              </div>
              <div className="d-flex justify-content-center">
                <h6>
                  <strong>₹{datas.Bookprice}</strong>
                  <span className="opacity-50"> (incl. of all taxes)</span>
                </h6>
              </div>
              <div className="d-flex justify-content-center">

                <Link
                  to={"/detail/" + datas._id}
                  className="btn btn-primary stretched-link"
                >
                  Check Details
                </Link>
              </div>
            </div>
          </div>
        )) : <div className="d-flex justify-content-center"><h1>You don't add Book</h1></div>}
    </>
  );
};
export default Card;
