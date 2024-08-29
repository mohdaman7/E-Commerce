import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { contexts } from "../App";
import axios from "axios";
const DetailProduct = () => {
  const { addToCart } = useContext(contexts);
  const [datas, setDatas] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fn = async () => {
      const response = await axios.get("http://localhost:3000/datass");
      const res = response.data.filter((item) => item.id == userId);
      setDatas(res);
    };
    fn();
  }, []);

  console.log(
    datas.map((item) => item.name),
    "name"
  );

  return (
    <div className="bg-gray-100">
      {datas.map((item) => {
        return (
          <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-wrap -mx-4">
                {/* Product Images */}
                <div className="w-full md:w-1/2 px-4 mb-8">
                  <img
                    src={item.img}
                    alt="Product"
                    className="w-full h-auto rounded-lg shadow-md mb-4"
                    id="mainImage"
                  />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 px-4">
                  <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mr-2">${item.price}</h3>
                    {/* <span className="text-gray-500 line-through">$399.99</span> */}
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-6 h-6 ${
                          index < 4 ? "text-yellow-500" : "text-gray-300"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">
                      4.5 (120 reviews)
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Step into the ultimate in comfort and style with these
                    premium shoes. Designed for both performance and
                    sophistication, they offer exceptional support for all-day
                    wear while making a bold fashion statement.
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Color:</h3>
                    <div className="flex space-x-2">
                      {["black", "gray-300", "blue-500"].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 bg-${color} rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div> */}

                  <div className="flex space-x-4 mb-6">
                    <button
                      className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => addToCart(item)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                    {/* <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.75a9 9 0 1 0-18 0 9 9 0 0 0 18 0ZM12 9v3m0 0v3m0-3h3m-3 0H9" />
                </svg>
                Wishlist
              </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailProduct;

// for extra imge

// <div className="flex gap-4 py-4 justify-center overflow-x-auto">
//               {/* Thumbnail Images */}
//               {[
//                 "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
//                 "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
//                 "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
//                 "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
//               ].map((src, index) => (
//                 <img
//                   key={index}
//                   src={src}
//                   alt={`Thumbnail ${index + 1}`}
//                   className="w-16 sm:w-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
//                   onClick={() => changeImage(src)}
//                 />
//               ))}
// </div>
