'use client';

import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

const items = [
  {
    title: 'Pista Chikki',
    price: '₹199',
    rating: '5.0',
    img: 'https://nikhilhub.com/wp-content/uploads/2025/09/Pista-Chikki-with-Jaggery-1.jpg',
  },
  {
    title: 'Strawberry Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'https://m.media-amazon.com/images/I/61kxsGvrblL.jpg',
  },
  {
    title: 'Mango Chikki',
    price: '₹179',
    rating: '5.0',
    img: 'https://i5.walmartimages.com/seo/Bikaji-Mango-Dryfruit-Chikki-8-8-Oz_4d9e1882-5e73-4ddc-b168-ff2c07bc52ec.1476164e2c8b2a94fadc859c0bb524cd.jpeg',
  },
  {
    title: 'Chocolate Chikki',
    price: '₹199',
    rating: '5.0',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHQfm2PR9UD3TjXsWB3t_Rmlyn7_xSz4M-g6mRhppEIIREktOisT9RDn8BDCCf3owOw6ti9GUBFWz2ZRkUOpfphW6wbjcE-7_nKKZF7O5oFE_ToZYWqdwmAyWFuF9NtjtlqM8EKf5H5y_qf8BFPcNMuMK89uGn15rPiGssTzG9KW-7BwbYdV7FOTcTwuE/w1200-h630-p-k-no-nu/left3.png',
  },
];

export default function PopularItems() {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (index) => {
    setWishlist((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900">
            Our Popular Chikkis
          </h2>
          <p className="mt-4 text-lg text-amber-700 max-w-2xl mx-auto">
            Premium handcrafted chikkis made with pure jaggery and finest nuts – a timeless Indian delight
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-amber-50">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(index)}
                  className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  {wishlist[index] ? (
                    <HeartSolid className="w-6 h-6 text-amber-600" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-amber-600" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                
                <div className="flex items-center justify-center gap-1 mb-4">
                  <StarIcon className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="text-gray-700 font-medium">{item.rating}</span>
                </div>
                
                <p className="text-3xl font-bold text-amber-700 mb-6">{item.price}</p>
                
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}