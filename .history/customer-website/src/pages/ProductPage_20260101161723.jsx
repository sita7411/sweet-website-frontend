'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/* -------------------- DATA -------------------- */

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
const tags = ['Bestseller', 'Seasonal', 'Healthy', 'Premium', 'New'];

/* -------------------- VARIANT DROPDOWN -------------------- */

function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full mt-3 z-20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-xl border bg-[var(--bg-card)] text-sm flex justify-between items-center"
      >
        {selected}
        <ChevronDownIcon className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute w-full mt-1 bg-[var(--bg-card)] border rounded-xl shadow-lg overflow-hidden"
          >
            {Object.keys(item.variants).map(v => (
              <li
                key={v}
                onClick={() => { setSelected(v); setOpen(false); }}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-[var(--bg-soft)]"
              >
                {v}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------- SORT DROPDOWN -------------------- */

function SortDropdown({ sortBy, setSortBy }) {
  const [open, setOpen] = useState(false);
  const options = ['Default sorting', 'Price: Low → High', 'Price: High → Low', 'Name: A → Z', 'Name: Z → A'];

  return (
    <div className="relative w-full sm:w-52">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-xl border bg-[var(--bg-card)] text-sm flex justify-between items-center"
      >
        {sortBy}
        <ChevronDownIcon className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute w-full mt-1 bg-[var(--bg-card)] border rounded-xl shadow-lg z-20"
          >
            {options.map(opt => (
              <li
                key={opt}
                onClick={() => { setSortBy(opt); setOpen(false); }}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-[var(--bg-soft)]"
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

/* -------------------- MAIN PAGE -------------------- */

export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');
  const [selectedVariant, setSelectedVariant] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState('Default sorting');
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 6;
  const formatPrice = n => '₹' + n.toLocaleString('en-IN');

  const filtered = products.filter(p => {
    const weight = selectedVariant[p.id] || Object.keys(p.variants)[0];
    return (
      (activeCategory === 'All' || p.category === activeCategory) &&
      (activeWeight === 'All' || p.variants[activeWeight]) &&
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      p.variants[weight] <= maxPrice
    );
  });

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const shown = filtered.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative h-[45vh] sm:h-[60vh] flex items-center justify-center">
        <img src="/chikki_banner_offer.png" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="relative text-3xl sm:text-5xl font-extrabold text-white">Products</h1>
      </section>

      {/* CONTENT */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* SIDEBAR */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-20">
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full border px-4 py-2 rounded-lg text-sm"
            />

            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <ul className="space-y-2 text-sm">
                {categories.filter(c => c !== 'All').map(c => (
                  <li key={c} onClick={() => setActiveCategory(c)} className="cursor-pointer hover:font-semibold">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="lg:col-span-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
              <p className="text-sm text-gray-500">
                Showing {shown.length} of {filtered.length}
              </p>
              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {shown.map(item => {
                const weight = selectedVariant[item.id] || Object.keys(item.variants)[0];
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-4 shadow hover:shadow-xl transition">
                    <img src={item.img} className="h-40 w-full object-cover rounded-xl mb-3" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>

                    <VariantDropdown
                      item={item}
                      selected={weight}
                      setSelected={v => setSelectedVariant(p => ({ ...p, [item.id]: v }))}
                    />

                    <div className="flex justify-between items-center mt-4">
                      <p className="font-bold">{formatPrice(item.variants[weight])}</p>
                      <button className="px-4 py-1.5 rounded-full text-xs bg-gray-100 hover:bg-gray-200">
                        Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
