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
];

const categories = ['All', 'Bestseller', 'Seasonal'];

/* ---------------- FILTER ---------------- */

const FilterItem = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-medium transition-all
      ${
        active
          ? 'bg-[var(--primary)] text-white shadow-md'
          : 'bg-white text-[var(--text-muted)] hover:bg-[var(--bg-soft)]'
      }`}
  >
    {children}
  </button>
);

/* ---------------- VARIANT DROPDOWN ---------------- */

function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2.5 text-sm rounded-xl border bg-white flex justify-between items-center hover:border-[var(--primary)]"
      >
        {selected}
        <ChevronDownIcon className={`w-4 h-4 transition ${open && 'rotate-180'}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-30 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden"
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
  const [qty, setQty] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVariant, setSelectedVariant] = useState({});

  const filteredProducts = products.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <>
      {/* ---------- BANNER ---------- */}
      <section className="relative h-[280px] w-full mb-20 rounded-b-[70px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff1db] via-[#fff7ec] to-[#ffe6c9]" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </section>

      <section className="max-w-7xl mx-auto px-4">

        {/* ---------- FILTER ---------- */}
        <div className="flex flex-wrap gap-3 justify-center mb-14">
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

        {/* ---------- PRODUCTS ---------- */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((item, i) => {
            const variant = selectedVariant[i] || Object.keys(item.variants)[0];

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all"
              >
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={item.img}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={item.hoverImg}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105"
                  />

                  {/* CATEGORY BADGE */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-white/90 backdrop-blur shadow">
                    {item.category}
                  </span>

                  {/* WISHLIST */}
                  <button
                    onClick={() => setWishlist((p) => ({ ...p, [i]: !p[i] }))}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow
                      ${
                        wishlist[i]
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-white text-[var(--primary)]'
                      }`}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
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

                  <div className="flex justify-between items-center mt-6">
                    <span className="font-bold text-xl text-[var(--secondary)]">
                      {formatPrice(item.variants[variant])}
                    </span>

                    {!qty[i] ? (
                      <button
                        onClick={() => setQty((p) => ({ ...p, [i]: 1 }))}
                        className="flex items-center gap-2 px-6 py-2 text-xs font-semibold rounded-full bg-[var(--primary)] text-white hover:scale-105 transition"
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-[var(--bg-soft)]">
                        <button onClick={() => setQty((p) => ({ ...p, [i]: p[i] - 1 }))}>−</button>
                        <span className="font-semibold">{qty[i]}</span>
                        <button onClick={() => setQty((p) => ({ ...p, [i]: p[i] + 1 }))}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
