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

/* ---------------- FILTER ITEM ---------------- */

const FilterItem = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition
      ${
        active
          ? 'bg-[var(--primary)] text-white shadow'
          : 'bg-white hover:bg-[var(--bg-soft)] text-[var(--text-muted)]'
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
        className="w-full px-4 py-2.5 text-sm border rounded-xl bg-white flex justify-between items-center"
      >
        {selected}
        <ChevronDownIcon className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute z-30 w-full mt-2 bg-white border rounded-xl shadow-xl"
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
      <section className="h-[260px] w-full bg-gradient-to-r from-[#fff1db] via-[#fff7ec] to-[#ffe6c9] mb-16 rounded-b-[60px]" />

      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ---------- FILTER ---------- */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-5 rounded-3xl shadow-sm space-y-3 sticky top-24">
            <h3 className="font-semibold mb-2">Filter by Category</h3>
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
        </aside>

        {/* ---------- PRODUCTS ---------- */}
        <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((item, i) => {
            const variant = selectedVariant[i] || Object.keys(item.variants)[0];

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                {/* IMAGE FULL BOX */}
                <div className="relative h-60">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover"
                  />

                  {/* WISHLIST ICON */}
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
                <div className="p-5">
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

                  {/* PRICE + CART */}
                  <div className="flex justify-between items-center mt-5">
                    <span className="font-bold text-lg text-[var(--secondary)]">
                      {formatPrice(item.variants[variant])}
                    </span>

                    {!qty[i] ? (
                      <button
                        onClick={() => setQty((p) => ({ ...p, [i]: 1 }))}
                        className="flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-full bg-[var(--primary)] text-white"
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--bg-soft)]">
                        <button
                          onClick={() =>
                            setQty((p) => {
                              const v = p[i] - 1;
                              if (v <= 0) {
                                const copy = { ...p };
                                delete copy[i];
                                return copy;
                              }
                              return { ...p, [i]: v };
                            })
                          }
                          className="text-lg font-bold text-[var(--primary)]"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold">{qty[i]}</span>
                        <button
                          onClick={() =>
                            setQty((p) => ({ ...p, [i]: p[i] + 1 }))
                          }
                          className="text-lg font-bold text-[var(--primary)]"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
