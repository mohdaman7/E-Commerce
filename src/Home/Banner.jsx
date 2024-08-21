import React from "react";
import { useNavigate } from "react-router-dom";

function Banner() {

  const navigate = useNavigate()

  return (
    <div className="bg-gray-200">
      <div className="bg-home-bg5 h-[75vh] w-[190vh] bg-no-repeat mx-7"></div>
      <div className="text-center ">
        {/* <button
          type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-sm border border-black-200 hover:bg-white hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-black-700 "
          onClick={()=>navigate('/mens')}
        >
          SHOP MEN
        </button> */}
        {/* <button
          type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-sm border border-black-200 hover:bg-white hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-black-700"
          onClick={()=>navigate('/womens')}
       >
          SHOP WOMEN
        </button> */}
        <div onClick={()=>navigate('/mens')} className="bg-home-bg7 h-[45vh] w-full bg-no-repeat "></div>
      </div>

    </div>
  );
}

export default Banner;
