import React from 'react'

function Banner3() {
  return (
    <div>
      <div className="flex justify-center gap-8 mt-10 mx-5">
        <div className="relative w-full max-w-sm bg-white dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden">
          <a href="#!">
            <img
              className="w-full h-60 object-cover"
              src="https://cdn.pixelbin.io/v2/black-bread-289bfa/-6ZJSm/original/clarks-cms_images/1707809251Web_Banner_Size_Web_Banner_705x397_Clarks_Feb_24_Banners_120224.webp"
              alt="Formal Collection"
            />
          </a>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Formal Collection!
            </h2>
            <a
              href="#!"
              className="inline-block py-2.5 px-6 text-sm font-medium text-white bg-black rounded-lg shadow-lg hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-700 transition duration-300"
            >
              Shop Now!
            </a>
          </div>
        </div>

        <div className="relative w-full max-w-sm bg-white dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden">
          <a href="#!">
            <img
              className="w-full h-60 object-cover"
              src="https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg"
              alt="Sneakers Collection"
            />
          </a>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Sneakers Collection!
            </h2>
            <a
              href="#!"
              className="inline-block py-2.5 px-6 text-sm font-medium text-white bg-black rounded-lg shadow-lg hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-700 transition duration-300"
            >
              Shop Now!
            </a>
          </div>
        </div>

        <div className="relative w-full max-w-sm bg-white dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden">
          <a href="#!">
            <img
              className="w-full h-60 object-cover"
              src="https://osb-p.imgix.net/catalog/product/cache/f6b25f7f191701444ab68d1120f3ebff/o/s/osb-field-boot-natural-chromexcel-roughout-commando-sole-x1_1.jpg?q=20&w=1440&dpr=3"
              alt="Sneakers Collection"
            />
          </a>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Boots Collection!
            </h2>
            <a
              href="#!"
              className="inline-block py-2.5 px-6 text-sm font-medium text-white bg-black rounded-lg shadow-lg hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-700 transition duration-300"
            >
              Shop Now!
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner3
