import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
const tags = ['Bestseller', 'Seasonal', 'Healthy', 'Premium', 'New'];

function VariantDropdown({ item, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-xl border flex justify-between items-center"
      >
        {selected}
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute w-full bg-white border rounded-xl mt-1 z-20"
          >
            {Object.keys(item.variants).map(opt => (
              <li
                key={opt}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
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
  const [maxPrice, setMaxPrice] = useState(
    Math.max(...products.flatMap(p => Object.values(p.variants)))
  );

  const formatPrice = n => `₹${n.toLocaleString('en-IN')}`;

  // ✅ FIX 1: Top Products defined
  const topProducts = products
    .filter(p => p.category === 'Bestseller')
    .slice(0, 3);

  // ✅ FIX 2: Correct variant key usage
  const filteredProducts = products.filter(p => {
    const selectedWeight = selectedVariant[p.id] || Object.keys(p.variants)[0];
    return (
      (activeCategory === 'All' || p.category === activeCategory) &&
      (activeWeight === 'All' || p.variants[activeWeight]) &&
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      p.variants[selectedWeight] <= maxPrice
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">

      {/* SIDEBAR */}
      <aside className="lg:col-span-1 space-y-6">
        <input
          placeholder="Search..."
          className="w-full border px-3 py-2 rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div>
          <h3 className="font-semibold mb-2">Top Products</h3>
          {topProducts.map(p => (
            <div key={p.id} className="flex gap-3 items-center mb-3">
              <img src={p.img} className="w-12 h-12 rounded" />
              <div>
                <p className="text-sm">{p.title}</p>
                <p className="text-xs text-gray-500">
                  {formatPrice(Object.values(p.variants)[0])}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* PRODUCTS */}
      <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(item => {
          const selectedWeight = selectedVariant[item.id] || Object.keys(item.variants)[0];
          return (
            <div key={item.id} className="p-4 rounded-xl shadow bg-white">
              <img src={item.img} className="h-40 w-full object-cover rounded" />
              <h3 className="mt-2 font-semibold">{item.title}</h3>

              <VariantDropdown
                item={item}
                selected={selectedWeight}
                setSelected={val =>
                  setSelectedVariant(p => ({ ...p, [item.id]: val }))
                }
              />

              <p className="mt-2 font-bold">
                {formatPrice(item.variants[selectedWeight])}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
