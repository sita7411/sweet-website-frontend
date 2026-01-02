'use client';

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
    // Add more products to exceed 20 for pagination demo
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
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)] text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center hover:border-[var(--text-main)] focus:outline-none focus:ring-1 focus:ring-[var(--text-main)] transition"
            >
                {selected}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDownIcon className="w-5 h-5 text-[var(--text-muted)]" />
                </motion.span>
            </button>

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
                                        ? 'bg-[var(--bg-soft)] text-[var(--text-main)] font-semibold'
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
        <div className="relative w-48">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)] text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center hover:border-[var(--text-main)]"
            >
                {sortBy}
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDownIcon className="w-5 h-5 text-[var(--text-muted)]" />
                </motion.span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border border-gray-300 rounded-2xl shadow-lg overflow-hidden"
                    >
                        {options.map((opt, idx) => (
                            <li
                                key={idx}
                                onClick={() => { setSortBy(opt); setOpen(false); }}
                                className={`px-4 py-2 text-sm cursor-pointer transition
                  ${sortBy === opt
                                        ? 'bg-[var(--bg-soft)] text-[var(--text-main)] font-semibold'
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

export default function ProductPage() {
    const [wishlist, setWishlist] = useState({});
    const [qty, setQty] = useState({});
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeWeight, setActiveWeight] = useState('All');
    const [selectedVariant, setSelectedVariant] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrice, setMaxPrice] = useState(Math.max(...products.map(p => Math.max(...Object.values(p.variants)))));
    const [sortBy, setSortBy] = useState('Default sorting');
    const [currentPage, setCurrentPage] = useState(1);

    const PRODUCTS_PER_PAGE = 6;

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');

    const filteredProducts = products.filter((p, i) => {
        const catMatch = activeCategory === 'All' || p.category === activeCategory;
        const weightMatch = activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight);
        const searchMatch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const selectedWeightValue = selectedVariant[i] || Object.keys(p.variants)[0];
        const priceMatch = p.variants[selectedWeightValue] <= maxPrice;
        return catMatch && weightMatch && searchMatch && priceMatch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'Price: Low → High':
                return Object.values(a.variants)[0] - Object.values(b.variants)[0];
            case 'Price: High → Low':
                return Object.values(b.variants)[0] - Object.values(a.variants)[0];
            case 'Name: A → Z':
                return a.title.localeCompare(b.title);
            case 'Name: Z → A':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
    const displayedProducts = sortedProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen font-sans">
            {/* Hero */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">

                {/* Background Image */}
                <img
                    src="/chikki_banner_offer.png"
                    alt="Products Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[var(--secondary)]/20"></div>

                {/* Center Content */}
                <div className="relative z-10 text-center px-">

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white
  drop-shadow-[0_3px_8px_rgba(107,63,38,0.6)]"                    >
                        Products
                    </motion.h1>

                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-3 flex justify-center items-center gap-2 text-sm sm:text-base"
                    >

                        {/* Home */}
                        <Link
                            to="/"
                            className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors duration-300"
                        >
                            Home
                        </Link>

                        <span className="text-[var(--text-muted)]  font-bold">
                            \\
                        </span>

                        {/* Products */}
                        <Link
                            to="/products"
                            className="text-[var(--text-muted)]  font-semibold hover:text-[var(--text-main)] transition-colors duration-300"
                        >
                            Products
                        </Link>

                    </motion.div>

                </div>

            </section>

            {/* Main Content */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 sticky top-20 space-y-6">
                        {/* Search */}
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full border px-4 py-2 rounded-md text-sm" />

                        {/* Categories */}
                        <div>
                            <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Categories</h3>
                            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                                {categories.filter(c => c !== 'All').map((cat, i) => (
                                    <li key={i} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }} className={`flex justify-between cursor-pointer hover:text-[var(--text-main)] ${activeCategory === cat ? 'font-semibold text-[var(--text-main)]' : ''}`}>
                                        <span>{cat}</span>
                                        <span>({products.filter(p => p.category === cat).length})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Weight */}
                        <div>
                            <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Weight</h3>
                            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                                {weights.filter(w => w !== 'All').map((w, i) => (
                                    <li key={i} onClick={() => { setActiveWeight(w); setCurrentPage(1); }} className={`cursor-pointer hover:text-[var(--text-main)] ${activeWeight === w ? 'font-semibold text-[var(--text-main)]' : ''}`}>
                                        {w}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Products */}
                    <div className="lg:col-span-4">
                        {/* Top Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
                            <p className="text-sm text-[var(--text-muted)] mb-2 sm:mb-0">Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} results</p>
                            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                            {displayedProducts.length === 0 && <p className="text-center text-[var(--text-muted)] mt-10 font-semibold">No products found for selected filters.</p>}

                            {displayedProducts.map((item, i) => {
                                const selectedWeightValue = selectedVariant[item.id] || Object.keys(item.variants)[0];
                                const price = item.variants[selectedWeightValue];
                                return (
                                    <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }} viewport={{ once: true }} whileHover={{ y: -6 }} className="rounded-3xl p-5 relative group shadow-lg bg-[var(--bg-card)] hover:shadow-2xl transition hover:-translate-y-1">
                                        {/* Wishlist */}
                                        <motion.button onClick={() => setWishlist(p => ({ ...p, [item.id]: !p[item.id] }))} animate={wishlist[item.id] ? { scale: 1.2 } : { scale: 1 }} transition={{ type: 'spring', stiffness: 300 }} className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-md ring-1 ring-black/10 ${wishlist[item.id] ? 'bg-[var(--accent)] text-white shadow-lg' : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'}`}>
                                            <HeartIcon className="w-4 h-4" />
                                        </motion.button>

                                        {/* Image */}
                                        <div className="relative h-40 mb-4 overflow-hidden rounded-2xl">
                                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                        </div>

                                        <h3 className="text-base font-semibold text-[var(--text-main)]">{item.title}</h3>
                                        <p className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</p>

                                        <VariantDropdown item={item} selected={selectedWeightValue} setSelected={(val) => setSelectedVariant((p) => ({ ...p, [item.id]: val }))} />

                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-lg font-bold text-[var(--secondary)]">{formatPrice(price)}</p>
                                            {!qty[item.id] ? (
                                                <button onClick={() => setQty(p => ({ ...p, [item.id]: 1 }))} className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-[var(--bg-soft)] text-[var(--primary)] hover:bg-[var(--bg-main)] transition">
                                                    <ShoppingCartIcon className="w-4 h-4" />
                                                    Add
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-1.5 rounded-full shadow-inner">
                                                    <button onClick={() => { setQty(p => { const val = p[item.id] - 1; if (val <= 0) { const copy = { ...p }; delete copy[item.id]; return copy; } return { ...p, [item.id]: val }; }); }} className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition">−</button>
                                                    <span className="text-sm font-semibold text-[var(--text-main)]">{qty[item.id]}</span>
                                                    <button onClick={() => setQty(p => ({ ...p, [item.id]: p[item.id] + 1 }))} className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition">+</button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {/* Pagination – THEME STYLE (like image) */}
                        <div className="mt-12 flex justify-center items-center gap-2 text-sm font-medium">

                            {/* Previous */}
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-3 py-2 rounded-md
      text-[var(--text-muted)]
      hover:text-[var(--accent)]
      disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                ‹ Previous
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(page =>
                                    page <= 4 ||
                                    page > totalPages - 2 ||
                                    Math.abs(page - currentPage) <= 1
                                )
                                .map((page, idx, arr) => {

                                    if (idx > 0 && page - arr[idx - 1] > 1) {
                                        return (
                                            <span key={`dots-${idx}`} className="px-2 text-gray-400">
                                                …
                                            </span>
                                        );
                                    }

                                    return (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`w-9 h-9 rounded-md transition
            ${currentPage === page
                                                    ? 'bg-[var(--accent)] text-white shadow'
                                                    : 'text-[var(--text-main)] hover:bg-[var(--bg-soft)]'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                            {/* Next */}
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-3 py-2 rounded-md
      text-[var(--accent)]
      hover:text-[var(--primary)]
      disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Next ›
                            </button>

                        </div>




                    </div>
                </div>
            </section>
        </div>
    );
}
