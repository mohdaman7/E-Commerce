import React from "react";

function Banner2() {
  return (
    <div className="flex flex-wrap gap-4 p-4 rounded-lg shadow-md mt-32">
      {/* <div className="flex-1 min-w-[200px]">
        <img
          src="https://i0.wp.com/www.reneeroaming.com/wp-content/uploads/2020/10/Fall-womens-hiking-outfit.jpg?resize=819%2C1024&ssl=1"
          alt="Hiking Outfit"
          className="w-full h-4/5 object-cover rounded-lg"
          
        />
        
      </div> */}
      {/* <div className="flex-1 min-w-[200px]">
        <img
          src="https://alpkit.com/cdn/shop/files/mens-windproofs-m.png?v=1616514367623993568"
          alt="Gear Bunker"
          className="w-full h-4/5 object-cover rounded-lg"
        />
        
      </div> */}
      {/* <div className="flex-1 min-w-[200px]">
        <img
          src="https://klasvanjuflinda.nl/wp-content/uploads/2017/08/22404117_xl-768x1152.jpg"
          alt="Nature Scene"
          className="w-full h-4/5 object-cover rounded-lg"
        />
       
      </div> */}

      <div className="flex-1 min-w-[200px] h-[750px]">
        <div className="bg-men-bg w-full h-4/5 object-cover bg-center bg-no-repeat rounded-sm"></div>
      </div>
      <div className="flex-1 min-w-[200px] h-[750px]">
        <div className="bg-women-bg w-full h-4/5 object-cover bg-center bg-no-repeat rounded-lg"></div>
      </div>
      <div className="flex-1 min-w-[200px] h-[750px]">
        <div className="bg-kid-bg w-full h-4/5 object-cover bg-center bg-no-repeat rounded-lg"></div>
      </div>
    </div>
  );
}

export default Banner2;
