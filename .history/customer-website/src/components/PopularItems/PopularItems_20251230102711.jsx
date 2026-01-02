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
    bgColor: '#f9a8b5', // Pinkish like first card in image
  },
  {
    title: 'Strawberry Delight',
    subtitle: 'Fruity Crunch Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'stwabarry_chikki.png',
    bgColor: '#ffb07a', // Orange
  },
  {
    title: 'Mango Fusion',
    subtitle: 'Seasonal Mango Flavor',
    price: '₹179',
    rating: '5.0',
    img: 'mango_chikki.png',
    bgColor: '#9fde9f', // Green
  },
  {
    title: 'Chocolate Crunch',
    subtitle: 'Rich Cocoa Coated',
    price: '₹199',
    rating: '5.0',
    img: 'choclate.png',
    bgColor: '#b5a1f9', // Purple/Blue
  },
];

export default function PopularItems() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-center text-[42px] font-extrabold mb-20">
          Our Popular Picks
        </h2>

        <div className="relative bg-[#fde9cf] rounded-[60px] px-24 py-20 overflow-hidden">

          {/* Arrows */}
          <button className="absolute left-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button className="absolute right-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-4 gap-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {/* === EXACT SHAPE SVG BACKGROUND === */}
                <svg
                  className="absolute inset-0 w-full h-full -top-6"
                  viewBox="0 0 280 420"
                  preserveAspectRatio="none"
                >
                  <path
                    d="
                      M20 40
                      Q20 20, 40 20
                      L240 20
                      Q260 20, 260 40
                      L260 360
                      Q260 380, 240 380
                      L40 380
                      Q20 380, 20 360
                      Z
                    "
                    fill={item.bgColor}
                  />
                </svg>

                {/* White Card */}
                <div className="relative z-10 bg-white rounded-[28px] px-6 pt-20 pb-7 shadow-lg">
                  {/* Image Circle */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#fff7ef] rounded-full flex items-center justify-center shadow">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                    <p className="text-xl font-bold mt-3">{item.price}</p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
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