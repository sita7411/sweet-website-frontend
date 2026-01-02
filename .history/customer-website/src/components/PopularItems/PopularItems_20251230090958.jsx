'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  HeartIcon as HeartOutline,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const items = [
  {
    name: 'Classic Chikki',
    img: 'pista.png',
    price: '₹199',
    rating: 4.5,
    bg: 'bg-[#ffb4a2]',
  },
  {
    name: 'Healthy Chikki',
    img: 'nuts.png',
    price: '₹249',
    rating: 4.7,
    bg: 'bg-[#ffd166]',
  },
  {
    name: 'Berry Chikki',
    img: 'stwabarry_chikki.png',
    price: '₹229',
    rating: 4.6,
    bg: 'bg-[#9bf6ff]',
  },
  {
    name: 'Chocolate Chikki',
    img: 'choclate.png',
    price: '₹299',
    rating: 4.9,
    bg: 'bg-[#cdb4db]',
  },
];

export default function PopularItems() {
  const [wishlist, setWishlist] = useState([]);

  return (
    <section className="py-16 bg-[#fff3e8]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Outer rounded container (same as image) */}
        <div className="bg-white rounded-[40px] p-10 shadow-lg relative">

          <h2 className="text-3xl font-bold text-center mb-10">
            Popular Chikkis
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {items.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -8 }}
                className={`${item.bg} rounded-[28px] px-5 pt-14 pb-6 relative text-center`}
              >
                {/* Wishlist */}
                <button
                  onClick={() =>
                    setWishlist((prev) =>
                      prev.includes(item.name)
                        ? prev.filter((i) => i !== item.name)
                        : [...prev, item.name]
                    )
                  }
                  className="absolute top-4 right-4 bg-white/60 p-2 rounded-full"
                >
                  {wishlist.includes(item.name) ? (
                    <HeartSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartOutline className="w-5 h-5 text-gray-700" />
                  )}
                </button>

                {/* Image */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-full border-4 border-white bg-white shadow-md object-cover"
                  />
                </div>

                {/* Content */}
                <h3 className="mt-6 font-semibold text-gray-900">
                  {item.name}
                </h3>

                {/* Rating */}
                <div className="flex justify-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i <= Math.floor(item.rating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Price */}
                <p className="mt-2 font-bold text-gray-900">
                  {item.price}
                </p>

                {/* Button */}
                <button className="mt-4 px-5 py-1.5 bg-white text-sm font-semibold rounded-full shadow hover:bg-black hover:text-white transition">
                  Order Now
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
