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
  {
    id: 1,
    title: 'Pista Chocolate Chikki',
    desc: 'Chocolate & Peanut Blend',
    img: 'pista.png',
    hoverImg: 'choclate.png',
    category: 'Bestseller',
    variants: { '200g': 250, '1kg': 1200 },
  },
  {
    id: 2,
    title: 'Strawberry Delight',
    desc: 'Fruity Crunch Chikki',
    img: 'stwabarry_chikki.png',
    hoverImg: 'mango_chikki.png',
    category: 'Seasonal',
    variants: { '200g': 350, '1kg': 1500 },
  },
  {
    id: 3,
    title: 'Mango Fusion',
    desc: 'Seasonal Mango Flavor',
    img: 'mango_chikki.png',
    hoverImg: 'pista.png',
    category: 'Seasonal',
    variants: { '200g': 179, '1kg': 800 },
  },
  {
    id: 4,
    title: 'Chocolate Crunch',
    desc: 'Rich Cocoa Coated',
    img: 'choclate.png',
    hoverImg: 'kalakand.png',
    category: 'Bestseller',
    variants: { '200g': 199, '1kg': 950 },
  },
];

const categories = ['All', 'Bestseller', 'Seasonal'];

/* ---------------- FILTER ITEM ---------------- */

const FilterItem = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`relative w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg transition
      ${
        active
          ? 'bg-[var(--bg-soft)] text-[var(--primary)] font-semibold'
          : 'text-[var(--text-muted)] hover:bg-gray-50'
      }`}
  >
    {children}
    {active && (
      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-[var(--primary)]" />
    )}
  </button>
);

/* ---------------- VARIANT DROPDOWN ---------------- */

function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2.5 text-xs border rounded-lg bg-white flex justify-between items-center"
      >
        {selected}
        <ChevronDownIcon
          className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute z-30 w-full mt-2 bg-white border rounded-lg shadow-lg"
          >
            {Object.keys(item.variants).map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className="px-4 py-2 text-xs hover:bg-[var(--bg-soft)] cursor-pointer"
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
      <section className="h-[240px] w-full bg-gradient-to-r from-[#fff1db] via-[#fff7ec] to-[#ffe6c9] mb-16 rounded-b-[60px]" />

      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ---------- FILTER ---------- */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-[var(--text-muted)]">
              Categories
            </h3>

            <div className="space-y-1">
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
          </div>
        </aside>

        {/* ---------- PRODUCTS ---------- */}
        <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((item, i) => {
            const variant =
              selectedVariant[i] || Object.keys(item.variants)[0];

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden transition hover:shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden group">
                  <img
                    src={item.img}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={item.hoverImg}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <button
                    onClick={() =>
                      setWishlist((p) => ({ ...p, [i]: !p[i] }))
                    }
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur
                      ${
                        wishlist[i]
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-white/80 text-[var(--primary)]'
                      }`}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold tracking-wide">
                    {item.title}
                  </h3>

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
                    <span className="text-base font-semibold text-[var(--text-main)]">
                      {formatPrice(item.variants[variant])}
                    </span>

                    {!qty[i] ? (
                      <button
                        onClick={() => setQty((p) => ({ ...p, [i]: 1 }))}
                        className="px-4 py-2 text-xs rounded-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
                      >
                        Add to cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-4 text-sm">
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
                          className="font-bold"
                        >
                          −
                        </button>
                        <span>{qty[i]}</span>
                        <button
                          onClick={() =>
                            setQty((p) => ({ ...p, [i]: p[i] + 1 }))
                          }
                          className="font-bold"
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
