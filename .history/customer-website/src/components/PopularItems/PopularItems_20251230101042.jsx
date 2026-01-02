'use client';

import { motion } from 'framer-motion';
import {
  HeartIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
} from '@heroicons/react/24/solid';
import { useState, useRef } from 'react';

const items = [
  {
    id: 1,
    title: 'Classic Nut Chikki',
    subtitle: 'Jaggery & Peanut',
    price: '₹199',
    img: 'pista.png',
  },
  {
    id: 2,
    title: 'Strawberry Delight',
    subtitle: 'Fruity Crunch',
    price: '₹149',
    img: 'https://delicacysweets.com/public/uploads/all/p5sS0MKi6sJO1mhljUNiia8ILmisdUixdzx0XM8s.png',
  },
  {
    id: 3,
    title: 'Mango Fusion',
    subtitle: 'Seasonal Special',
    price: '₹179',
    img: 'https://d3pi03i22pjpvc.cloudfront.net/images/product/400.400/bikaji_mangodryfruit_n.webp',
  },
  {
    id: 4,
    title: 'Chocolate Crunch',
    subtitle: 'Cocoa Coated',
    price: '₹199',
    img: 'https://img-global.cpcdn.com/recipes/62bd75c0b4ff9176/1200x630cq80/photo.jpg',
  },
];

export default function PopularItems() {
  const [liked, setLiked] = useState([]);
  const sliderRef = useRef(null);

  const toggleLike = (id) =>
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-28 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="text-4xl font-semibold text-[var(--text-main)]">
              Our Bestsellers
            </h2>
            <p className="mt-3 text-sm text-[var(--text-muted)] max-w-md">
              Crafted in small batches using authentic ingredients & timeless recipes.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-black/10 hover:bg-black hover:text-white transition"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-black/10 hover:bg-black hover:text-white transition"
            >
              →
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-10 overflow-x-auto scroll-smooth pb-6"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover="hover"
              className="relative min-w-[280px]"
            >
              {/* Card */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition">

                {/* Like */}
                <button
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-5 right-5 z-10"
                >
                  {liked.includes(item.id) ? (
                    <HeartSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  )}
                </button>

                {/* Image */}
                <motion.div
                  variants={{
                    hover: { y: -12, scale: 1.05 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-48 flex items-center justify-center"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </motion.div>

                {/* Info */}
                <div className="mt-6 text-center">
                  <h3 className="text-sm font-semibold tracking-wide text-[var(--text-main)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {item.subtitle}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-[var(--secondary)]">
                      {item.price}
                    </span>

                    <motion.button
                      variants={{
                        hover: { scale: 1.05 },
                      }}
                      className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)]"
                    >
                      <ShoppingBagIcon className="w-4 h-4" />
                      Add to Bag
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
