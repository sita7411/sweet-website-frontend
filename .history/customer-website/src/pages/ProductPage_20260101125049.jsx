'use client';

import { useState } from 'react';
import {
  HeartIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------ DATA ------------------ */

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
  {
    id: 5,
    title: 'Classic Peanut',
    desc: 'Traditional Taste',
    img: 'pista.png',
    hoverImg: 'choclate.png',
    category: 'Healthy',
    variants: { '200g': 149, '1kg': 700 },
  },
  {
    id: 6,
    title: 'Dryfruit Mix',
    desc: 'Premium Nuts',
    img: 'kalakand.png',
    hoverImg: 'pista.png',
    category: 'Premium',
    variants: { '200g': 399, '1kg': 1800 },
  },
  {
    id: 7,
    title: 'Rose Almond',
    desc: 'Royal Flavor',
    img: 'stwabarry_chikki.png',
    hoverImg: 'mango_chikki.png',
    category: 'New',
    variants: { '200g': 289, '1kg': 1300 },
  },
  {
    id: 8,
    title: 'Jaggery Special',
    desc: 'Pure Desi Gud',
    img: 'mango_chikki.png',
    hoverImg: 'pista.png',
    category: 'Healthy',
    variants: { '200g': 129, '1kg': 600 },
  },
];

const categories = ['All', 'Bestseller', 'Seasonal', 'Healthy', 'Premium', 'New'];
const weights = ['All', '200g', '1kg'];

/* ------------------ COMPONENTS ------------------ */

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition
      border-l-4
      ${
        active
          ? 'bg-[var(--bg-soft)] border-[var(--accent)] text-[var(--text-main)]'
          : 'bg-transparent border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-soft)]'
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
        text-[var(--text-main)] hover:border-[var(--accent)] transition"
      >
        <span>{selected}</span>
        <ChevronDownIcon
          className={`w-4 h-4 text-[var(--text-muted)] transition ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute z-30 mt-2 w-full bg-white
            border border-gray-200 rounded-xl shadow-xl overflow-hidden"
          >
            {Object.keys(item.variants).map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className="px-4 py-2 text-sm cursor-pointer
                hover:bg-[var(--bg-soft)] text-[var(--text-main)] transition"
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

/* ------------------ MAIN PAGE ------------------ */

export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');
  const [selectedVariant, setSelectedVariant] = useState({});

  const filteredProducts = products.filter((p) => {
    const catMatch =
      activeCategory === 'All' || p.category === activeCategory;
    const weightMatch =
      activeWeight === 'All' ||
      Object.keys(p.variants).includes(activeWeight);
    return catMatch && weightMatch;
  });

  const formatPrice = (n) => '₹' + n.toLocaleString('en-IN');

  return (
    <div className="min-h-screen font-sans">
      {/* HERO */}
      <section className="py-16 bg-[var(--bg-soft)] text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-main)]">
          Marvel Crunch Chikki
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[var(--text-muted)]">
          Handcrafted chikkis made with tradition & love
        </p>
      </section>

      {/* CONTENT */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* FILTERS */}
          <aside className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="font-semibold mb-4 text-[var(--text-main)]">
                Category
              </h3>
              <div className="space-y-1">
                {categories.map((c) => (
                  <FilterButton
                    key={c}
                    active={activeCategory === c}
                    onClick={() => setActiveCategory(c)}
                  >
                    {c}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[var(--text-main)]">
                Weight
              </h3>
              <div className="space-y-1">
                {weights.map((w) => (
                  <FilterButton
                    key={w}
                    active={activeWeight === w}
                    onClick={() => setActiveWeight(w)}
                  >
                    {w}
                  </FilterButton>
                ))}
              </div>
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition"
                >
                  {/* Wishlist */}
                  <button
                    onClick={() =>
                      setWishlist((p) => ({ ...p, [i]: !p[i] }))
                    }
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full
                      flex items-center justify-center shadow
                      ${
                        wishlist[i]
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-white text-[var(--primary)]'
                      }`}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </button>

                  {/* IMAGE */}
                  <div className="relative w-full h-56 mb-5 overflow-hidden">
                    <img
                      src={item.img}
                      className="absolute inset-0 w-full h-full object-contain transition-opacity group-hover:opacity-0"
                    />
                    <img
                      src={item.hoverImg}
                      className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  {/* INFO */}
                  <h3 className="font-semibold text-[var(--text-main)]">
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

                  {/* PRICE */}
                  <div className="flex justify-between items-center mt-5">
                    <span className="text-lg font-bold text-[var(--secondary)]">
                      {formatPrice(item.variants[variant])}
                    </span>

                    <button
                      onClick={() =>
                        setQty((p) => ({ ...p, [i]: 1 }))
                      }
                      className="px-5 py-2 text-xs font-semibold rounded-full
                      bg-[var(--primary)] text-white flex items-center gap-2"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      Add
                    </button>
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
