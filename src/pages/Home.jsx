import React, { useContext, useEffect, useState } from "react";
import Banner from "../Home/Banner";
import Navibar from "../component/Navibar";
import ProductCard from "../component/ProductCard";
import axios from "axios";
import { contexts } from "../App";
import Banner2 from "../Home/Banner2";
import Banner3 from "../Home/Banner3";
import { Link, useNavigate } from "react-router-dom";
import Banner4 from "../Home/Banner4";
import Footer from "../component/Footer";
import ProductCard2 from "../component/ProductCart2";
import Logos from "../Home/Logos";

function Home() {
  const navigate = useNavigate()
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
      <div className=""> 
        <h1 className="font-bold text-2xl m-14 pl-24">
          {" "}
          Best-Selling Men's Shoes
        </h1>
        <ProductCard />
      </div>
      <div onClick={()=>navigate('collections')} className="bg-classic-bg h-[80vh] w-[190vh] bg-no-repeat mx-7 mt-24 "></div>
      <div>
        <Banner4 />
      </div>


      <div className="bg-home-bg6 h-[80vh] w-[190vh] bg-no-repeat mx-7 mt-14 flex flex-col items-center justify-center space-y-4 ">
        {/* Button Container */}
        <div className="flex space-x-4 mt-96">
          <button
            onClick={() => navigate('/mens')}
            className="btn hover:bg-transparent"
          >
            SHOP MEN CASUAL SHOES
          </button>
          <button
            onClick={() => navigate('/womens')}
            className="btn hover:bg-transparent"
          >
            SHOP WOMEN CASUAL SHOES
          </button>
        </div>
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
      {/* <Footer/> */}
    </div>
  );
}

export default Home;
