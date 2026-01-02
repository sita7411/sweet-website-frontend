'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const items = [
  {
    title: 'Classic Nut Chikki',
    subtitle: 'Jaggery & Peanut Blend',
    price: '₹199',
    rating: '5.0',
    img: 'pista.png',
    bgColor: 'bg-pink-400', // Jaise image mein pinkish, orange, green, blue
  },
  {
    title: 'Strawberry Delight',
    subtitle: 'Fruity Crunch Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'stwabarry_chikki.png',
    bgColor: 'bg-orange-400',
  },
  {
    title: 'Mango Fusion',
    subtitle: 'Seasonal Mango Flavor',
    price: '₹179',
    rating: '5.0',
    img: 'mango_chikki.png',
    bgColor: 'bg-green-400',
  },
  {
    title: 'Chocolate Crunch',
    subtitle: 'Rich Cocoa Coated',
    price: '₹199',
    rating: '5.0',
    img: 'choclate.png',
    bgColor: 'bg-purple-400',
  },
];

export default function PopularItems() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-[42px] font-extrabold mb-20">
          Our Popular Picks
        </h2>

        {/* Container */}
        <div className="relative bg-[#fde9cf] rounded-[60px] px-24 py-20 overflow-hidden">

          {/* Left Arrow */}
          <button className="absolute left-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button className="absolute right-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="relative z-10 grid grid-cols-4 gap-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-[28px] px-6 pt-20 pb-7 shadow-lg overflow-hidden" // overflow-hidden for clean edges
              >
                {/* Colored protruding background behind the card */}
                <div className={`absolute inset-0 ${item.bgColor} rounded-[40px] -top-8 scale-110`} />

                {/* Image circle */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#fff7ef] rounded-full flex items-center justify-center shadow z-10">
                  <img src={item.img} alt={item.title} className="w-24 h-24 rounded-full object-cover" />
                </div>

                {/* Content (on top of colored bg) */}
                <div className="relative z-10">
                  <h3 className="font-semibold text-center">{item.title}</h3>
                  <p className="text-xs text-gray-500 text-center">{item.subtitle}</p>
                  <p className="text-xl font-bold mt-3 text-center">{item.price}</p>

                  <div className="flex justify-between mt-6">
                    <button className="bg-orange-200 hover:bg-orange-300 px-5 py-1.5 rounded-full text-xs font-semibold transition">
                      Order Now
                    </button>
                    <div className="flex items-center gap-2">
                      <HeartIcon className="w-4 h-4 text-red-500" />
                      <span className="text-xs">★ {item.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}