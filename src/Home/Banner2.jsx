import React from "react";
import { useNavigate } from "react-router-dom";

function Banner2() {

  const navigate = useNavigate()

  return (
    <div className="flex flex-wrap gap-4 rounded-lg shadow-md mt-6 ">
      <div className="flex-1 min-w-[200px] h-[750px] ">
        <div className="bg-men-bg w-full h-4/5 object-cover bg-center bg-no-repeat rounded-sm ">
          <div className="flex flex-col items-center justify-center h-[100vh]">
            <h1 className="text-4xl font-black text-center text-white m-3">MENS</h1>
            <button class="w-40 bg-transparent hover:text-black text-white font-semibold hover:bg-white  py-2 px-4 border border-white hover:border-transparent rounded" 
             onClick={()=>navigate('/mens')}>
              SHOP MENS
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-[200px] h-[750px] ">
        <div className="bg-women-bg w-full h-4/5 object-cover bg-center bg-no-repeat rounded-sm ">
          <div className="flex flex-col items-center justify-center h-[100vh]">
            <h1 className="text-4xl font-black text-center text-white m-3">WOMENS</h1>
            <button class="w-40 bg-transparent hover:text-black text-white font-semibold hover:bg-white  py-2 px-4 border border-white hover:border-transparent rounded"
            onClick={()=>navigate('/womens')}>
              SHOP WOMENS
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-[200px] h-[750px] ">
        <div className="bg-kid-bg w-full h-4/5 object-cover bg-center bg-no-repeat rounded-sm ">
          <div className="flex flex-col items-center justify-center h-[100vh]">
            <h1 className="text-4xl font-black text-center text-white m-3">KIDS</h1>
            <button class="w-40 bg-transparent hover:text-black text-white font-semibold hover:bg-white  py-2 px-4 border border-white hover:border-transparent rounded"
            onClick={()=>navigate('/kids')}>
              SHOP KIDS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner2;
