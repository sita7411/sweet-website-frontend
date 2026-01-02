'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const products = [
  {
    title: 'Pista Chocolate Chikki',
    desc: 'Chocolate & Peanut Blend',
    img: 'pista.png',
    hoverImg: 'choclate.png',
    category: 'Bestseller',
    variants: { '200g': 250, '1kg': 1200 },
  },
  {
    title: 'Strawberry Delight',
    desc: 'Fruity Crunch Chikki',
    img: 'stwabarry_chikki.png',
    hoverImg: 'mango_chikki.png',
    category: 'Seasonal',
    variants: { '200g': 350, '1kg': 1500 },
  },
  {
    title: 'Mango Fusion',
    desc: 'Seasonal Mango Flavor',
    img: 'mango_chikki.png',
    hoverImg: 'pista.png',
    category: 'Seasonal',
    variants: { '200g': 179, '1kg': 800 },
  },
  {
    title: 'Chocolate Crunch',
    desc: 'Rich Cocoa Coated',
    img: 'choclate.png',
    hoverImg: 'kalakand.png',
    category: 'Bestseller',
    variants: { '200g': 199, '1kg': 950 },
  },
];

const categories = ['All', 'Bestseller', 'Seasonal', 'Healthy', 'Premium', 'New'];
const weights = ['All', '200g', '1kg'];

export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');
  const [selectedVariant, setSelectedVariant] = useState({});

  const filteredProducts = products.filter(
    (p) =>
      (activeCategory === 'All' || p.category === activeCategory) &&
      (activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight))
  );

  const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-[var(--bg-main)] font-sans">
      {/* Hero */}
      <section className="py-16 bg-[var(--bg-soft)] text-center">
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
          Handcrafted chikkis, perfect for every craving!
        </motion.p>
      </section>

      {/* Main Content */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 sticky top-20 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-3">
                Category
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full font-medium transition
                      ${
                        activeCategory === cat
                          ? 'bg-[var(--accent)] text-white shadow-lg'
                          : 'bg-white text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-white'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Weights */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-3">
                Weight
              </h3>
              <div className="flex flex-wrap gap-3">
                {weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setActiveWeight(w)}
                    className={`px-4 py-2 rounded-full font-medium transition
                      ${
                        activeWeight === w
                          ? 'bg-[var(--accent)] text-white shadow-lg'
                          : 'bg-white text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-white'
                      }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((item, i) => {
              const selectedWeightValue = selectedVariant[i] || Object.keys(item.variants)[0];
              const price = item.variants[selectedWeightValue];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-3xl p-5 bg-white shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 relative group"
                >
                  {/* Wishlist */}
                  <button
                    onClick={() => setWishlist((p) => ({ ...p, [i]: !p[i] }))}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300
                      ${
                        wishlist[i]
                          ? 'bg-[var(--accent)] text-white shadow-lg'
                          : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'
                      }`}
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>

                  {/* Image */}
                  <div className="relative h-48 mb-4 flex items-center justify-center overflow-hidden">
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
                  <h3 className="text-base font-semibold text-[var(--text-main)]">{item.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</p>

                  {/* Variant Pills */}
                  <div className="mt-3 flex gap-3">
                    {Object.keys(item.variants).map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant((p) => ({ ...p, [i]: v }))}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition
                          ${
                            selectedWeightValue === v
                              ? 'bg-[var(--accent)] text-white border-transparent'
                              : 'bg-white text-[var(--text-main)] border-gray-300 hover:bg-[var(--accent)] hover:text-white'
                          }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>

                  {/* Price & Cart */}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-[var(--secondary)]">{formatPrice(price)}</p>
                    {!qty[i] ? (
                      <button
                        onClick={() => setQty((p) => ({ ...p, [i]: 1 }))}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--bg-soft)] text-[var(--primary)] hover:bg-[var(--bg-main)] transition"
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-1.5 rounded-full shadow-inner">
                        <button
                          onClick={() => {
                            setQty((p) => {
                              const val = p[i] - 1;
                              if (val <= 0) {
                                const copy = { ...p };
                                delete copy[i];
                                return copy;
                              }
                              return { ...p, [i]: val };
                            });
                          }}
                          className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-[var(--text-main)]">{qty[i]}</span>
                        <button
                          onClick={() => setQty((p) => ({ ...p, [i]: p[i] + 1 }))}
                          className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
