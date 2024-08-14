import React, { useContext, useEffect, useState } from "react";
import Banner from "../Home/Banner";
import Navibar from "../component/Navibar";
import ProductCard from "../component/ProductCard";
import axios from "axios";
import { contexts } from "../App";


function Home() {
  const {data,setData} = useContext(contexts)
  // const [data, setData] = useState();
  useEffect(() => {
    const fn = async () => {
      const response = await axios.get("http://localhost:3000/datass");
      setData(response.data);
    };
    fn();
  }, []);
  console.log(data);

  return (
    <div className="bg-gray-200">
      <Navibar />
      <Banner />
      <div className="m-auto">
        <h1 className="bold text-2xl m-14">Our Best Seller</h1>
        <ProductCard />
      </div>
    </div>
  );
}

export default Home;
