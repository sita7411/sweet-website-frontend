'use client';

import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';

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
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Popular Chikkis
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Handcrafted with premium nuts, jaggery, and natural flavors – a healthy indulgence loved across India
          </p>
        </div>

        {/* Grid Cards - No Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <HeartIcon className="w-5 h-5 text-amber-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                
                <div className="flex items-center justify-center mt-2">
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <span className="ml-1 text-gray-700 font-medium">{item.rating}</span>
                </div>
                
                <p className="text-3xl font-bold text-amber-600 mt-4">{item.price}</p>
                
                <button className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
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