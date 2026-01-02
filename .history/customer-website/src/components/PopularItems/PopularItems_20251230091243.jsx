'use client';

import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/solid';

const items = [
  {
    name: 'Berries Salad',
    img: 'pista.png',
    price: '$5.00',
    rating: 4.5,
    bg: 'bg-[#f48b8b]',
  },
  {
    name: 'Healthy Salad',
    img: 'nuts.png',
    price: '$3.00',
    rating: 4.3,
    bg: 'bg-[#f6c453]',
  },
  {
    name: 'Berries Salad',
    img: 'stwabarry_chikki.png',
    price: '$4.00',
    rating: 4.6,
    bg: 'bg-[#8bd17c]',
  },
  {
    name: 'Healthy Salad',
    img: 'choclate.png',
    price: '$5.00',
    rating: 4.8,
    bg: 'bg-[#7b7bf3]',
  },
];

export default function PopularItems() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 bg-[#fff1e6]">
      <div className="max-w-6xl mx-auto px-6">

        {/* White Rounded Container */}
        <div className="bg-white rounded-[50px] px-14 py-10 shadow-lg relative flex items-center gap-6">

          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 bg-[#fff1e6] rounded-full flex items-center justify-center shadow"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {items.map((item, i) => (
              <div
                key={i}
                className={`${item.bg} min-w-[200px] rounded-[28px] pt-14 pb-6 px-4 text-center relative`}
              >
                {/* Image */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <img
                    src={item.img}
                    className="w-20 h-20 rounded-full bg-white p-1 shadow object-cover"
                  />
                </div>

                <h3 className="text-white font-semibold text-sm mt-4">
                  {item.name}
                </h3>

                <p className="text-white text-lg font-bold mt-1">
                  {item.price}
                </p>

                {/* Rating */}
                <div className="flex justify-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <StarIcon
                      key={n}
                      className={`w-4 h-4 ${
                        n <= Math.floor(item.rating)
                          ? 'text-yellow-300'
                          : 'text-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Button */}
                <button className="mt-4 bg-white text-xs px-4 py-1.5 rounded-full font-semibold shadow">
                  Order Now
                </button>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 bg-[#fff1e6] rounded-full flex items-center justify-center shadow"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
