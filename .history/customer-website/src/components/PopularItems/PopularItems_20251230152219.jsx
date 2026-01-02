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
  { title: 'Pista Chocolate Chikki', subtitle: 'Chocolate & Peanut Blend', price: '₹250', rating: '5.0', img: 'pista.png' },
  { title: 'Strawberry Delight', subtitle: 'Fruity Crunch Chikki', price: '₹350', rating: '5.0', img: 'stwabarry_chikki.png' },
  { title: 'Mango Fusion', subtitle: 'Seasonal Mango Flavor', price: '₹179', rating: '5.0', img: 'mango_chikki.png' },
  { title: 'Chocolate Crunch', subtitle: 'Rich Cocoa Coated', price: '₹199', rating: '5.0', img: 'choclate.png' },
  { title: 'SP. Dana GUD lADU', subtitle: 'Rich Cocoa Coated', price: '₹280', rating: '5.0', img: 'dana_ladu.png' },
  { title: 'Pineapple Chocolate Chikki', subtitle: 'Rich Cocoa Coated', price: '₹390', rating: '5.0', img: 'mango_chikki.png' },
  { title: 'Ajmeri Kalakand', subtitle: 'Rich Cocoa Coated', price: '₹280', rating: '5.0', img: 'kalakand.png' },
];

export default function PopularItemsMobile() {
  const [index, setIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});

  const prevSlide = () => setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  const handleAddToCart = (i) => setAddedItems((prev) => ({ ...prev, [i]: true }));
  const handleWishlist = (i) => setWishlistItems((prev) => ({ ...prev, [i]: !prev[i] }));

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(items[(index + i) % items.length]);
    }
    return visible;
  };

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-2 text-sm sm:text-[14px] text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
            Handcrafted chikki made with premium ingredients, loved for its authentic taste and perfect crunch.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="relative bg-cover bg-center bg-no-repeat flex flex-wrap justify-center gap-6 sm:gap-8" style={{ backgroundImage: "url('Group 57.png')" }}>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronLeftIcon className="w-5 sm:w-6 h-5 sm:h-6 text-[var(--text-main)]" />
          </button>

          {/* Cards */}
          {getVisibleItems().map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl px-4 pt-20 pb-5 shadow w-full sm:w-[48%]"
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-[var(--bg-card)] rounded-full shadow-md flex items-center justify-center"
              >
                <img src={item.img} alt={item.title} className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover" />
              </motion.div>

              {/* Content */}
              <h3 className="text-sm sm:text-[15px] -mt-8 font-semibold text-[var(--text-main)]">{item.title}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">{item.subtitle}</p>

              {/* Price + Wishlist */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg sm:text-[20px] font-bold text-[var(--secondary)]">{item.price}</p>
                <motion.button
                  onClick={() => handleWishlist(i)}
                  whileHover={{ scale: 1.1 }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow transition ${
                    wishlistItems[i] ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-card)] text-[var(--primary)]'
                  }`}
                >
                  <HeartIcon className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Add to Cart + Rating */}
              <div className="flex items-center justify-between mt-3 gap-2">
                <motion.button
                  onClick={() => handleAddToCart(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1 text-xs px-3 sm:px-4 py-1 rounded-full font-semibold shadow transition ${
                    addedItems[i] ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-soft)] text-[var(--primary)] hover:brightness-105'
                  }`}
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  {addedItems[i] ? 'Added' : 'Add to Cart'}
                </motion.button>
                <span className="text-xs font-medium text-[var(--text-muted)]">★ {item.rating}</span>
              </div>
            </motion.div>
          ))}

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronRightIcon className="w-5 sm:w-6 h-5 sm:h-6 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
