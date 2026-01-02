'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';

const items = [
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
    title: 'SP Dana GUD lADU',
    subtitle: 'Rich Cocoa Coated',
    price: '₹280',
    rating: '5.0',
    img: 'dana_ladu.png',
  },
  {
    title: 'Pineapple Chocolate Chikki',
    subtitle: 'Rich Cocoa Coated',
    price: '₹390',
    rating: '5.0',
    img: 'mango_chikki.png',
  },
  {
    title: 'Ajmeri Kalakand',
    subtitle: 'Rich Cocoa Coated',
    price: '₹280',
    rating: '5.0',
    img: 'kalakand.png',
  },
];

export default function PopularItems() {
  const [index, setIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (i) => {
    setAddedItems((prev) => ({ ...prev, [i]: true }));
  };

  const handleWishlist = (i) => {
    setWishlistItems((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  // Responsive: 1 item on mobile, 2 on tablet, 4 on desktop
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;      // sm
    if (window.innerWidth < 1024) return 2;     // md to lg
    return 4;                                   // lg+
  };

  const visibleCount = getVisibleCount();

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(items[(index + i) % items.length]);
    }
    return visible;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-[15px] text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Handcrafted chikki made with premium ingredients, loved for its
            authentic taste and perfect crunch.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div
          className="relative rounded-3xl sm:rounded-[60px] px-6 sm:px-10 lg:px-13 py-10 sm:py-14 lg:py-18 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('Group 57.png')" }}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-2 sm:left-4 lg:-left-3 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 lg:w-19 lg:h-19 rounded-full bg-white shadow-lg items-center justify-center hover:scale-110 transition z-10"
          >
            <ChevronLeftIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[var(--text-main)]" />
          </button>

          {/* Cards Grid */}
          <div
            className={`
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              gap-6 sm:gap-8 lg:gap-10
              justify-center items-start
            `}
          >
            {visibleItems.map((item, i) => (
              <motion.div
                key={`${index}-${i}`} // key changes with slide to trigger animation
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="
                  relative bg-white rounded-2xl sm:rounded-[28px]
                  px-5 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-7
                  shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                  mx-auto max-w-xs
                "
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="
                    absolute -top-10 sm:-top-12 lg:-top-14 left-1/2 -translate-x-1/2
                    w-20 h-20 sm:w-22 sm:h-22 lg:w-25 lg:h-25
                    bg-[var(--bg-card)] rounded-full shadow-md
                    flex items-center justify-center
                  "
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover"
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-center text-base sm:text-lg lg:text-[15px] font-semibold text-[var(--text-main)] mt-4">
                  {item.title}
                </h3>
                <p className="text-center text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                  {item.subtitle}
                </p>

                {/* Price + Wishlist */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xl sm:text-2xl lg:text-[22px] font-bold text-[var(--secondary)]">
                    {item.price}
                  </p>

                  <motion.button
                    onClick={() => handleWishlist(index + i)}
                    whileHover={{ scale: 1.15 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition ${
                      wishlistItems[index + i]
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-card)] text-[var(--primary)]'
                    }`}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Add to Cart + Rating */}
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <motion.button
                    onClick={() => handleAddToCart(index + i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center gap-2 text-xs px-4 sm:px-5 py-2 rounded-full font-semibold shadow transition ${
                      addedItems[index + i]
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-soft)] text-[var(--primary)] hover:brightness-105'
                    }`}
                  >
                    <ShoppingCartIcon className="w-4 h-4" />
                    {addedItems[index + i] ? 'Added' : 'Add to Cart'}
                  </motion.button>

                  <div className="flex justify-center sm:justify-end items-center gap-1">
                    <span className="text-xs sm:text-sm font-medium text-[var(--text-muted)]">
                      ★ {item.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-2 sm:right-4 lg:-right-3 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 lg:w-19 lg:h-19 rounded-full bg-white shadow-lg items-center justify-center hover:scale-110 transition z-10"
          >
            <ChevronRightIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[var(--text-main)]" />
          </button>

          {/* Mobile Dots Indicator */}
          <div className="flex sm:hidden justify-center mt-8 gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition ${
                  i === index ? 'bg-[var(--accent)] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}