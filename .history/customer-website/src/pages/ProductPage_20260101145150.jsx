'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------------- PRODUCTS ---------------- */
const products = [
  { id: 1, title: 'Pista Chocolate Chikki', desc: 'Chocolate & Peanut Blend', img: 'pista.png', category: 'Bestseller', variants: { '200g': 250, '1kg': 1200 } },
  { id: 2, title: 'Strawberry Delight', desc: 'Fruity Crunch Chikki', img: 'stwabarry_chikki.png', category: 'Seasonal', variants: { '200g': 350, '1kg': 1500 } },
  { id: 3, title: 'Mango Fusion', desc: 'Seasonal Mango Flavor', img: 'mango_chikki.png', category: 'Seasonal', variants: { '200g': 179, '1kg': 800 } },
  { id: 4, title: 'Chocolate Crunch', desc: 'Rich Cocoa Coated', img: 'choclate.png', category: 'Bestseller', variants: { '200g': 199, '1kg': 950 } },
  { id: 5, title: 'Classic Peanut', desc: 'Traditional Taste', img: 'pista.png', category: 'Healthy', variants: { '200g': 149, '1kg': 700 } },
  { id: 6, title: 'Dryfruit Mix', desc: 'Premium Nuts', img: 'kalakand.png', category: 'Premium', variants: { '200g': 399, '1kg': 1800 } },
];

const categories = ['Bestseller', 'Seasonal', 'Healthy', 'Premium'];
const tags = ['Chikki', 'Peanut', 'Jaggery', 'Healthy', 'Premium'];

/* ---------------- VARIANT DROPDOWN (SAME AS BEFORE) ---------------- */
function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-full border text-sm flex justify-between items-center"
      >
        {selected}
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 w-full bg-white border rounded-xl mt-1"
          >
            {Object.keys(item.variants).map((opt, i) => (
              <li
                key={i}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
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

/* ---------------- MAIN PAGE ---------------- */
export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [price, setPrice] = useState(2000);

  const filteredProducts = products.filter(p =>
    (!activeCategory || p.category === activeCategory)
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* ================= LEFT SIDEBAR (IMAGE STYLE) ================= */}
        <aside className="lg:col-span-1 sticky top-24 space-y-10">

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full border px-4 py-2 rounded-md text-sm"
          />

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {categories.map((cat, i) => (
                <li
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex justify-between cursor-pointer hover:text-black
                    ${activeCategory === cat ? 'font-semibold text-black' : ''}
                  `}
                >
                  <span>{cat}</span>
                  <span>({products.filter(p => p.category === cat).length})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-semibold mb-4">Filter by price</h3>
            <input
              type="range"
              min="100"
              max="2000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-2">Price: ₹100 – ₹{price}</p>
            <button className="mt-3 px-4 py-1 bg-[#c8a96a] text-white tex
