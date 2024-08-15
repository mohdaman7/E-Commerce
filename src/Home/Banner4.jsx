import React from 'react'

function Banner4() {

    const images = [
        {
          src: 'https://cdn.shopify.com/s/files/1/0245/7221/products/308497-116-RENARTS-3_2048x2048.jpg?v=1550940681',
          alt: 'Jordan brand', 
          name: "JORDAN BRAND"    
        },
        {
          src: 'https://boathousefootwear.com/cdn/shop/files/NIK-DH8010-101-WHT-2_1000x.jpg?v=1713888172',
          alt: 'Nike',
          name: "NIKE"       
        },
        {
          src: 'https://outmaxshop.com/components/com_jshopping/files/img_products/29089/new-balance-550-29089-2.jpg',
          alt: 'New Balance',
          name: "JORDAN BRAND"
        },
        {
          src: 'https://i.pinimg.com/originals/55/90/ef/5590ef45d23b05784550613f7245ab32.jpg',
          alt: 'Adidas',
          name: "JORDAN BRAND"
        },
      ];

  return (
    <div className="dark:bg-gray-800 h-screen py-6 sm:py-8 lg:py-12 m-6">
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-extrabold text-black lg:text-4xl dark:text-white">LATEST FOOTWEAR</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6 xl:gap-8">
        {images.map((image, index) => (
          <a
            href="#"
            key={index}
            className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
          >
            <img
              src={image.src}
              loading="lazy"
              alt={image.alt}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-200 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
          </a>
        ))}
        <h1 className='font-bold text-black ml-3'>JORDAN BRAND</h1>
        <h1 className='font-bold text-black ml-3'>NIKE</h1>
        <h1 className='font-bold text-black ml-3'>NEW BALANCE</h1>
        <h1 className='font-bold text-black ml-3'>ADIDAS</h1>
      </div>
    </div>
  </div>
  )
}

export default Banner4
