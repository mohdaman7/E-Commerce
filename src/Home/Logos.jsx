import React from 'react'

function Logos() {

    const imageUrls = [
        'https://images.footlocker.com/content/dam/final/FootLockerInc/site/evergreen/brand-6up-nike-jordan.jpg',
        'https://images.footlocker.com/content/dam/final/FootLockerInc/site/evergreen/brand-6up-new-balance.jpg',
        'https://images.footlocker.com/content/dam/final/FootLockerInc/site/evergreen/brand-6up-adidas.jpg',
        'https://images.footlocker.com/content/dam/final/FootLockerInc/site/evergreen/brand-6up-hoka.jpg',
        'https://static.vecteezy.com/system/resources/previews/023/627/153/non_2x/puma-logo-editorial-free-vector.jpg'
      ];

  return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 place-items-center m-3 h-64 mt-10">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          className="hover:opacity-75"
          src={url}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default Logos
