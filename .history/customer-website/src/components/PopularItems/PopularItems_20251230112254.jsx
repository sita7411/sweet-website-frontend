'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const itemsData = [
  {
    title: 'Classic Nut Chikki',
    subtitle: 'Jaggery & Peanut Blend',
    price: '₹199',
    rating: '5.0',
    img: 'pista.png',
  },
  {
    title: 'Strawberry Delight',
    subtitle: 'Fruity Crunch Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'stwabarry_chikki.png',
  },
  {
    title: 'Mango Fusion',
    subtitle: 'Seasonal Mango Flavor',
    price: '₹179',
    rating: '5.0',
    img: 'mango_chikki.png',
  },
  {
    title: 'Chocolate Crunch',
    subtitle: 'Rich Cocoa Coated',
    price: '₹199',
    rating: '5.0',
    img: 'choclate.png',
  },
  {
    title: 'Chocolate Crunch',
    subtitle: 'Rich Cocoa Coated',
    price: '₹199',
    rating: '5.0',
    img: 'choclate.png',
  },
];

export default function PopularItems() {
  const [index, setIndex] = useState(0);
  const [cart, setCart] = useState(Array(itemsData.length).fill(false));

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? itemsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === itemsData.length - 1 ? 0 : prev + 1));
  };

  const toggleCart = (i) => {
    const newCart = [...cart];
    newCart[i] = !newCart[i];
    setCart(newCart);
  };

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-[42px] font-extrabold text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Handcrafted chikki made with premium ingredients, loved for its
            authentic taste and perfect crunch.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div
          className="relative rounded-[60px] px-20 py-18 bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: "url('Group 57.png')" }}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute -left-1 top-1/2 -translate-y-1/2 w-19 h-19 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronLeftIcon className="w-8 h-8 text-[var(--text-main)]" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-4 gap-10 mt-9">
            {itemsData
              .slice(index, index + 4)
              .concat(
                index + 4 > itemsData.length
                  ? itemsData.slice(0, index + 4 - itemsData.length)
                  : []
              )
              .map((item, i) => {
                const itemIndex = (index + i) % itemsData.length;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="
                      relative bg-white rounded-[28px]
                      px-6 pt-28 pb-7
                      shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                    "
                  >
                    {/* Image */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 4 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="
                        absolute -top-14 left-1/2 -translate-x-1/2
                        w-25 h-25 bg-[var(--bg-card)]
                        rounded-full shadow-md
                        flex items-center justify-center
                      "
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-[15px] -mt-12 font-semibold text-[var(--text-main)]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {item.subtitle}
                    </p>

                    {/* Price + Wishlist (static) */}
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-[22px] font-bold text-[var(--secondary)]">
                        {item.price}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        className="w-8 h-8 bg-[var(--bg-card)] rounded-full flex items-center justify-center shadow"
                      >
                        <HeartIcon className="w-4 h-4 text-[var(--primary)]" />
                      </motion.button>
                    </div>

                    {/* Add to Cart */}
                    <motion.button
                      onClick={() => toggleCart(itemIndex)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        w-full text-xs px-5 py-1.5 mt-3 rounded-full font-semibold shadow transition flex items-center justify-center gap-2
                        ${cart[itemIndex]
                          ? 'bg-[var(--secondary)] text-white'
                          : 'bg-[var(--accent)] text-[var(--secondary)] hover:brightness-105'}
                      `}
                    >
                      {cart[itemIndex] && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      {cart[itemIndex] ? 'Added' : 'Add to Cart'}
                    </motion.button>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-medium text-[var(--text-muted)]">
                        ★ {item.rating}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-19 h-19 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronRightIcon className="w-8 h-8 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
