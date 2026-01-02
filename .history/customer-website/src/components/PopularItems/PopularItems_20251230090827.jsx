'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  HeartIcon as HeartOutline,
  StarIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid';

const popularItems = [
  {
    name: 'Classic Chikki',
    img: 'pista.png',
    desc: 'Crunchy peanut & jaggery delight',
    price: '₹199',
    rating: 4.5,
    bg: 'bg-gradient-to-b from-orange-200 to-orange-400',
  },
  {
    name: 'Strawberry Chikki',
    img: 'stwabarry_chikki.png',
    desc: 'Fruity strawberry crunch',
    price: '₹249',
    rating: 4.8,
    bg: 'bg-gradient-to-b from-pink-200 to-pink-400',
  },
  {
    name: 'Mango Chikki',
    img: 'mango_chikki.png',
    desc: 'Sweet mango infused chikki',
    price: '₹229',
    rating: 4.6,
    bg: 'bg-gradient-to-b from-green-200 to-green-400',
  },
  {
    name: 'Chocolate Chikki',
    img: 'choclate.png',
    desc: 'Rich chocolate coated goodness',
    price: '₹299',
    rating: 4.9,
    bg: 'bg-gradient-to-b from-indigo-200 to-indigo-400',
  },
];

export default function PopularItems() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (itemName) => {
    setWishlist((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <section className="py-20 bg-[#fff7ec]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-14">
          Popular Chikkis
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {popularItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              className={`relative rounded-3xl p-6 text-white shadow-xl ${item.bg}`}
            >
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(item.name)}
                className="absolute top-4 right-4 bg-white/30 p-2 rounded-full"
              >
                {wishlist.includes(item.name) ? (
                  <HeartSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartOutline className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white"
                />
              </div>

              {/* Info */}
              <div className="text-center mt-5">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm opacity-90 mt-1">{item.desc}</p>

                {/* Rating */}
                <div className="flex justify-center items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i <= Math.floor(item.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/50'
                      }`}
                    />
                  ))}
                  <span className="text-sm ml-1">
                    {item.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="text-xl font-extrabold mt-3">
                  {item.price}
                </div>

                {/* Button */}
                <button className="mt-4 w-full bg-white text-gray-900 font-semibold py-2 rounded-full hover:bg-yellow-300 transition">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
