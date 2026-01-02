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

// ------------------ Dropdown Component ------------------
function VariantDropdown({ item, selected, setSelected, title }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full mt-3">
            {/* Dropdown Button */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)] text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center
                    hover:border-[var(--text-main)] focus:outline-none focus:ring-1 focus:ring-[var(--text-main)] transition"
            >
                {selected}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDownIcon className="w-5 h-5 text-[var(--text-muted)]" />
                </motion.span>
            </button>

            {/* Dropdown Options */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border border-gray-300 rounded-2xl shadow-lg overflow-hidden"
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
      ? 'bg-[var(--bg-soft)] text-[var] font-semibold'
      : 'text-[var(--text-main)] hover:bg-[var(--bg-soft)] hover:text-[var(--text-main)]'
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

    const filteredProducts = products
        .map((p, i) => ({ ...p, originalIndex: i }))
        .sort((a, b) => {
            // Reorder selected category/weight first
            const catMatchA = activeCategory === 'All' || a.category === activeCategory;
            const catMatchB = activeCategory === 'All' || b.category === activeCategory;
            const weightMatchA = activeWeight === 'All' || Object.keys(a.variants).includes(activeWeight);
            const weightMatchB = activeWeight === 'All' || Object.keys(b.variants).includes(activeWeight);

            const scoreA = catMatchA + weightMatchA;
            const scoreB = catMatchB + weightMatchB;
            return scoreB - scoreA;
        })
        .filter((p) => {
            const catMatch = activeCategory === 'All' || p.category === activeCategory;
            const weightMatch = activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight);
            return catMatch && weightMatch;
        });

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');

    return (
        <div className="min-h-screen font-sans ">
            {/* Hero Section */}
            <section className="py-16 bg-[var(--bg-soft)] text-center">
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl font-extrabold text-[var(--text-main)]">
                    Marvel Crunch Chikki
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 text-[var(--text-muted)] text-sm sm:text-base">
                    Discover our handcrafted chikkis – perfect for every craving!
                </motion.p>
            </section>

            {/* Main Content */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1 sticky top-20 space-y-6">
                        {/* Desktop Filters */}
                        <div className="hidden lg:block">
                            <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Category</h3>
                            <div className="flex flex-col gap-3">
                                {categories.map((cat, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`text-left px-4 py-2 rounded-full transition font-medium ${activeCategory === cat
                                            ? 'bg-[var(--accent)] text-white shadow-md'
                                            : 'bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Weight</h3>
                            <div className="flex flex-col gap-3">
                                {weights.map((w, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveWeight(w)}
                                        className={`text-left px-4 py-2 rounded-full transition font-medium ${activeWeight === w
                                            ? 'bg-[var(--accent)] text-white shadow-md'
                                            : 'bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--accent)] hover:text-white'
                                            }`}
                                    >
                                        {w}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Dropdowns */}
                        <div className="lg:hidden space-y-4">
                            <VariantDropdown
                                item={{ variants: Object.fromEntries(categories.map(c => [c, 0])) }}
                                selected={activeCategory}
                                setSelected={setActiveCategory}
                                title="Category"
                            />
                            <VariantDropdown
                                item={{ variants: Object.fromEntries(weights.map(w => [w, 0])) }}
                                selected={activeWeight}
                                setSelected={setActiveWeight}
                                title="Weight"
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
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
                                        className="rounded-3xl p-5 relative group shadow-lg bg-[var(--bg-card)] hover:shadow-2xl transition hover:-translate-y-1"
                                    >
                                        {/* Wishlist */}
                                        <motion.button
                                            onClick={() => setWishlist(p => ({ ...p, [i]: !p[i] }))}
                                            animate={wishlist[i] ? { scale: 1.2 } : { scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-md ring-1 ring-black/10 ${wishlist[i]
                                                ? 'bg-[var(--accent)] text-white shadow-lg'
                                                : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'
                                                }`}
                                        >
                                            <HeartIcon className="w-4 h-4" />
                                        </motion.button>

                                        {/* Product Images */}
                                        <div className="relative h-40 mb-4 overflow-hidden rounded-2xl">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />


                                        </div>

                                        {/* Product Info */}
                                        <h3 className="text-base font-semibold text-[var(--text-main)]">{item.title}</h3>
                                        <p className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</p>

                                        {/* Variant Dropdown */}
                                        <VariantDropdown
                                            item={item}
                                            selected={selectedWeightValue}
                                            setSelected={(val) => setSelectedVariant((p) => ({ ...p, [i]: val }))}
                                            title="Weight"
                                        />

                                        {/* Price & Quantity */}
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-lg font-bold text-[var(--secondary)]">{formatPrice(price)}</p>
                                            {!qty[i] ? (
                                                <button
                                                    onClick={() => setQty(p => ({ ...p, [i]: 1 }))}
                                                    className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-[var(--bg-soft)] text-[var(--primary)] hover:bg-[var(--bg-main)] transition"
                                                >
                                                    <ShoppingCartIcon className="w-4 h-4" />
                                                    Add
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-1.5 rounded-full shadow-inner">
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
                                                        className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-sm font-semibold text-[var(--text-main)]">{qty[i]}</span>
                                                    <button
                                                        onClick={() => setQty(p => ({ ...p, [i]: p[i] + 1 }))}
                                                        className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
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

                        {/* Empty State */}
                        {filteredProducts.length === 0 && (
                            <p className="text-center text-[var(--text-muted)] mt-10 font-semibold">
                                No products found for selected filters.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
