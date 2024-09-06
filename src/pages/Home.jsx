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
  const navigate = useNavigate();
  const { data, setData } = useContext(contexts);

  useEffect(() => {
    const fn = async () => {
      const response = await axios.get("http://localhost:3000/datass");
      setData(response.data);
    };
    fn();
  }, [setData]);

  return (
    <div className="bg-gray-200">
      <Navibar />
      <Banner />
      <Banner2 />
      
      <section className="container mx-auto px-4">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-8">
          Best-Selling Men's Shoes
        </h1>
        <ProductCard />
      </section>
      
      <div 
        onClick={() => navigate('collections')} 
        className="bg-classic-bg h-[40vh] sm:h-[60vh] lg:h-[80vh] bg-no-repeat mx-4 my-8 cursor-pointer"
      ></div>

      <div>
        <Banner4 />
      </div>

      <section className="bg-home-bg6 h-[40vh] sm:h-[60vh] lg:h-[80vh] bg-no-repeat mx-4 my-8 flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/mens')}
            className="btn hover:bg-transparent text-center py-2 px-4"
          >
            SHOP MEN CASUAL SHOES
          </button>
          <button
            onClick={() => navigate('/womens')}
            className="btn hover:bg-transparent text-center py-2 px-4"
          >
            SHOP WOMEN CASUAL SHOES
          </button>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-8">
          Best-Selling Women's Shoes
        </h1>
        <ProductCard2 />
      </section>

      <div className="bg-white py-8">
        <Logos />
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Home;


