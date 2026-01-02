import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    <div className="relative w-full mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)]
        text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center"
      >
        {selected}
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDownIcon className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border rounded-2xl shadow-lg"
          >
            {Object.keys(item.variants).map(opt => (
              <li
                key={opt}
                onClick={() => { setSelected(opt); setOpen(false); }}
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

function SortDropdown({ sortBy, setSortBy }) {
  const [open, setOpen] = useState(false);
  const options = [
    'Default sorting',
    'Price: Low → High',
    'Price: High → Low',
    'Name: A → Z',
    'Name: Z → A',
  ];

  return (
    <div className="relative w-full sm:w-48">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)]
        text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center"
      >
        {sortBy}
        <ChevronDownIcon className="w-5 h-5" />
      </button>

      {open && (
        <ul className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border rounded-2xl shadow-lg">
          {options.map(opt => (
            <li
              key={opt}
              onClick={() => { setSortBy(opt); setOpen(false); }}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-[var(--bg-soft)]"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
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
  const [sortBy, setSortBy] = useState('Default sorting');
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 6;

  const filteredProducts = products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative h-[55vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <img src="/chikki_banner_offer.png" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Products
        </h1>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* SIDEBAR */}
          <aside className="
            lg:col-span-1
            space-y-6
            lg:sticky lg:top-20
            bg-white lg:bg-transparent
            p-4 lg:p-0
            rounded-2xl
            shadow lg:shadow-none
          ">
            <input
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border px-4 py-3 lg:py-2 rounded-md text-sm"
            />
          </aside>

          {/* PRODUCTS */}
          <div className="lg:col-span-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedProducts.map(item => {
                const weight = selectedVariant[item.id] || '200g';
                return (
                  <div key={item.id} className="bg-[var(--bg-card)] rounded-3xl p-5 shadow-lg">
                    <div className="h-36 sm:h-40 lg:h-40 mb-4 overflow-hidden rounded-2xl">
                      <img src={item.img} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <VariantDropdown
                      item={item}
                      selected={weight}
                      setSelected={val => setSelectedVariant(p => ({ ...p, [item.id]: val }))}
                    />
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
