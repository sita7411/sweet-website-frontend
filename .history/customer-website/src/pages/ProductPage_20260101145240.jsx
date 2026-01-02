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
            <button className="mt-3 px-4 py-1 bg-[#c8a96a] text-white text-sm rounded">
              Filter
            </button>
          </div>

          {/* Top Products */}
          <div>
            <h3 className="font-semibold mb-4">Top product</h3>
            <div className="space-y-4">
              {products.slice(0, 3).map((p, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <img src={p.img} className="w-14 h-14 rounded object-cover" />
                  <div>
                    <p className="text-sm">{p.title}</p>
                    <p className="text-xs text-gray-500">
                      ₹{Object.values(p.variants)[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs border rounded cursor-pointer hover:bg-[#c8a96a] hover:text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= PRODUCT GRID (UNCHANGED) ================= */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((item, i) => {
              const selectedWeight = selectedVariant[i] || Object.keys(item.variants)[0];
              const priceValue = item.variants[selectedWeight];

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl p-5 relative shadow-lg bg-white"
                >
                  {/* Wishlist */}
                  <button
                    onClick={() => setWishlist(p => ({ ...p, [i]: !p[i] }))}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center
                      ${wishlist[i] ? 'bg-red-500 text-white' : 'bg-gray-100'}
                    `}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </button>

                  <img src={item.img} className="h-40 w-full object-contain mb-4" />

                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>

                  <VariantDropdown
                    item={item}
                    selected={selectedWeight}
                    setSelected={(val) =>
                      setSelectedVariant(p => ({ ...p, [i]: val }))
                    }
                  />

                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold">₹{priceValue}</p>

                    {!qty[i] ? (
                      <button
                        onClick={() => setQty(p => ({ ...p, [i]: 1 }))}
                        className="px-4 py-1 text-sm bg-gray-100 rounded-full"
                      >
                        <ShoppingCartIcon className="w-4 h-4 inline mr-1" />
                        Add
                      </button>
                    ) : (
                      <div className="flex gap-3 items-center">
                        <button onClick={() => setQty(p => ({ ...p, [i]: p[i] - 1 }))}>−</button>
                        <span>{qty[i]}</span>
                        <button onClick={() => setQty(p => ({ ...p, [i]: p[i] + 1 }))}>+</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
