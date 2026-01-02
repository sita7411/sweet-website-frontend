'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------------- DATA ---------------- */
const products = [
  { id: 1, title: 'Pista Chocolate Chikki', desc: 'Chocolate & Peanut Blend', img: 'pista.png', category: 'Bestseller', variants: { '200g': 250, '1kg': 1200 } },
  { id: 2, title: 'Strawberry Delight', desc: 'Fruity Crunch Chikki', img: 'stwabarry_chikki.png', category: 'Seasonal', variants: { '200g': 350, '1kg': 1500 } },
  { id: 3, title: 'Mango Fusion', desc: 'Seasonal Mango Flavor', img: 'mango_chikki.png', category: 'Seasonal', variants: { '200g': 179, '1kg': 800 } },
  { id: 4, title: 'Chocolate Crunch', desc: 'Rich Cocoa Coated', img: 'choclate.png', category: 'Bestseller', variants: { '200g': 199, '1kg': 950 } },
  { id: 5, title: 'Classic Peanut', desc: 'Traditional Taste', img: 'pista.png', category: 'Healthy', variants: { '200g': 149, '1kg': 700 } },
  { id: 6, title: 'Dryfruit Mix', desc: 'Premium Nuts', img: 'kalakand.png', category: 'Premium', variants: { '200g': 399, '1kg': 1800 } },
  { id: 7, title: 'Rose Almond', desc: 'Royal Flavor', img: 'stwabarry_chikki.png', category: 'New', variants: { '200g': 289, '1kg': 1300 } },
  { id: 8, title: 'Jaggery Special', desc: 'Pure Desi Gud', img: 'mango_chikki.png', category: 'Healthy', variants: { '200g': 129, '1kg': 600 } },
];

const categories = ['All', 'Bestseller', 'Seasonal', 'Healthy', 'Premium', 'New'];
const weights = ['All', '200g', '1kg'];

/* ---------------- DROPDOWN ---------------- */
function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-2xl border bg-[var(--bg-card)]
        text-sm font-medium text-[var(--text-main)] flex justify-between items-center"
      >
        {selected}
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDownIcon className="w-5 h-5 text-[var(--text-muted)]" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border rounded-2xl shadow-lg overflow-hidden"
          >
            {Object.keys(item.variants).map(opt => (
              <li
                key={opt}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer
                ${selected === opt
                  ? 'bg-[var(--bg-soft)] font-semibold'
                  : 'hover:bg-[var(--bg-soft)]'
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

/* ---------------- MAIN PAGE ---------------- */
export default function ProductPage() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');

  const filteredProducts = products.filter(p => {
    const cat = activeCategory === 'All' || p.category === activeCategory;
    const wt = activeWeight === 'All' || p.variants[activeWeight];
    return cat && wt;
  });

  return (
    <section className="py-14 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map(item => {
          const selectedWeight =
            selectedVariant[item.id] || Object.keys(item.variants)[0];

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-5 bg-[var(--bg-card)] shadow-lg relative"
            >
              {/* Wishlist */}
              <button
                onClick={() =>
                  setWishlist(p => ({ ...p, [item.id]: !p[item.id] }))
                }
                className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center
                ${wishlist[item.id]
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-white text-[var(--primary)]'
                }`}
              >
                <HeartIcon className="w-4 h-4" />
              </button>

              {/* Image */}
              <img src={item.img} className="h-40 w-full object-cover rounded-2xl mb-4" />

              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>

              {/* Variant */}
              <VariantDropdown
                item={item}
                selected={selectedWeight}
                setSelected={val =>
                  setSelectedVariant(p => ({ ...p, [item.id]: val }))
                }
              />

              {/* Price + Qty */}
              <div className="flex justify-between items-center mt-4">
                <p className="font-bold">
                  ₹{item.variants[selectedWeight]}
                </p>

                {!qty[item.id] ? (
                  <button
                    onClick={() =>
                      setQty(p => ({ ...p, [item.id]: 1 }))
                    }
                    className="px-4 py-2 rounded-full bg-[var(--bg-soft)] text-sm"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() =>
                        setQty(p => ({ ...p, [item.id]: p[item.id] - 1 }))
                      }
                    >
                      −
                    </button>
                    <span>{qty[item.id]}</span>
                    <button
                      onClick={() =>
                        setQty(p => ({ ...p, [item.id]: p[item.id] + 1 }))
                      }
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
    </section>
  );
}
