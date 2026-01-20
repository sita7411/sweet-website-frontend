import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Features from "../components/Features/Features";
import { useShop } from "../context/ShopContext";


const Wishlist = () => {
    const {
        wishlistItems,
        fetchWishlist,
        removeFromWishlist,
        clearWishlist,
        addToCart,
    } = useShop();

    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    useEffect(() => {
        const initialQtys = {};
        wishlistItems.forEach(item => {
            const key = item._id || item.productId || item.id;
            initialQtys[key] = 1;
        });
        setQuantities(initialQtys);
    }, [wishlistItems]);

    // ────────────────────────────────────────────────
    // Handlers
    // ────────────────────────────────────────────────

    const handleAddToCart = (item) => {
        const key = item._id || item.productId || item.id;

        const inStock = (item.stockQuantity ?? item.stock ?? 0) > 0 ||
            item.stock === 'In stock';

        if (inStock) {
            const product = {
                _id: item.productId || item.id,
                name: item.name || item.title,
            };
            const variant = {
                weight: item.selectedWeight || item.size || item.weight,
            };
            const qty = quantities[key] || 1;

            addToCart?.(product, variant, qty);
            // toast hataya gaya → context handle karega
        }
        // else case bhi hataya → context mein error handling better hai
    };

    const handleAddAllToCart = () => {
        const inStockItems = wishlistItems.filter(item =>
            (item.stockQuantity ?? 0) > 0 || item.stock === 'In stock'
        );

        if (inStockItems.length > 0) {
            inStockItems.forEach(item => handleAddToCart(item));
            // toast hataya → individual addToCart calls context se toast dikha denge
        }
        // no items case bhi hataya
    };

    const handleClearWishlist = async () => {
        if (!window.confirm("Are you sure you want to clear your wishlist?")) return;

        try {
            await clearWishlist();
            // toast hataya → context already dikha deta hai
        } catch (err) {
            console.error(err);
            // toast hataya
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await removeFromWishlist(id);
            // toast hataya
        } catch (err) {
            console.error(err);
            // toast hataya
        }
    };

    const handleQuantityChange = (id, value) => {
        value = Math.max(1, Number(value) || 1);
        setQuantities(prev => ({ ...prev, [id]: value }));
    };

    // Calculate total only for in-stock items
    const totalPrice = wishlistItems.reduce((acc, item) => {
        const key = item._id || item.productId || item.id;
        const qty = quantities[key] || 1;
        const price = item.sellingPrice ?? item.price ?? 0;

        const inStock = (item.stockQuantity ?? 0) > 0 || item.stock === 'In stock';

        return inStock ? acc + price * qty : acc;
    }, 0);

    // ────────────────────────────────────────────────
    // Helpers (unchanged)
    // ────────────────────────────────────────────────

    const getImage = (item) => item.image || item.img || '/images/placeholder-chikki.png';

    const getTitle = (item) => item.name || item.title || 'Product';

    const getShortDescription = (item) => item.shortDescription || '';

    const getWeight = (item) => item.selectedWeight || '';

    const getPrice = (item) => {
        const price = item.sellingPrice ?? item.price ?? 0;
        return Number(price).toFixed(2);
    };

    const getStockQuantity = (item) => item.stockQuantity ?? 0;

    const getStockStatus = (item) => {
        const qty = getStockQuantity(item);
        if (qty > 0) return 'In stock';
        if (qty === 0) return 'Out of stock';
        return 'Unknown';
    };

    const isInStock = (item) => getStockQuantity(item) > 0;

    return (
        <div className="min-h-screen">
            {/* Banner – unchanged */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <img src="/login.png" alt="Products Banner" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[var(--secondary)]/20"></div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_3px_8px_rgba(107,63,38,0.6)]"
                    >
                        Wishlist
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 flex justify-center items-center gap-3 text-white text-sm sm:text-base"
                    >
                        <Link to="/" className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200">
                            Home
                        </Link>
                        <span className="font-bold">\\</span>
                        <Link to="/shop" className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200">
                            Products
                        </Link>
                        <span className="font-bold">\\</span>
                        <span className="font-semibold">Wishlist</span>
                    </motion.div>
                </div>
            </section>

            {/* Wishlist Content */}
            <div className="container mx-auto mt-10 mb-24 px-4 md:px-10">
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-10 flex flex-col items-center justify-center gap-6">
                        <img
                            src="empty-wishlist.png"
                            alt="Empty Wishlist"
                            className="w-48 h-48 sm:w-64 sm:h-64 object-cover"
                        />
                        <div>
                            <p className="text-xl sm:text-2xl -mt-10 font-semibold text-[var(--text-main)]">
                                Your wishlist is empty
                            </p>
                            <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 px-4">
                                Browse our chikkis and start adding your favorites!
                            </p>
                        </div>
                        <Link
                            to="/shop"
                            className="bg-[var(--accent)] text-[var(--secondary)] px-8 py-3 rounded-lg font-semibold shadow-lg hover:brightness-105 transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Mobile Card View */}
                        <div className="block lg:hidden">
                            {wishlistItems.map((item, index) => {
                                const key = item._id || item.productId || item.id;
                                return (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={getImage(item)}
                                                alt={getTitle(item)}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{getTitle(item)}</h3>
                                                <p className="text-sm text-[var(--text-muted)] mt-1">
                                                    {getWeight(item) || '—'}
                                                </p>
                                                <p className="font-bold text-lg mt-2">
                                                    ₹{getPrice(item)}
                                                </p>
                                                <p className="text-sm mt-1">Added: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date || '—'}</p>
                                                <p className={`font-medium mt-1 ${isInStock(item) ? 'text-green-600' : 'text-red-600'}`}>
                                                    {getStockStatus(item)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Quantity:</span>
                                                <div className="flex items-center border border-gray-300 rounded-md w-28">
                                                    <button
                                                        onClick={() => handleQuantityChange(key, (quantities[key] || 1) - 1)}
                                                        className="px-3 py-1 text-gray-700"
                                                    >-</button>
                                                    <input
                                                        type="text"
                                                        value={quantities[key] || 1}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val)) handleQuantityChange(key, val);
                                                        }}
                                                        className="w-12 text-center py-1 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(key, (quantities[key] || 1) + 1)}
                                                        className="px-3 py-1 text-gray-700"
                                                    >+</button>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    className={`flex-1 py-2 rounded font-semibold text-white transition ${isInStock(item)
                                                        ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                                                        : 'bg-gray-400 cursor-not-allowed'
                                                        }`}
                                                    disabled={!isInStock(item)}
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    className="flex-1 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold"
                                                    onClick={() => handleRemoveItem(key)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto shadow-lg rounded-lg">
                            <table className="w-full min-w-[700px] text-left border border-gray-200">
                                <thead className="bg-[var(--accent)] text-[var(--text-main)]">
                                    <tr>
                                        <th className="py-3 px-6">Product</th>
                                        <th className="py-3 px-6">Price</th>
                                        <th className="py-3 px-6">Quantity</th>
                                        <th className="py-3 px-6">Date Added</th>
                                        <th className="py-3 px-6">Stock Status</th>
                                        <th className="py-3 px-6">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlistItems.map((item, index) => {
                                        const key = item._id || item.productId || item.id;
                                        return (
                                            <motion.tr
                                                key={key}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="border-b border-gray-200 hover:bg-[var(--bg-soft)] transition"
                                            >
                                                <td className="py-4 px-6 flex items-center gap-4">
                                                    <img
                                                        src={getImage(item)}
                                                        alt={getTitle(item)}
                                                        className="w-16 h-16 object-cover rounded shadow-sm"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{getTitle(item)}</p>
                                                        <p className="text-sm text-[var(--text-muted)]">
                                                            {getWeight(item) || '—'}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 font-medium">
                                                    ₹{getPrice(item)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-24">
                                                        <button
                                                            onClick={() => handleQuantityChange(key, (quantities[key] || 1) - 1)}
                                                            className="px-2 py-1 text-gray-700 transition"
                                                        >-</button>
                                                        <input
                                                            type="text"
                                                            value={quantities[key] || 1}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (!isNaN(val)) handleQuantityChange(key, val);
                                                            }}
                                                            className="w-full text-center px-2 py-1 focus:outline-none"
                                                        />
                                                        <button
                                                            onClick={() => handleQuantityChange(key, (quantities[key] || 1) + 1)}
                                                            className="px-2 py-1 text-gray-700 transition"
                                                        >+</button>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date || '—'}
                                                </td>
                                                <td className={`py-4 px-6 font-medium ${isInStock(item) ? 'text-green-600' : 'text-red-600'}`}>
                                                    {getStockStatus(item)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center min-h-[80px]">
                                                        <button
                                                            className={`px-4 py-2 rounded text-white font-semibold transition ${isInStock(item)
                                                                ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                                                                : 'bg-gray-400 cursor-not-allowed'
                                                                }`}
                                                            disabled={!isInStock(item)}
                                                            onClick={() => handleAddToCart(item)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold"
                                                            onClick={() => handleRemoveItem(key)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Total Price & Actions */}
                        <div className="mt-8 lg:mt-6">
                            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                                <div className="w-full lg:w-auto order-2 lg:order-1">
                                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                                        <input
                                            type="text"
                                            readOnly
                                            value="https://www.chikkistore.com/wishlist"
                                            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                                        />
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText('https://www.chikkistore.com/wishlist');
                                                // toast hataya → optional: context mein bhi add kar sakte ho agar chaho
                                            }}
                                            className="bg-[var(--secondary)] text-white px-6 py-2 rounded hover:bg-[var(--primary)] transition font-semibold whitespace-nowrap"
                                        >
                                            Copy Link
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 items-center order-1 lg:order-2">

                                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                        <button
                                            onClick={handleClearWishlist}
                                            className="text-[var(--text-main)] underline hover:text-[var(--primary)] transition font-semibold"
                                        >
                                            Clear Wishlist
                                        </button>
                                        <button
                                            onClick={handleAddAllToCart}
                                            disabled={wishlistItems.filter(isInStock).length === 0}
                                            className={`px-6 py-3 rounded font-semibold text-white transition whitespace-nowrap ${wishlistItems.filter(isInStock).length === 0
                                                ? 'bg-gray-300 cursor-not-allowed'
                                                : 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                                                }`}
                                        >
                                            Add All to Cart
                                        </button>
                                        <div className="bg-[var(--secondary)] text-white px-8 py-4 rounded shadow-md font-bold text-xl text-center min-w-[200px]">
                                            Total: ₹{totalPrice.toFixed(2)}   {/* ₹ symbol fix kiya */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
                toastStyle={{
                    background: 'var(--bg-soft)',
                    color: 'var(--secondary)',
                    fontWeight: 600,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '14px 20px',
                }}
            />
            <Features />
        </div>
    );
};

export default Wishlist;