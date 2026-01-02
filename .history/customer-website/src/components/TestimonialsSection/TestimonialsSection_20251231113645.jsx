'use client';

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Michelle Smith',
    location: 'New York',
    review: 'This place is amazing with the current review of the product. You can count on the team for all the stuff.',
  },
  {
    name: 'David Anderson',
    location: 'Los Angeles',
    review: 'This place is amazing with the current review of the product. You can count on the team for all the stuff.',
  },
  {
    name: 'Michelle Smith',
    location: 'Chicago',
    review: 'This place is amazing with the current review of the product. You can count on the team for all the stuff.',
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-6xl w-full px-4">
          {/* Title */}
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Customer Love Us ?
          </h2>

          {/* Carousel Container */}
          <div className="relative">
            {/* Decorative Veggies */}
            <img
              src="https://via.placeholder.com/150?text=Lettuce"
              alt="lettuce"
              className="absolute left-0 top-20 w-32 -rotate-12 opacity-80 z-10"
            />
            <img
              src="https://via.placeholder.com/120?text=Tomato"
              alt="tomato"
              className="absolute right-10 bottom-10 w-28 rotate-12 opacity-80 z-10"
            />
            <img
              src="https://via.placeholder.com/80?text=Leaf"
              alt="leaf"
              className="absolute right-0 top-10 w-20 rotate-45 opacity-70 z-10"
            />

            {/* Carousel */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-md">
                      {/* Stars */}
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-8 h-8 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.963c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.963a1 1 0 00-.364-1.118L2.317 9.39c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.963z" />
                          </svg>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-center text-gray-600 text-lg italic mb-8">
                        "{testimonial.review}"
                      </p>

                      {/* Avatar & Name */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mb-4" />
                        <h4 className="font-semibold text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition z-20"
            >
              <ChevronLeftIcon className="w-8 h-8 text-orange-500" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition z-20"
            >
              <ChevronRightIcon className="w-8 h-8 text-orange-500" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentIndex ? 'bg-orange-500 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}