import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ---------------- PRODUCTS DATA ---------------- */

const products = [
  {
    id: 1,
    title: 'Pista Chocolate Chikki',
    desc: 'Chocolate & Peanut Blend',
    img: 'pista.png',
    hoverImg: 'choclate.png',
    category: 'Bestseller',
    variants: {
      '250g': 120,
      '500g': 220,
      '1kg': 420
    }
  },
  {
    id: 2,
    title: 'Classic Peanut Chikki',
    desc: 'Traditional Taste',
    img: 'peanut.png',
    hoverImg: 'peanut-hover.png',
    category: 'New',
    variants: {
      '250g': 90,
      '500g': 170,
      '1kg': 320
    }
  },
  {
    id: 3,
    title: 'Dry Fruit Chikki',
    desc: 'Premium Dry Fruits',
    img: 'dryfruit.png',
    hoverImg: 'dryfruit-hover.png',
    category: 'Bestseller',
    variants: {
      '250g': 180,
      '500g': 340,
      '1kg': 640
    }
  }
];

/* ---------------- TOP PRODUCTS (FIXED) ---------------- */

const topProducts = products
  .filter(p => p.category === 'Bestseller')
  .slice(0, 3);

/* ---------------- COMPONENT ---------------- */

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeWeight, setActiveWeight] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedVariant, setSelectedVariant] = useState({});

  /* ---------------- HELPERS ---------------- */

  const formatPrice = price => `₹${price}`;

  /* ---------------- FILTER LOGIC (FIXED) ---------------- */

  const filteredProducts = products.filter(p => {
    const catMatch =
      activeCategory === 'All' || p.category === activeCategory;

    const weightMatch =
      activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight);

    const searchMatch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase());

    const selectedWeightValue =
      selectedVariant[p.id] || Object.keys(p.variants)[0];

    const priceMatch =
      p.variants[selectedWeightValue] <= maxPrice;

    return catMatch && weightMatch && searchMatch && priceMatch;
  });

  /* ---------------- UI ---------------- */

  return (
    <div className="flex gap-8 p-6">

      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-[280px] space-y-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Top Products */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map(p => (
              <div key={p.id} className="flex gap-3 items-center">
                <img src={p.img} className="w-14 h-14 object-cover rounded" />
                <div>
                  <p className="text-sm">{p.title}</p>
                  <p className="text-xs text-gray-500">
                    {formatPrice(Object.values(p.variants)[0])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <main className="flex-1 grid grid-cols-3 gap-6">

        {filteredProducts.map(item => {
          const selectedWeight =
            selectedVariant[item.id] || Object.keys(item.variants)[0];

          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="border rounded-lg p-4 relative"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>

              {/* Variant Dropdown */}
              <div className="mt-3">
                <select
                  value={selectedWeight}
                  onChange={e =>
                    setSelectedVariant(prev => ({
                      ...prev,
                      [item.id]: e.target.value
                    }))
                  }
                  className="w-full border px-2 py-1 rounded"
                >
                  {Object.keys(item.variants).map(w => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <p className="mt-2 font-semibold">
                {formatPrice(item.variants[selectedWeight])}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-black text-white py-2 rounded">
                  Add to Cart
                </button>
                <button className="p-2 border rounded">
                  <HeartIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </main>
    </div>
  );
}
