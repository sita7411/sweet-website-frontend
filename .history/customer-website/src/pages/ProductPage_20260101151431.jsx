'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

// ------------------- Sample Products -------------------
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

// ------------------ Variant Dropdown ------------------
function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-white text-sm font-medium text-gray-800 shadow-sm flex justify-between items-center hover:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 transition"
      >
        {selected}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden"
          >
            {Object.keys(item.variants).map((opt, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer transition
                  ${selected === opt
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                  }`}
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

// ------------------ Main Product Page ------------------
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

  const topProducts = [...products].sort((a, b) => Object.values(b.variants)[0] - Object.values(a.variants)[0]).slice(0, 3);

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Hero */}
      <section className="py-16 bg-gray-100 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Marvel Crunch Chikki
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 text-gray-600 text-sm sm:text-base">
          Discover our handcrafted chikkis – perfect for every craving!
        </motion.p>
      </section>

      {/* Main Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 sticky top-20 space-y-6">

            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-4 py-2 rounded-md text-sm"
            />

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Categories</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {categories.filter(c => c !== 'All').map((cat, i) => (
                  <li
                    key={i}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex justify-between cursor-pointer hover:text-gray-900 ${activeCategory === cat ? 'font-semibold text-gray-900' : ''}`}
                  >
                    <span>{cat}</span>
                    <span>({products.filter(p => p.category === cat).length})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weight */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Weight</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {weights.filter(w => w !== 'All').map((w, i) => (
                  <li
                    key={i}
                    onClick={() => setActiveWeight(w)}
                    className={`cursor-pointer hover:text-gray-900 ${activeWeight === w ? 'font-semibold text-gray-900' : ''}`}
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Filter by Price</h3>
              <input
                type="range"
                min={Math.min(...products.map(p => Math.min(...Object.values(p.variants))))}
                max={Math.max(...products.map(p => Math.max(...Object.values(p.variants))))}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-600 mt-2">Max Price: {formatPrice(maxPrice)}</p>
            </div>

            {/* Top Products */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Top Products</h3>
              <div className="space-y-4">
                {topProducts.map(p => (
                  <div key={p.id} className="flex gap-3 items-center">
                    <img src={p.img} className="w-14 h-14 object-cover rounded" />
                    <div>
                      <p className="text-sm">{p.title}</p>
                      <p className="text-xs text-gray-500">{formatPrice(Object.values(p.variants)[0])}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    onClick={() => setActiveCategory(t)}
                    className="px-3 py-1 text-xs border rounded hover:bg-gray-800 hover:text-white cursor-pointer"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-600 mt-10 font-semibold">
                No products found for selected filters.
              </p>
            )}

            {filteredProducts.map((item, i) => {
              const selectedWeightValue = selectedVariant[i] || Object.keys(item.variants)[0];
              const price = item.variants[selectedWeightValue];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl p-5 relative group shadow-lg bg-white hover:shadow-2xl transition"
                >
                  {/* Wishlist */}
                  <motion.button
                    onClick={() => setWishlist(p => ({ ...p, [i]: !p[i] }))}
                    animate={wishlist[i] ? { scale: 1.2 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-md ring-1 ring-black/10 ${wishlist[i]
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-800 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </motion.button>

                  {/* Product Image */}
                  <div className="relative h-40 mb-4 overflow-hidden rounded-2xl">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Product Info */}
                  <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>

                  {/* Variant */}
                  <VariantDropdown
                    item={item}
                    selected={selectedWeightValue}
                    setSelected={(val) => setSelectedVariant(p => ({ ...p, [i]: val }))}
                  />

                  {/* Price & Quantity */}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-gray-900">{formatPrice(price)}</p>
                    {!qty[i] ? (
                      <button
                        onClick={() => setQty(p => ({ ...p, [i]: 1 }))}
                        className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-gray-300 transition"
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-200 px-4 py-1.5 rounded-full shadow-inner">
                        <button
                          onClick={() => {
                            setQty(p => {
                              const val = p[i] - 1;
                              if (val <= 0) {
                                const copy = { ...p };
                                delete copy[i];
                                return copy;
                              }
                              return { ...p, [i]: val };
                            });
                          }}
                          className="text-lg font-bold text-gray-800 hover:scale-110 transition"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-gray-900">{qty[i]}</span>
                        <button
                          onClick={() => setQty(p => ({ ...p, [i]: p[i] + 1 }))}
                          className="text-lg font-bold text-gray-800 hover:scale-110 transition"
                        >
                          +
                        </button>
                      </div>
                    )}
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
