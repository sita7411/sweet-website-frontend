'use client';

import { useState } from 'react';
import {
  HeartIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------------- DATA ---------------- */

const products = [
  { id: 1, title: 'Pista Chocolate Chikki', desc: 'Chocolate & Peanut Blend', img: 'pista.png', hoverImg: 'choclate.png', category: 'Bestseller', variants: { '200g': 250, '1kg': 1200 } },
  { id: 2, title: 'Strawberry Delight', desc: 'Fruity Crunch Chikki', img: 'stwabarry_chikki.png', hoverImg: 'mango_chikki.png', category: 'Seasonal', variants: { '200g': 350, '1kg': 1500 } },
  { id: 3, title: 'Mango Fusion', desc: 'Seasonal Mango Flavor', img: 'mango_chikki.png', hoverImg: 'pista.png', category: 'Seasonal', variants: { '200g': 179, '1kg': 800 } },
  { id: 4, title: 'Chocolate Crunch', desc: 'Rich Cocoa Coated', img: 'choclate.png', hoverImg: 'kalakand.png', category: 'Bestseller', variants: { '200g': 199, '1kg': 950 } },
  { id: 5, title: 'Classic Peanut', desc: 'Traditional Taste', img: 'pista.png', hoverImg: 'choclate.png', category: 'Healthy', variants: { '200g': 149, '1kg': 700 } },
  { id: 6, title: 'Dryfruit Mix', desc: 'Premium Nuts', img: 'kalakand.png', hoverImg: 'pista.png', category: 'Premium', variants: { '200g': 399, '1kg': 1800 } },
  { id: 7, title: 'Rose Almond', desc: 'Royal Flavor', img: 'stwabarry_chikki.png', hoverImg: 'mango_chikki.png', category: 'New', variants: { '200g': 289, '1kg': 1300 } },
  { id: 8, title: 'Jaggery Special', desc: 'Pure Desi Gud', img: 'mango_chikki.png', hoverImg: 'pista.png', category: 'Healthy', variants: { '200g': 129, '1kg': 600 } },
];

const categories = ['All', 'Bestseller', 'Seasonal', 'Healthy', 'Premium', 'New'];
const weights = ['All', '200g', '1kg'];

/* ---------------- COMPONENTS ---------------- */

const FilterItem = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 text-sm transition
      border-l-4
      ${
        active
          ? 'bg-[var(--bg-soft)] border-[var(--accent)] text-[var(--text-main)] font-semibold'
          : 'border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-soft)]'
      }`}
  >
    {children}
  </button>
);

function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2.5 text-sm font-medium
        border border-gray-300 rounded-xl bg-white
        flex justify-between items-center
        hover:border-[var(--accent)] transition"
      >
        {selected}
        <ChevronDownIcon className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute z-30 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl"
          >
            {Object.keys(item.variants).map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className="px-4 py-2 text-sm hover:bg-[var(--bg-soft)] cursor-pointer"
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');
  const [selectedVariant, setSelectedVariant] = useState({});

  const filteredProducts = products.filter((p) => {
    const cat = activeCategory === 'All' || p.category === activeCategory;
    const wt = activeWeight === 'All' || p.variants[activeWeight];
    return cat && wt;
  });

  const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="py-16 text-center bg-[var(--bg-soft)]">
        <h1 className="text-4xl font-extrabold text-[var(--text-main)]">
          Marvel Crunch Chikki
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">
          Premium handcrafted chikkis
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* FILTER */}
        <aside className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="mb-3 font-semibold">Category</h3>
            {categories.map((c) => (
              <FilterItem
                key={c}
                active={activeCategory === c}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </FilterItem>
            ))}
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Weight</h3>
            {weights.map((w) => (
              <FilterItem
                key={w}
                active={activeWeight === w}
                onClick={() => setActiveWeight(w)}
              >
                {w}
              </FilterItem>
            ))}
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((item, i) => {
            const variant =
              selectedVariant[i] || Object.keys(item.variants)[0];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition"
              >
                {/* WISHLIST */}
                <button
                  onClick={() => setWishlist((p) => ({ ...p, [i]: !p[i] }))}
                  className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow
                    ${
                      wishlist[i]
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-white text-[var(--primary)]'
                    }`}
                >
                  <HeartIcon className="w-4 h-4" />
                </button>

                {/* IMAGE FULL */}
                <div className="relative h-60 -mx-5 mb-4">
                  <img
                    src={item.img}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>

                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {item.desc}
                </p>

                <VariantDropdown
                  item={item}
                  selected={variant}
                  setSelected={(v) =>
                    setSelectedVariant((p) => ({ ...p, [i]: v }))
                  }
                />

                <div className="flex justify-between items-center mt-5">
                  <span className="font-bold text-lg text-[var(--secondary)]">
                    {formatPrice(item.variants[variant])}
                  </span>
                  <button className="px-5 py-2 rounded-full text-xs font-semibold bg-[var(--primary)] text-white">
                    Add
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
