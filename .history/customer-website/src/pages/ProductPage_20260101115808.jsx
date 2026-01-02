'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

// Product data
const products = [
  { title: 'Pista Chocolate Chikki', desc: 'Chocolate & Peanut Blend', price: 250, img: 'pista.png', hoverImg: 'choclate.png', tag: 'Bestseller', category: 'Bestseller' },
  { title: 'Strawberry Delight', desc: 'Fruity Crunch Chikki', price: 350, img: 'stwabarry_chikki.png', hoverImg: 'mango_chikki.png', tag: 'Special', category: 'Seasonal' },
  { title: 'Mango Fusion', desc: 'Seasonal Mango Flavor', price: 179, img: 'mango_chikki.png', hoverImg: 'pista.png', tag: 'Limited', category: 'Seasonal' },
  { title: 'Chocolate Crunch', desc: 'Rich Cocoa Coated', price: 199, img: 'choclate.png', hoverImg: 'kalakand.png', tag: 'Trending', category: 'Bestseller' },
  { title: 'Classic Peanut', desc: 'Traditional Taste', price: 149, img: 'pista.png', hoverImg: 'choclate.png', tag: 'Classic', category: 'Healthy' },
  { title: 'Dryfruit Mix', desc: 'Premium Nuts', price: 399, img: 'kalakand.png', hoverImg: 'pista.png', tag: 'Premium', category: 'Premium' },
  { title: 'Rose Almond', desc: 'Royal Flavor', price: 289, img: 'stwabarry_chikki.png', hoverImg: 'mango_chikki.png', tag: 'New', category: 'New' },
  { title: 'Jaggery Special', desc: 'Pure Desi Gud', price: 129, img: 'mango_chikki.png', hoverImg: 'pista.png', tag: 'Healthy', category: 'Healthy' },
];

const categories = ['All', 'Bestseller', 'Seasonal', 'Healthy', 'Premium', 'New'];

export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter products by category
  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] font-sans">

      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-soft)] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-[var(--text-main)]"
        >
          Marvel Crunch Chikki
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-[var(--text-muted)] text-sm sm:text-base"
        >
          Discover our delicious Chikkis, handcrafted for every craving!
        </motion.p>
      </section>

      {/* Filter Tabs */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition
                ${activeCategory === cat
                  ? 'bg-[var(--accent)] text-[var(--secondary)] shadow-lg'
                  : 'bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-white'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="rounded-3xl p-5 relative group shadow-[0_18px_45px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_60px_rgba(198,59,47,0.12)] bg-[var(--bg-card)]"
              >
                {/* Tag */}
                <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[11px] px-3 py-1 rounded-full z-10">
                  {item.tag}
                </span>

                {/* Wishlist */}
                <motion.button
                  onClick={() => setWishlist(p => ({ ...p, [i]: !p[i] }))}
                  animate={wishlist[i] ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-[0_8px_18px_rgba(0,0,0,0.18)] ring-1 ring-black/10
                    ${wishlist[i]
                      ? 'bg-[var(--accent)] text-white shadow-[0_10px_25px_rgba(198,59,47,0.45)]'
                      : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'}
                  `}
                >
                  <HeartIcon className="w-4 h-4" />
                </motion.button>

                {/* Image */}
                <div className="relative h-44 mb-4 flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-300"
                  />
                  <motion.img
                    src={item.hoverImg}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Info */}
                <h3 className="text-sm font-semibold text-[var(--text-main)]">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</p>

                {/* Price / Qty */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-bold text-[var(--secondary)]">₹{item.price}</p>
                  {!qty[i] ? (
                    <button
                      onClick={() => setQty(p => ({ ...p, [i]: 1 }))}
                      className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-[var(--bg-soft)] text-[var(--primary)] hover:bg-[var(--bg-main)] transition"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-1.5 rounded-full shadow-inner">
                      <button
                        onClick={() =>
                          setQty(p => {
                            const val = p[i] - 1;
                            if (val <= 0) {
                              const copy = { ...p };
                              delete copy[i];
                              return copy;
                            }
                            return { ...p, [i]: val };
                          })
                        }
                        className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-[var(--text-main)]">{qty[i]}</span>
                      <button
                        onClick={() => setQty(p => ({ ...p, [i]: p[i] + 1 }))}
                        className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[var(--accent)] text-[var(--secondary)] px-8 sm:px-9 py-3 rounded-full font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.18)] hover:brightness-105 transition"
            >
              View More Products →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
