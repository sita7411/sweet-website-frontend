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
function VariantDropdown({ options, selected, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative mt-3 w-full z-30">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-2xl bg-white text-sm font-medium flex justify-between items-center hover:border-[var(--accent)] transition"
            >
                {selected}
                <motion.span animate={{ rotate: open ? 180 : 0 }}>
                    <ChevronDownIcon className="w-4 h-4 text-[var(--text-muted)]" />
                </motion.span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute w-full mt-1 bg-white border rounded-2xl shadow-lg overflow-hidden"
                    >
                        {options.map((opt) => (
                            <li
                                key={opt}
                                onClick={() => {
                                    onChange(opt);
                                    setOpen(false);
                                }}
                                className="px-4 py-2 text-sm cursor-pointer hover:bg-[var(--accent)] hover:text-white transition"
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

    // Filtered Products
    const filteredProducts = products.filter((p) => {
        const catMatch = activeCategory === 'All' || p.category === activeCategory;
        const weightMatch = activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight);
        return catMatch && weightMatch;
    });

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');

    return (
        <div className="min-h-screen font-sans">
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
                    {/* Sidebar */}
                    <div className="lg:col-span-1 sticky top-20 space-y-6">
                        {/* Desktop Filters */}
                        <div className="hidden lg:block">
                            <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Category</h3>
                            <div className="flex flex-col gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
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
                                {weights.map((w) => (
                                    <button
                                        key={w}
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

                        {/* Mobile Dropdown */}
                        <div className="lg:hidden space-y-4">
                            <VariantDropdown
                                options={categories}
                                selected={activeCategory}
                                onChange={setActiveCategory}
                            />
                            <VariantDropdown
                                options={weights}
                                selected={activeWeight}
                                onChange={setActiveWeight}
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((item) => {
                                const selectedWeight = selectedVariant[item.id] || Object.keys(item.variants)[0];
                                const price = item.variants[selectedWeight];

                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.4 }}
                                        className="rounded-3xl p-5 relative shadow-lg bg-[var(--bg-card)] hover:shadow-2xl transition"
                                    >
                                        {/* Wishlist */}
                                        <button
                                            onClick={() => setWishlist(p => ({ ...p, [item.id]: !p[item.id] }))}
                                            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center ${wishlist[item.id]
                                                ? 'bg-[var(--accent)] text-white'
                                                : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'
                                                }`}
                                        >
                                            <HeartIcon className="w-4 h-4" />
                                        </button>

                                        {/* Image */}
                                        <div className="h-40 mb-4 rounded-2xl overflow-hidden">
                                            <img src={item.img} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Info */}
                                        <h3 className="font-semibold text-[var(--text-main)]">{item.title}</h3>
                                        <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>

                                        {/* Variant Dropdown */}
                                        <VariantDropdown
                                            options={Object.keys(item.variants)}
                                            selected={selectedWeight}
                                            onChange={(val) => setSelectedVariant(p => ({ ...p, [item.id]: val }))}
                                        />

                                        {/* Price & Quantity */}
                                        <div className="flex justify-between items-center mt-4">
                                            <p className="text-lg font-bold text-[var(--secondary)]">{formatPrice(price)}</p>
                                            {!qty[item.id] ? (
                                                <button
                                                    onClick={() => setQty(p => ({ ...p, [item.id]: 1 }))}
                                                    className="px-5 py-2 rounded-full text-xs font-semibold bg-[var(--bg-soft)] text-[var(--primary)]"
                                                >
                                                    <ShoppingCartIcon className="w-4 h-4 inline mr-1" /> Add
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-1.5 rounded-full">
                                                    <button
                                                        onClick={() => {
                                                            setQty(p => {
                                                                const v = p[item.id] - 1;
                                                                if (v <= 0) {
                                                                    const copy = { ...p };
                                                                    delete copy[item.id];
                                                                    return copy;
                                                                }
                                                                return { ...p, [item.id]: v };
                                                            });
                                                        }}
                                                    >−</button>
                                                    <span>{qty[item.id]}</span>
                                                    <button
                                                        onClick={() => setQty(p => ({ ...p, [item.id]: p[item.id] + 1 }))}
                                                    >+</button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

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
