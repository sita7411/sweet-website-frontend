'use client';

import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  StarIcon,
} from '@heroicons/react/24/solid';

const items = [
  {
    title: 'Pista Chikki',
    price: '₹199',
    rating: '5.0',
    img: 'https://nikhilhub.com/wp-content/uploads/2025/09/Pista-Chikki-with-Jaggery-1.jpg', // Professional pista chikki image
  },
  {
    title: 'Strawberry Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3784373978991979001', // Strawberry flavored chikki
  },
  {
    title: 'Mango Chikki',
    price: '₹179',
    rating: '5.0',
    img: 'https://i.ytimg.com/vi/kRrepxA1eRc/sddefault.jpg', // Mango chikki image
  },
  {
    title: 'Chocolate Chikki',
    price: '₹199',
    rating: '5.0',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijak8WQERevbexfwoqGeNFzYbS4yPNF4PX1T2GE-ZJl1eilNXlyLAkRwLNipKH96WazgZuVeQBAaQhVBu4tpvdjb5h6Qwcp23QNFTy8CWEMB6TxtaQ3d6VJiIfISaPbs44lAdf9cEnvLqZnxrHWNm-j3zVAHjLBvS6JH1zij00Edux_HBNQv9sHjw9J3xK/w1200-h630-p-k-no-nu/center3.png', // Chocolate peanut chikki
  },
];

export default function PopularItems() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(items[(currentIndex + i) % items.length]);
    }
    return visible;
  };

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

        {/* Carousel Container */}
        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
              {[...items, ...items].map((item, index) => (  // Duplicate for seamless loop
                <div key={index} className="w-1/4 flex-shrink-0 px-4">
                  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                    
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
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300"
            aria-label="Next"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-amber-500 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}