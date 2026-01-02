'use client';

import { motion } from 'framer-motion';
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
    bg: 'bg-[#f6b0aa]',
    img: 'pista.png',
  },
  {
    title: 'Healthy Salad',
    price: '₹149',
    rating: '5.0',
    bg: 'bg-[#f9c27d]',
    img: 'stwabarry_chikki.png',
  },
  {
    title: 'Nutri Bowl',
    price: '₹179',
    rating: '5.0',
    bg: 'bg-[#9fe0a8]',
    img: 'mango_chikki.png',
  },
  {
    title: 'Fresh Mix',
    price: '₹199',
    rating: '5.0',
    bg: 'bg-[#aab2ff]',
    img: 'choclate.png',
  },
];

export default function PopularItems() {
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
          <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition">
            <ChevronLeftIcon className="w-5 h-5 text-[var(--text-main)]" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${item.bg} rounded-[28px] px-6 pt-20 pb-6 text-white shadow-xl`}
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-white rounded-full shadow-md flex items-center justify-center"
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
                  
                  {/* Smaller Order Button */}
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
                      whileHover={{ scale: 1.15 }}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                    >
                      <HeartIcon className="w-4 h-4 text-[var(--primary)]" />
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
          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition">
            <ChevronRightIcon className="w-5 h-5 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
