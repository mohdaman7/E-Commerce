import React from "react";

function Banner() {
  return (
    <div className="bg-gray-200">
      <div className="bg-home-bg5 h-[80vh] w-[190vh] bg-no-repeat mx-7"></div>
      <div className="text-center pt-0">
        <button
          type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-sm border border-black-200 hover:bg-white hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-black-700 "
        >
          SHOP MEN
        </button>
        <button
          type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-sm border border-black-200 hover:bg-white hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-black-700"
        >
          SHOP WOMEN
        </button>
      </div>

    </div>
  );
}

export default Banner;
