'use client';

import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/solid';

const items = [
  {
    title: 'Berries Salad',
    price: '$5.00',
    rating: '5.0',
    bg: 'bg-rose-400',
    img: '/images/salad1.png',
  },
  {
    title: 'Healthy Salad',
    price: '$3.00',
    rating: '5.0',
    bg: 'bg-orange-400',
    img: '/images/salad2.png',
  },
  {
    title: 'Berries Salad',
    price: '$4.00',
    rating: '5.0',
    bg: 'bg-green-400',
    img: '/images/salad1.png',
  },
  {
    title: 'Healthy Salad',
    price: '$5.00',
    rating: '5.0',
    bg: 'bg-indigo-400',
    img: '/images/salad2.png',
  },
];

export default function FoodSlider() {
  return (
    <section className="bg-[#fdebd3] py-20">
      <div className="relative max-w-6xl mx-auto bg-white rounded-[60px] px-20 py-14 shadow-lg">

        {/* Left Arrow */}
        <button className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow flex items-center justify-center">
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative ${item.bg} rounded-[28px] px-6 pt-20 pb-6 text-white shadow-xl`}
            >
              {/* Image */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>

              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold mt-2">{item.price}</p>

              {/* Bottom */}
              <div className="flex items-center justify-between mt-4">
                <button className="bg-white text-black text-sm px-4 py-1.5 rounded-full font-medium">
                  Order Now
                </button>

                <div className="flex items-center gap-2">
                  <HeartIcon className="w-5 h-5 text-red-500 bg-white rounded-full p-1" />
                  <span className="text-sm">★ {item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow flex items-center justify-center">
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
      </div>
    </section>
  );
}
