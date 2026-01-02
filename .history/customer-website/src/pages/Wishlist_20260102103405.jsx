import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

// Initial Wishlist Items
const initialWishlist = [
    {
        id: 1,
        title: 'Pista Chocolate Chikki',
        color: 'Chocolate & Peanut Blend',
        size: '250g',
        price: 12.0,
        date: '18 January 2026',
        stock: 'In stock',
        img: '/images/pista.png',
    },
    {
        id: 2,
        title: 'Cashew Chikki',
        color: 'Cashew & Jaggery',
        size: '200g',
        price: 15.0,
        date: '15 January 2026',
        stock: 'In stock',
        img: '/images/cashew.png',
    },
    {
        id: 3,
        title: 'Almond Chikki',
        color: 'Almond & Jaggery',
        size: '300g',
        price: 18.0,
        date: '12 January 2026',
        stock: 'Out of stock',
        img: '/images/almond.png',
    },
];

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(initialWishlist);
    const [quantities, setQuantities] = useState(
        initialWishlist.reduce((acc, item) => {
            acc[item.id] = 1;
            return acc;
        }, {})
    );

    // Handlers
    const handleAddToCart = (item) => {
        if (item.stock === 'In stock') {
            toast.success(`${item.title} added to cart!`);
        } else {
            toast.error(`${item.title} is out of stock!`);
        }
    };

    const handleAddAllToCart = () => {
        const inStockItems = wishlist.filter((item) => item.stock === 'In stock');
        if (inStockItems.length > 0) {
            toast.success('All in-stock items added to cart!');
        } else {
            toast.warn('No items in stock to add!');
        }
    };

    const handleClearWishlist = () => {
        setWishlist([]);
        toast.info('Wishlist cleared!');
    };

    const handleRemoveItem = (id) => {
        const item = wishlist.find((i) => i.id === id);
        setWishlist((prev) => prev.filter((i) => i.id !== id));
        toast.info(`${item.title} removed from wishlist`);
    };

    const handleQuantityChange = (id, value) => {
        if (value < 1) value = 1;
        setQuantities((prev) => ({ ...prev, [id]: value }));
    };

    const totalPrice = wishlist.reduce((acc, item) => {
        if (item.stock === 'In stock') return acc + item.price * (quantities[item.id] || 1);
        return acc;
    }, 0);

    return (
        <div className="min-h-screen ">
            {/* Banner */}
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
                          <Link
    to="/"
    className="hover:text-[var(--accent)] hover:underline hover:font-bold transition-all duration-200"
  >
    Home
  </Link>

  <span className="font-bold">\\</span>

  <Link
    to="/products"
    className="hover:text-[var(--sec)] hover:underline hover:font-bold transition-all duration-200"
  >
    Products
  </Link>

                        <span className="font-bold">\\</span>
                        <span className="font-semibold">Wishlist</span>
                    </motion.div>
                </div>
            </section>


            {/* Wishlist Content */}
            <div className="container mx-auto mt-10 mb-24 px-4 md:px-10">
                {wishlist.length === 0 ? (
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
                        <a
                            href="/products"
                            className="bg-[var(--accent)] text-[var(--secondary)] px-8 py-3 rounded-lg font-semibold shadow-lg hover:brightness-105 transition"
                        >
                            Shop Now
                        </a>
                    </div>
                ) : (
                    <>
                        {/* Mobile Card View */}
                        <div className="block lg:hidden">
                            {wishlist.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="text-sm text-[var(--text-muted)]">
                                                {item.color} | {item.size}
                                            </p>
                                            <p className="font-bold text-lg mt-2">${item.price.toFixed(2)}</p>
                                            <p className="text-sm mt-1">Added: {item.date}</p>
                                            <p
                                                className={`font-medium mt-1 ${item.stock === 'In stock' ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                            >
                                                {item.stock}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quantity & Actions */}
                                    <div className="mt-4 flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Quantity:</span>
                                            <div className="flex items-center border border-gray-300 rounded-md w-28">
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            Math.max(1, (quantities[item.id] || 1) - 1)
                                                        )
                                                    }
                                                    className="px-3 py-1 text-gray-700"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    value={quantities[item.id]}
                                                    onChange={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        if (!isNaN(val) && val > 0) handleQuantityChange(item.id, val);
                                                    }}
                                                    className="w-12 text-center py-1 focus:outline-none"
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)
                                                    }
                                                    className="px-3 py-1 text-gray-700"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                className={`flex-1 py-2 rounded font-semibold text-white transition ${item.stock === 'In stock'
                                                        ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                                                        : 'bg-gray-400 cursor-not-allowed'
                                                    }`}
                                                disabled={item.stock !== 'In stock'}
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                Add to Cart
                                            </button>
                                            <button
                                                className="flex-1 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
                                    {wishlist.map((item, index) => (
                                        <motion.tr
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="border-b border-gray-200 hover:bg-[var(--bg-soft)] transition"
                                        >
                                            <td className="py-4 px-6 flex items-center gap-4">
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="w-16 h-16 object-cover rounded shadow-sm"
                                                />
                                                <div>
                                                    <p className="font-semibold">{item.title}</p>
                                                    <p className="text-sm text-[var(--text-muted)]">
                                                        {item.color} | {item.size}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-medium">${item.price.toFixed(2)}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-24">
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                Math.max(1, (quantities[item.id] || 1) - 1)
                                                            )
                                                        }
                                                        className="px-2 py-1 text-gray-700 transition"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={quantities[item.id]}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val) && val > 0) handleQuantityChange(item.id, val);
                                                        }}
                                                        className="w-full text-center px-2 py-1 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)
                                                        }
                                                        className="px-2 py-1 text-gray-700 transition"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">{item.date}</td>
                                            <td
                                                className={`py-4 px-6 font-medium ${item.stock === 'In stock' ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                            >
                                                {item.stock}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center min-h-[80px]">
                                                    <button
                                                        className={`px-4 py-2 rounded text-white font-semibold transition ${item.stock === 'In stock'
                                                                ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                                                                : 'bg-gray-400 cursor-not-allowed'
                                                            }`}
                                                        disabled={item.stock !== 'In stock'}
                                                        onClick={() => handleAddToCart(item)}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
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
                                                toast.success('Wishlist link copied!');
                                            }}
                                            className="bg-[var(--secondary)] text-white px-6 py-2 rounded hover:bg-[var(--primary)] transition font-semibold whitespace-nowrap"
                                        >
                                            Copy Link
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 items-center order-1 lg:order-2">
                                    <div className="bg-[var(--secondary)] text-white px-8 py-4 rounded-lg shadow-md font-bold text-xl text-center min-w-[200px]">
                                        Total: ${totalPrice.toFixed(2)}
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                        <button
                                            onClick={handleClearWishlist}
                                            className="text-[var(--text-main)] underline hover:text-[var(--primary)] transition font-semibold"
                                        >
                                            Clear Wishlist
                                        </button>
                                        <button
                                            onClick={handleAddAllToCart}
                                            disabled={wishlist.filter((item) => item.stock === 'In stock').length === 0}
                                            className={`px-6 py-3 rounded font-semibold text-white transition whitespace-nowrap ${wishlist.filter((item) => item.stock === 'In stock').length === 0
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                                                }`}
                                        >
                                            Add All to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Toast Container */}
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
        </div>
    );
};

export default Wishlist;
