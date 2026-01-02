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

/* ---------------- Dropdown ---------------- */
function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 border border-black/10 rounded-xl text-sm flex justify-between items-center bg-white"
      >
        {selected}
        <ChevronDownIcon className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-20 w-full mt-1 bg-white border border-black/10 rounded-xl shadow-md"
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

/* ---------------- Page ---------------- */
export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');
  const [selectedVariant, setSelectedVariant] = useState({});

  const filteredProducts = products.filter((p) => {
    const cat = activeCategory === 'All' || p.category === activeCategory;
    const wt = activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight);
    return cat && wt;
  });

  const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="py-16 bg-[var(--bg-soft)] text-center">
        <h1 className="text-4xl font-semibold text-[var(--text-main)]">
          Marvel Crunch Chikki
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">
          Premium handcrafted chikkis
        </p>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* FILTER */}
          <aside className="lg:col-span-1 space-y-10 sticky top-24">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
                Category
              </h3>
              <div className="space-y-3">
                {categories.map((c) => (
                  <label key={c} className="flex items-center gap-3 text-sm cursor-pointer">
                    <input
                      type="radio"
                      checked={activeCategory === c}
                      onChange={() => setActiveCategory(c)}
                      className="accent-[var(--accent)]"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
                Weight
              </h3>
              <div className="space-y-3">
                {weights.map((w) => (
                  <label key={w} className="flex items-center gap-3 text-sm cursor-pointer">
                    <input
                      type="radio"
                      checked={activeWeight === w}
                      onChange={() => setActiveWeight(w)}
                      className="accent-[var(--accent)]"
                    />
                    {w}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS GRID (SAME AS BEFORE) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((item, i) => {
              const selected = selectedVariant[i] || Object.keys(item.variants)[0];
              const price = item.variants[selected];

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-3xl p-5 bg-white border border-black/5 transition"
                >
                  {/* Wishlist */}
                  <button
                    onClick={() => setWishlist(p => ({ ...p, [i]: !p[i] }))}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border transition ${
                      wishlist[i] ? 'bg-[var(--accent)] text-white' : 'bg-white'
                    }`}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </button>

                  {/* FULL IMAGE */}
                  <div className="relative h-56 mb-4 overflow-hidden">
                    <img
                      src={item.img}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <img
                      src={item.hoverImg}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <h3 className="text-base font-medium">{item.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</p>

                  <VariantDropdown
                    item={item}
                    selected={selected}
                    setSelected={(v) =>
                      setSelectedVariant(p => ({ ...p, [i]: v }))
                    }
                  />

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold">{formatPrice(price)}</span>

                    {!qty[i] ? (
                      <button
                        onClick={() => setQty(p => ({ ...p, [i]: 1 }))}
                        className="px-5 py-2 rounded-full text-xs border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
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
      </section>
    </div>
  );
}
