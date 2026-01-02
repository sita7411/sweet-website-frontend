'use client';

import { motion, AnimatePresence } from 'framer-motion';import { useState, useEffect } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const items = [
  {
    title: 'Berries Salad',
    price: '₹199',
    rating: '5.0',
    bg: 'from-[#f6b0aa] to-[#f28b82]',
    img: 'pista.png',
  },
  {
    title: 'Healthy Salad',
    price: '₹149',
    rating: '5.0',
    bg: 'from-[#f9c27d] to-[#f4a261]',
    img: 'stwabarry_chikki.png',
  },
  {
    title: 'Nutri Bowl',
    price: '₹179',
    rating: '5.0',
    bg: 'from-[#9fe0a8] to-[#6bcf95]',
    img: 'mango_chikki.png',
  },
  {
    title: 'Fresh Mix',
    price: '₹199',
    rating: '5.0',
    bg: 'from-[#aab2ff] to-[#7c83fd]',
    img: 'choclate.png',
  },
];

export default function PopularItems() {
  const [active, setActive] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (index: number) => {
    setWishlist((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto">

        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[var(--text-main)]">
            Popular Picks
          </h2>
          <p className="mt-4 text-[var(--text-muted)] max-w-xl mx-auto">
            Crafted with premium ingredients and loved across India
          </p>
        </motion.div>

        {/* ===== Slider Box ===== */}
        <div className="relative bg-[var(--bg-soft)] rounded-[56px] px-20 py-16 shadow-xl">

          {/* Left Arrow */}
          <button
            onClick={() => setActive((active - 1 + items.length) % items.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronLeftIcon className="w-5 h-5 text-[var(--text-main)]" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`
                  relative bg-gradient-to-br ${item.bg}
                  rounded-[28px] px-6 pt-20 pb-6 text-white shadow-xl
                  ${active === index ? 'scale-[1.05] ring-2 ring-white/50' : 'opacity-80'}
                `}
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </motion.div>

                <h3 className="text-base font-semibold tracking-wide">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold mt-1">{item.price}</p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-5">
                  
                  {/* Order Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/90 text-[var(--text-main)] text-xs px-4 py-1.5 rounded-full font-semibold shadow hover:bg-white transition"
                  >
                    Order
                  </motion.button>

                  {/* Wishlist + Rating */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => toggleWishlist(index)}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                    >
                      <HeartIcon
                        className={`w-4 h-4 transition ${
                          wishlist.includes(index)
                            ? 'text-red-500 scale-110'
                            : 'text-[var(--primary)]'
                        }`}
                      />
                    </motion.button>
                    <span className="text-xs font-medium">
                      ★ {item.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => setActive((active + 1) % items.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronRightIcon className="w-5 h-5 text-[var(--text-main)]" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {items.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  active === i ? 'bg-[var(--primary)] scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
