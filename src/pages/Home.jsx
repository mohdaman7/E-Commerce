import React, { useContext, useEffect, useState } from "react";
import Banner from "../Home/Banner";
import Navibar from "../component/Navibar";
import ProductCard from "../component/ProductCard";
import axios from "axios";
import { contexts } from "../App";
import Banner2 from "../Home/Banner2";
import Banner3 from "../Home/Banner3";
import { Link } from "react-router-dom";
import Banner4 from "../Home/Banner4";
import Footer from "../component/Footer";
import ProductCard2 from "../component/ProductCart2";
import Logos from "../Home/Logos";

function Home() {
  const { data, setData } = useContext(contexts);
  // const [data, setData] = useState();
  useEffect(() => {
    const fn = async () => {
      const response = await axios.get("http://localhost:3000/datass");
      setData(response.data);
    };
    fn();
  }, []);
  // console.log(data);

  return (
    <div className="bg-gray-200">
      <Navibar />
      <Banner />
      <Banner2 />
      <div className="m-auto">
        <h1 className="font-bold text-2xl m-14 pl-24">
          {" "}
          Best-Selling Men's Shoes
        </h1>
        <ProductCard />
      </div>
      <div>
        <Banner4 />
      </div>
      {/* <div className="m-auto">
        <Banner3/>
      </div> */}

      <div className="">
        <h1 className="font-bold text-2xl m-14 pl-24">
          {" "}
          Best-Selling Women's Shoes
        </h1>
        <ProductCard2/>
      </div>
      <div className="bg-white"> 
      <Logos/>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
