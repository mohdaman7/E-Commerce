import React, { useContext } from "react";
import { contexts } from "../App";

const ProductCard = () => {
  const { data, setData } = useContext(contexts);
  console.log(data);

  return (
    <>
      <div className="flex flex-wrap gap-10 justify-center">
        {data.slice(0, 9).map((item) => {
          return (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm">
              <div className="bg-white shadow-md rounded-lg h-full flex flex-col dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    className="rounded-t-lg object-cover h-49 w-full"
                    src={item.img}
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5 flex flex-col flex-grow">
                  <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                      {item.name}
                    </h3>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {/* Repeat the above SVGs for stars */}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-1xl font-bold">${item.price}</h3>
                    <a
                      href="#"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductCard;