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
const weights = ['All', '200g', '1kg'];

/* ---------------- FILTER ITEM ---------------- */

const FilterItem = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 text-sm border-l-4 transition
      ${
        active
          ? 'bg-[var(--bg-soft)] border-[var(--accent)] text-[var(--text-main)] font-semibold'
          : 'border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-soft)]'
      }`}
  >
    {children}
  </button>
);

/* ---------------- DROPDOWN ---------------- */

function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-xl bg-white flex justify-between items-center"
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
  const [qty, setQty] = useState({});
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
      </aside>

      {/* PRODUCTS */}
      <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((item, i) => {
          const variant = selectedVariant[i] || Object.keys(item.variants)[0];

          return (
            <div
              key={item.id}
              className="relative bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition"
            >
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

              {/* IMAGE */}
              <div className="relative h-56 -mx-5 mb-4">
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

              {/* PRICE + ADD / QTY */}
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
          );
        })}
      </div>
    </section>
  );
}
