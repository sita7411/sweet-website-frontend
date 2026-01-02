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

// Reusable Sidebar Content
const SidebarContent = ({ onItemClick = () => {} }) => {
    const topProducts = products.filter(p => p.category === 'Bestseller').slice(0, 3);
    const minPrice = Math.min(...products.flatMap(p => Object.values(p.variants)));
    const maxPrice = Math.max(...products.flatMap(p => Object.values(p.variants)));

    return (
        <div className="space-y-8">
            <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />

            <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Categories</h3>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                    {categories.filter(c => c !== 'All').map((cat) => (
                        <li
                            key={cat}
                            onClick={() => onItemClick('category', cat)}
                            className="flex justify-between cursor-pointer hover:text-[var(--text-main)]"
                        >
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
                        <li
                            key={w}
                            onClick={() => onItemClick('weight', w)}
                            className="cursor-pointer hover:text-[var(--text-main)]"
                        >
                            {w}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Filter by Price</h3>
                <input type="range" min={minPrice} max={maxPrice} className="w-full" />
                <p className="text-sm text-[var(--text-muted)] mt-2">Up to ₹{maxPrice}</p>
            </div>

            <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Top Products</h3>
                <div className="space-y-4">
                    {topProducts.map(p => (
                        <div key={p.id} className="flex gap-3 items-center">
                            <img src={p.img} alt={p.title} className="w-14 h-14 object-cover rounded-lg" />
                            <div>
                                <p className="text-sm font-medium">{p.title}</p>
                                <p className="text-xs text-[var(--text-muted)]">₹{Object.values(p.variants)[0]}</p>
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
                            onClick={() => onItemClick('category', t)}
                            className="px-3 py-1 text-xs border rounded-full hover:bg-[var(--accent)] hover:text-white cursor-pointer transition"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

function VariantDropdown({ item, selected, setSelected }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full mt-3">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)] text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center hover:border-[var(--text-main)] transition"
            >
                {selected}
                <motion.span animate={{ rotate: open ? 180 : 0 }}>
                    <ChevronDownIcon className="w-5 h-5 text-[var(--text-muted)]" />
                </motion.span>
            </button>

            <AnimatePresence>onClick={() => setWishlist(p => ({ ...p, [item.id]: !p[item.id] }))}
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
                                onClick={() => { setSelected(opt); setOpen(false); }}
                                className={`px-4 py-2 text-sm cursor-pointer transition ${selected === opt ? 'bg-[var(--bg-soft)] font-semibold' : 'hover:bg-[var(--bg-soft)]'}`}
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
    const options = ['Default sorting', 'Price: Low → High', 'Price: High → Low', 'Name: A → Z', 'Name: Z → A'];

    return (
        <div className="relative w-full sm:w-48">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)] text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center hover:border-[var(--text-main)]"
            >
                {sortBy}
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
                        className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border border-gray-300 rounded-2xl shadow-lg overflow-hidden"
                    >
                        {options.map((opt) => (
                            <li
                                key={opt}
                                onClick={() => { setSortBy(opt); setOpen(false); }}
                                className={`px-4 py-2 text-sm cursor-pointer transition ${sortBy === opt ? 'bg-[var(--bg-soft)] font-semibold' : 'hover:bg-[var(--bg-soft)]'}`}
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

    const filteredProducts = products.filter((p) => {
        const catMatch = activeCategory === 'All' || p.category === activeCategory;
        const weightMatch = activeWeight === 'All' || Object.keys(p.variants).includes(activeWeight);
        const searchMatch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const selectedWeight = selectedVariant[p.id] || Object.keys(p.variants)[0];
        const priceMatch = p.variants[selectedWeight] <= maxPrice;
        return catMatch && weightMatch && searchMatch && priceMatch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const getPrice = (p) => Math.min(...Object.values(p.variants));
        switch (sortBy) {
            case 'Price: Low → High': return getPrice(a) - getPrice(b);
            case 'Price: High → Low': return getPrice(b) - getPrice(a);
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

    const handleFilterItemClick = (type, value) => {
        if (type === 'category') setActiveCategory(value);
        if (type === 'weight') setActiveWeight(value);
        setCurrentPage(1);
        setIsFilterOpen(false);
    };

    return (
        <div className="min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <img src="/chikki_banner_offer.png" alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[var(--secondary)]/20"></div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_3px_8px_rgba(107,63,38,0.6)]"
                    >
                        Products
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 flex justify-center items-center gap-3 text-white text-sm sm:text-base">
                        <Link to="/" className="hover:underline">Home</Link>
                        <span className="font-bold">\\</span>
                        <span className="font-semibold">Products</span>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Mobile Filter Button */}
                    <div className="lg:hidden flex justify-between items-center mb-8">
                        <p className="text-sm text-[var(--text-muted)]">
                            Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} results
                        </p>
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-card)] rounded-2xl shadow border border-gray-300 font-medium text-sm"
                        >
                            <AdjustmentsHorizontalIcon className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Desktop Sidebar - Unchanged */}
                        <aside className="hidden lg:block lg:col-span-1 sticky top-20 space-y-6">
                            <SidebarContent onItemClick={handleFilterItemClick} />
                        </aside>

                        {/* Mobile Filter Drawer - Starts below navbar */}
                        <AnimatePresence>
                            {isFilterOpen && (
                                <>
                                    {/* Overlay */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsFilterOpen(false)}
                                        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                                    />

                                    {/* Drawer Panel */}
                                    <motion.aside
                                        initial={{ x: -320 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -320 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="fixed top-16 left-0 bottom-0 z-50 w-80 bg-[var(--bg-main)] shadow-2xl overflow-y-auto px-6 py-8 lg:hidden"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-xl font-bold text-[var(--text-main)]">Filters</h2>
                                            <button
                                                onClick={() => setIsFilterOpen(false)}
                                                className="p-2 rounded-full bg-[var(--bg-soft)] hover:bg-gray-300 transition"
                                            >
                                                <XMarkIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <SidebarContent onItemClick={handleFilterItemClick} />
                                    </motion.aside>
                                </>
                            )}
                        </AnimatePresence>

                        {/* Products Grid */}
                        <div className="lg:col-span-4">
                            {/* Desktop Top Bar */}
                            <div className="hidden lg:flex justify-between items-center mb-6">
                                <p className="text-sm text-[var(--text-muted)]">
                                    Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} results
                                </p>
                                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                            </div>

                            {/* Mobile Sort */}
                            <div className="lg:hidden mb-6">
                                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                            </div>

                            {/* Product Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
                                {displayedProducts.length === 0 ? (
                                    <p className="col-span-full text-center py-12 text-[var(--text-muted)] text-lg">No products found.</p>
                                ) : (
                                    displayedProducts.map((item) => {
                                        const selectedWeight = selectedVariant[item.id] || Object.keys(item.variants)[0];
                                        const price = item.variants[selectedWeight];

                                        return (
                                            <motion.div
                                                key={item.id}
                                                whileHover={{ y: -8 }}
                                                className="bg-[var(--bg-card)] rounded-3xl p-4 sm:p-5 shadow-lg hover:shadow-2xl transition-all"
                                            >
                                                <button
                                                    onClick={() => setWishlist(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                                    className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all ${wishlist[item.id] ? 'bg-[var(--accent)] text-white' : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'}`}
                                                >
                                                    <HeartIcon className="w-4 h-4" />
                                                </button>

                                                <div className="h-36 sm:h-40 rounded-2xl overflow-hidden mb-4">
                                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                                </div>

                                                <h3 className="font-semibold text-[var(--text-main)] text-base">{item.title}</h3>
                                                <p className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</p>

                                                <VariantDropdown
                                                    item={item}
                                                    selected={selectedWeight}
                                                    setSelected={(val) => setSelectedVariant(prev => ({ ...prev, [item.id]: val }))}
                                                />

                                                <div className="flex justify-between items-center mt-4">
                                                    <p className="text-lg font-bold text-[var(--secondary)]">{formatPrice(price)}</p>
                                                    {!qty[item.id] ? (
                                                        <button
                                                            onClick={() => setQty(prev => ({ ...prev, [item.id]: 1 }))}
                                                            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-soft)] rounded-full text-sm font-semibold hover:bg-[var(--bg-main)] transition"
                                                        >
                                                            <ShoppingCartIcon className="w-4 h-4" />
                                                            Add
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-2 rounded-full">
                                                            <button onClick={() => setQty(prev => {
                                                                const newVal = prev[item.id] - 1;
                                                                if (newVal <= 0) {
                                                                    const { [item.id]: _, ...rest } = prev;
                                                                    return rest;
                                                                }
                                                                return { ...prev, [item.id]: newVal };
                                                            })} className="text-lg font-bold">−</button>
                                                            <span className="w-6 text-center font-semibold">{qty[item.id]}</span>
                                                            <button onClick={() => setQty(prev => ({ ...prev, [item.id]: prev[item.id] + 1 }))} className="text-lg font-bold">+</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex flex-wrap justify-center gap-3">
                                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded-md disabled:opacity-50">‹ Previous</button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`w-10 h-10 rounded-md transition ${currentPage === page ? 'bg-[var(--accent)] text-white' : 'hover:bg-[var(--bg-soft)]'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 rounded-md disabled:opacity-50">Next ›</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}