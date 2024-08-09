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

      <div className="mx-7 flex">
         <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark mt-10 ml-7">
          <a href="#!">
            <img
              className="rounded-t-lg"
              src="https://cdn.pixelbin.io/v2/black-bread-289bfa/-6ZJSm/original/clarks-cms_images/1707809251Web_Banner_Size_Web_Banner_705x397_Clarks_Feb_24_Banners_120224.webp"
              alt=""
            />
          </a>
          <div className=" text-surface dark:text-white ">
            <h2 className="mb-2 px-48 pt-7 text-3xl font-semibold leading-tight font-mono tracking-wide">
              FORMAL COLLECTION!
            </h2>

            <button
              type="button"
              className="py-2.5 px-5 mt-5 ml-48 me-2 mb-2 text-sm w-80 font-medium text-white focus:outline-none bg-black rounded-sm border border-black-200 hover:bg-white hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-black-700"
            >
              SHOP NOW!
            </button>
          </div>
        </div>
        
        <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark mt-10 mx-7 ml-20">
          <a href="#!">
            <img
              className="rounded-t-lg w-[95vh] h-[49vh]"
              src="https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg"
              alt=""
            />
          </a>
          <div className=" text-surface dark:text-white ">
            <h2 className="mb-2 px-48 pt-7 text-3xl font-semibold leading-tight font-mono tracking-wide">
              SNEKERS COLLECTION!
            </h2>

            <button
              type="button"
              className="py-2.5 px-5 mt-5 ml-48 me-2 mb-2 text-sm w-80 font-medium text-white focus:outline-none bg-black rounded-sm border border-black-200 hover:bg-white hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-black-700"
            >
              SHOP NOW!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
