import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, ChevronDownIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
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
                        {Object.keys(item.variants).map((opt) => (
                            <li
                                key={opt}
                                onClick={() => {
                                    setSelected(opt);
                                    setOpen(false);
                                }}
                                className={`px-4 py-2 text-sm cursor-pointer transition
                                    ${selected === opt
                                        ? 'bg-[var(--bg-soft)] text-[var(--text-main)] font-semibold'
                                        : 'text-[var(--text-main)] hover:bg-[var(--bg-soft)]'
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
        <div className="relative w-full sm:w-48">
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
                        {options.map((opt) => (
                            <li
                                key={opt}
                                onClick={() => { setSortBy(opt); setOpen(false); }}
                                className={`px-4 py-2 text-sm cursor-pointer transition
                                    ${sortBy === opt
                                        ? 'bg-[var(--bg-soft)] text-[var(--text-main)] font-semibold'
                                        : 'text-[var(--text-main)] hover:bg-[var(--bg-soft)]'
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
    const [maxPrice, setMaxPrice] = useState(Math.max(...products.flatMap(p => Object.values(p.variants))));
    const [sortBy, setSortBy] = useState('Default sorting');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const PRODUCTS_PER_PAGE = 6;

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');

    const topProducts = products.filter(p => p.category === 'Bestseller').slice(0, 3);

    const filteredProducts = products.filter((p) => {
        const catMatch = activeCategory === 'All' || p.category === activeCategory;
        const weightMatch = activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight);
        const searchMatch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const selectedWeight = selectedVariant[p.id] || Object.keys(p.variants)[0];
        const priceMatch = p.variants[selectedWeight] <= maxPrice;
        return catMatch && weightMatch && searchMatch && priceMatch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const aPrice = Object.values(a.variants)[0];
        const bPrice = Object.values(b.variants)[0];
        switch (sortBy) {
            case 'Price: Low → High': return aPrice - bPrice;
            case 'Price: High → Low': return bPrice - aPrice;
            case 'Name: A → Z': return a.title.localeCompare(b.title);
            case 'Name: Z → A': return b.title.localeCompare(a.title);
            default: return 0;
        }
    });

    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
    const displayedProducts = sortedProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsFilterOpen(false);
    };

    return (
        <div className="min-h-screen font-sans">
            {/* Hero */}
            <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
                <img
                    src="/chikki_banner_offer.png"
                    alt="Products Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[var(--secondary)]/20"></div>

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_3px_8px_rgba(107,63,38,0.6)]"
                    >
                        Products
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 flex justify-center items-center gap-2 text-sm sm:text-base"
                    >
                        <Link to="/" className="text-[var(--text-muted)] hover:text-white transition">Home</Link>
                        <span className="text-white font-bold">\\</span>
                        <Link to="/products" className="text-white font-semibold">Products</Link>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8 sm:py-14">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Mobile Filter Button */}
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <p className="text-sm text-[var(--text-muted)]">
                            Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} results
                        </p>
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] rounded-2xl shadow border border-gray-300"
                        >
                            <AdjustmentsHorizontalIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">Filters</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Sidebar - Desktop + Mobile Drawer */}
                        <AnimatePresence>
                            {(isFilterOpen || window.innerWidth >= 1024) && (
                                <motion.aside
                                    initial={isFilterOpen ? { x: -300 } : false}
                                    animate={{ x: 0 }}
                                    exit={{ x: -300 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className={`fixed lg:static inset-y-0 left-0 z-40 w-80 bg-[var(--bg-main)] shadow-2xl lg:shadow-none overflow-y-auto lg:col-span-1 space-y-6 pt-20 lg:pt-0 px-6 lg:px-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}
                                >
                                    {/* Mobile Close Button */}
                                    {isFilterOpen && (
                                        <button
                                            onClick={() => setIsFilterOpen(false)}
                                            className="absolute top-4 right-4 lg:hidden p-2 rounded-full bg-[var(--bg-soft)]"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    )}

                                    {/* Search */}
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                        className="w-full border px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    />

                                    {/* Categories, Weight, Price, Top Products, Tags */}
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Categories</h3>
                                        <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                                            {categories.filter(c => c !== 'All').map((cat) => (
                                                <li key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1); setIsFilterOpen(false); }} className={`flex justify-between cursor-pointer hover:text-[var(--text-main)] ${activeCategory === cat ? 'font-semibold text-[var(--text-main)]' : ''}`}>
                                                    <span>{cat}</span>
                                                    <span>({products.filter(p => p.category === cat).length})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Weight</h3>
                                        <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                                            {weights.filter(w => w !== 'All').map((w) => (
                                                <li key={w} onClick={() => { setActiveWeight(w); setCurrentPage(1); setIsFilterOpen(false); }} className={`cursor-pointer hover:text-[var(--text-main)] ${activeWeight === w ? 'font-semibold text-[var(--text-main)]' : ''}`}>
                                                    {w}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Filter by Price</h3>
                                        <input
                                            type="range"
                                            min={Math.min(...products.flatMap(p => Object.values(p.variants)))}
                                            max={Math.max(...products.flatMap(p => Object.values(p.variants)))}
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                                            className="w-full"
                                        />
                                        <p className="text-sm text-[var(--text-muted)] mt-2">Max: {formatPrice(maxPrice)}</p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Top Products</h3>
                                        <div className="space-y-4">
                                            {topProducts.map(p => (
                                                <div key={p.id} className="flex gap-3 items-center">
                                                    <img src={p.img} alt={p.title} className="w-14 h-14 object-cover rounded-lg" />
                                                    <div>
                                                        <p className="text-sm font-medium">{p.title}</p>
                                                        <p className="text-xs text-[var(--text-muted)]">{formatPrice(Object.values(p.variants)[0])}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((t) => (
                                                <span
                                                    key={t}
                                                    onClick={() => { setActiveCategory(t); setCurrentPage(1); setIsFilterOpen(false); }}
                                                    className="px-3 py-1 text-xs border rounded-full hover:bg-[var(--accent)] hover:text-white cursor-pointer transition"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.aside>
                            )}
                        </AnimatePresence>

                        {/* Overlay for mobile */}
                        {isFilterOpen && (
                            <div
                                onClick={() => setIsFilterOpen(false)}
                                className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                            />
                        )}

                        {/* Products Grid */}
                        <div className="lg:col-span-4">
                            {/* Desktop Top Bar */}
                            <div className="hidden lg:flex justify-between items-center mb-6">
                                <p className="text-sm text-[var(--text-muted)]">
                                    Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} results
                                </p>
                                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                            </div>

                            {/* Mobile Sort */}
                            <div className="lg:hidden mb-4">
                                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                {displayedProducts.length === 0 && (
                                    <p className="col-span-full text-center text-[var(--text-muted)] py-10 text-lg font-medium">
                                        No products found for selected filters.
                                    </p>
                                )}

                                {displayedProducts.map((item) => {
                                    const selectedWeight = selectedVariant[item.id] || Object.keys(item.variants)[0];
                                    const price = item.variants[selectedWeight];

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -6 }}
                                            className="rounded-3xl p-4 sm:p-5 relative group shadow-lg bg-[var(--bg-card)] hover:shadow-2xl transition"
                                        >
                                            <motion.button
                                                onClick={() => setWishlist(p => ({ ...p, [item.id]: !p[item.id] }))}
                                                animate={wishlist[item.id] ? { scale: 1.2 } : { scale: 1 }}
                                                className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all ${wishlist[item.id] ? 'bg-[var(--accent)] text-white' : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'}`}
                                            >
                                                <HeartIcon className="w-4 h-4" />
                                            </motion.button>

                                            <div className="relative h-32 sm:h-40 mb-4 overflow-hidden rounded-2xl">
                                                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                            </div>

                                            <h3 className="text-base font-semibold text-[var(--text-main)] line-clamp-2">{item.title}</h3>
                                            <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">{item.desc}</p>

                                            <VariantDropdown
                                                item={item}
                                                selected={selectedWeight}
                                                setSelected={(val) => setSelectedVariant(p => ({ ...p, [item.id]: val }))}
                                            />

                                            <div className="flex items-center justify-between mt-4">
                                                <p className="text-lg font-bold text-[var(--secondary)]">{formatPrice(price)}</p>
                                                {!qty[item.id] ? (
                                                    <button
                                                        onClick={() => setQty(p => ({ ...p, [item.id]: 1 }))}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--bg-soft)] text-[var(--primary)] hover:bg-[var(--bg-main)] transition"
                                                    >
                                                        <ShoppingCartIcon className="w-4 h-4" />
                                                        Add
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-2 rounded-full">
                                                        <button onClick={() => setQty(p => {
                                                            const val = (p[item.id] || 0) - 1;
                                                            if (val <= 0) { const copy = { ...p }; delete copy[item.id]; return copy; }
                                                            return { ...p, [item.id]: val };
                                                        })} className="text-lg font-bold">−</button>
                                                        <span className="text-sm font-semibold min-w-[20px] text-center">{qty[item.id]}</span>
                                                        <button onClick={() => setQty(p => ({ ...p, [item.id]: (p[item.id] || 0) + 1 }))} className="text-lg font-bold">+</button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-2 text-sm font-medium">
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-md text-[var(--text-muted)] hover:text-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ‹ Previous
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(page => page <= 3 || page > totalPages - 3 || Math.abs(page - currentPage) <= 1)
                                        .map((page, idx, arr) => (
                                            idx > 0 && page - arr[idx - 1] > 1 ? (
                                                <span key={`dots-${idx}`} className="px-2 text-gray-400">…</span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => goToPage(page)}
                                                    className={`w-10 h-10 rounded-md transition ${currentPage === page ? 'bg-[var(--accent)] text-white' : 'hover:bg-[var(--bg-soft)]'}`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        ))}

                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-md text-[var(--accent)] hover:text-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next ›
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}