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
];

const categories = ['All', 'Bestseller', 'Seasonal', 'Healthy', 'Premium'];
const weights = ['All', '200g', '1kg'];

/* -------------------- DROPDOWNS -------------------- */

function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 border rounded-xl flex justify-between items-center text-sm"
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
            className="absolute w-full bg-white border rounded-xl shadow mt-1 z-20"
          >
            {Object.keys(item.variants).map(opt => (
              <li
                key={opt}
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

function SortDropdown({ sortBy, setSortBy }) {
  const [open, setOpen] = useState(false);
  const options = ['Default', 'Price: Low → High', 'Price: High → Low', 'Name: A → Z', 'Name: Z → A'];

  return (
    <div className="relative w-48">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 border rounded-xl flex justify-between items-center text-sm"
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
            className="absolute w-full bg-white border rounded-xl shadow mt-1 z-20"
          >
            {options.map(opt => (
              <li
                key={opt}
                onClick={() => {
                  setSortBy(opt);
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

/* -------------------- MAIN COMPONENT -------------------- */

export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Default');
  const [filterOpen, setFilterOpen] = useState(false);

  const PRODUCTS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const formatPrice = n => `₹${n.toLocaleString('en-IN')}`;

  /* -------------------- FILTER LOGIC -------------------- */

  const filtered = products.filter(p => {
    const weight = selectedVariant[p.id] || Object.keys(p.variants)[0];
    return (
      (activeCategory === 'All' || p.category === activeCategory) &&
      (activeWeight === 'All' || p.variants[activeWeight]) &&
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const pa = Object.values(a.variants)[0];
    const pb = Object.values(b.variants)[0];
    if (sortBy === 'Price: Low → High') return pa - pb;
    if (sortBy === 'Price: High → Low') return pb - pa;
    if (sortBy === 'Name: A → Z') return a.title.localeCompare(b.title);
    if (sortBy === 'Name: Z → A') return b.title.localeCompare(a.title);
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PRODUCTS_PER_PAGE);
  const displayed = sorted.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  /* -------------------- SIDEBAR CONTENT -------------------- */

  const SidebarContent = (
    <>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full border px-4 py-2 rounded-md text-sm mb-6"
      />

      <h3 className="font-semibold mb-3">Categories</h3>
      <ul className="space-y-2 mb-6">
        {categories.filter(c => c !== 'All').map(cat => (
          <li
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setFilterOpen(false);
            }}
            className={`cursor-pointer ${activeCategory === cat ? 'font-bold text-orange-600' : ''}`}
          >
            {cat}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-3">Weight</h3>
      <ul className="space-y-2">
        {weights.filter(w => w !== 'All').map(w => (
          <li
            key={w}
            onClick={() => {
              setActiveWeight(w);
              setFilterOpen(false);
            }}
            className={`cursor-pointer ${activeWeight === w ? 'font-bold text-orange-600' : ''}`}
          >
            {w}
          </li>
        ))}
      </ul>
    </>
  );

  /* -------------------- JSX -------------------- */

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="h-[50vh] relative flex items-center justify-center">
        <img src="/chikki_banner_offer.png" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative text-5xl text-white font-bold">Products</h1>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-20">
          {SidebarContent}
        </aside>

        {/* PRODUCTS */}
        <div className="lg:col-span-4">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-orange-600 text-white rounded-full text-sm"
            >
              Filters
            </button>

            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {displayed.map(item => {
              const weight = selectedVariant[item.id] || Object.keys(item.variants)[0];
              const price = item.variants[weight];

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-5 shadow"
                >
                  <button
                    onClick={() => setWishlist(p => ({ ...p, [item.id]: !p[item.id] }))}
                    className="absolute top-4 right-4"
                  >
                    <HeartIcon className={`w-5 ${wishlist[item.id] ? 'text-red-500' : 'text-gray-400'}`} />
                  </button>

                  <img src={item.img} className="h-40 w-full object-cover rounded-xl mb-4" />

                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>

                  <VariantDropdown
                    item={item}
                    selected={weight}
                    setSelected={val => setSelectedVariant(p => ({ ...p, [item.id]: val }))}
                  />

                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold">{formatPrice(price)}</p>
                    <button
                      onClick={() => setQty(p => ({ ...p, [item.id]: 1 }))}
                      className="px-4 py-2 text-sm bg-orange-100 rounded-full"
                    >
                      Add
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 h-full w-[80%] bg-white z-50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setFilterOpen(false)}>✕</button>
              </div>
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
