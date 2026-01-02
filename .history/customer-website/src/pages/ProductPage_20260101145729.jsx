'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

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

function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border rounded-lg flex justify-between items-center text-sm bg-white shadow-sm hover:border-gray-400 transition"
      >
        {selected}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDownIcon className="w-4 h-4 text-gray-500" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg overflow-hidden"
          >
            {Object.keys(item.variants).map((opt, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer text-sm ${selected === opt ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
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

export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');
  const [selectedVariant, setSelectedVariant] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(Math.max(...products.map(p => Math.max(...Object.values(p.variants)))));

  const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');

  const filteredProducts = products.filter((p, i) => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory;
    const weightMatch = activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight);
    const searchMatch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const selectedWeightValue = selectedVariant[i] || Object.keys(p.variants)[0];
    const priceMatch = p.variants[selectedWeightValue] <= maxPrice;
    return catMatch && weightMatch && searchMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero */}
      <section className="py-16 text-center bg-gradient-to-r from-yellow-100 to-yellow-200">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Marvel Crunch Chikki</h1>
        <p className="mt-3 text-gray-600">Discover our handcrafted chikkis – perfect for every craving!</p>
      </section>

      {/* Main */}
      <section className="py-12 max-w-7xl mx-auto px-4 grid lg:grid-cols-5 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 sticky top-20 space-y-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 rounded-md border focus:ring focus:ring-yellow-300"
          />

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.filter(c => c !== 'All').map((cat, i) => (
                <li
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer px-2 py-1 rounded ${activeCategory === cat ? 'bg-yellow-100 font-semibold' : 'hover:bg-gray-100'}`}
                >
                  {cat} ({products.filter(p => p.category === cat).length})
                </li>
              ))}
            </ul>
          </div>

          {/* Weight */}
          <div>
            <h3 className="font-semibold mb-2">Weight</h3>
            <ul className="space-y-2 text-sm">
              {weights.filter(w => w !== 'All').map((w, i) => (
                <li
                  key={i}
                  onClick={() => setActiveWeight(w)}
                  className={`cursor-pointer px-2 py-1 rounded ${activeWeight === w ? 'bg-yellow-100 font-semibold' : 'hover:bg-gray-100'}`}
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-semibold mb-2">Max Price</h3>
            <input
              type="range"
              min={Math.min(...products.map(p => Math.min(...Object.values(p.variants))))}
              max={Math.max(...products.map(p => Math.max(...Object.values(p.variants))))}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Up to {formatPrice(maxPrice)}</p>
          </div>
        </aside>

        {/* Products */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center col-span-full text-gray-500 mt-10">No products found.</p>
          ) : (
            filteredProducts.map((item, i) => {
              const selectedWeightValue = selectedVariant[i] || Object.keys(item.variants)[0];
              const price = item.variants[selectedWeightValue];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-2xl p-4 shadow-md relative flex flex-col"
                >
                  {/* Wishlist */}
                  <button
                    onClick={() => setWishlist(p => ({ ...p, [i]: !p[i] }))}
                    className={`absolute top-3 right-3 p-2 rounded-full transition ${wishlist[i] ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600 hover:bg-yellow-300'}`}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </button>

                  {/* Image */}
                  <div className="h-40 mb-3 overflow-hidden rounded-xl">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>

                  {/* Variant */}
                  <VariantDropdown
                    item={item}
                    selected={selectedWeightValue}
                    setSelected={(val) => setSelectedVariant((p) => ({ ...p, [i]: val }))}
                  />

                  {/* Price & Add */}
                  <div className="flex items-center justify-between mt-4">
                    <p className="font-bold text-yellow-600">{formatPrice(price)}</p>
                    {!qty[i] ? (
                      <button
                        onClick={() => setQty(p => ({ ...p, [i]: 1 }))}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-100 hover:bg-yellow-200 text-sm"
                      >
                        <ShoppingCartIcon className="w-4 h-4" /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">
                        <button onClick={() => setQty(p => ({ ...p, [i]: p[i] - 1 }))} className="px-2">−</button>
                        <span>{qty[i]}</span>
                        <button onClick={() => setQty(p => ({ ...p, [i]: p[i] + 1 }))} className="px-2">+</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
