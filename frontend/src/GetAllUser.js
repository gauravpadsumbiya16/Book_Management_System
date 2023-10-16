import { useEffect, useState } from "react";

const GetAllUser = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:7000/api/v1/user/AllUsers/`)
      .then((res) => { return res.json() })
      .then((result) => setData(result));
    },[])

    const Allusers = data.map((datas) => {
        return <h5> {datas.userName} </h5>;
      });
    
    return Allusers;
}

export default GetAllUser;