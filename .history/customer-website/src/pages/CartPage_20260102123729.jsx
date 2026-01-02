// CartPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Features from "../components/Features/Features";

const initialCart = [
    {
        id: 1,
        title: 'Pista Chocolate Chikki',
        flavor: 'Chocolate & Pistachio',
        weight: '250g',
        price: 250,
        quantity: 2,
        stock: 'In stock',
        img: '/images/pista-chikki.png',
    },
    {
        id: 2,
        title: 'Classic Peanut Chikki',
        flavor: 'Roasted Peanuts & Jaggery',
        weight: '200g',
        price: 150,
        quantity: 1,
        stock: 'In stock',
        img: '/images/peanut-chikki.png',
    },
    {
        id: 3,
        title: 'Coconut Chikki',
        flavor: 'Coconut & Jaggery',
        weight: '200g',
        price: 180,
        quantity: 1,
        stock: 'Out of stock',
        img: '/images/coconut-chikki.png',
    },
];

const CartPage = () => {
    const [cart, setCart] = useState(initialCart);
    const [isProcessing, setIsProcessing] = useState(false);

    // Handlers
    const handleQuantityChange = (id, value) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: value < 1 ? 1 : value } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        const item = cart.find((i) => i.id === id);
        setCart((prev) => prev.filter((i) => i.id !== id));
        toast.info(`${item.title} removed from cart`);
    };

    const handleClearCart = () => {
        setCart([]);
        toast.info('Cart cleared!');
    };

    const handleCheckout = () => {
        const inStockItems = cart.filter((item) => item.stock === 'In stock');
        if (inStockItems.length === 0) return;

        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setCart([]);
        }, 2000);
    };

    const subtotal = cart.reduce(
        (acc, item) => (item.stock === 'In stock' ? acc + item.price * item.quantity : acc),
        0
    );
    const shipping = subtotal > 500 ? 0 : 50;
    const taxes = subtotal * 0.05;
    const total = subtotal + shipping + taxes;

    return (
        <div className="min-h-screen">
            {/* Banner */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <img
                    src="/login.png"
                    alt="Cart Banner"
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
                        Your Chikki Cart
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 flex justify-center items-center gap-3 text-white text-sm sm:text-base"
                    >
                        <Link
                            to="/"
                            className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200"
                        >
                            Home
                        </Link>
                        <span className="font-bold">\\</span>
                        <Link
                            to="/products"
                            className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200"
                        >
                            Products
                        </Link>
                        <span className="font-bold">\\</span>
                        <span className="font-semibold">Cart</span>
                    </motion.div>
                </div>
            </section>

            {/* Cart Content */}
            <div className="container mx-auto mt-10 mb-24 px-4 md:px-10">
                {cart.length === 0 ? (
                    <div className="text-center py-10 flex flex-col items-center justify-center gap-6">
                        <img
                            src="/empty-cart.png"
                            alt="Empty Cart"
                            className="w-48 h-48 sm:w-64 sm:h-64 object-cover"
                        />
                        <div>
                            <p className="text-xl sm:text-2xl -mt-10 font-semibold text-[var(--text-main)]">
                                Your cart is empty
                            </p>
                            <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 px-4">
                                Explore our delicious chikkis and add your favorites!
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="bg-[var(--accent)] text-[var(--secondary)] px-8 py-3 rounded-lg font-semibold shadow-lg hover:brightness-105 transition"
                        >
                            Shop Chikkis
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left: Cart Items */}
                        <div className="flex-1">
                            {/* Mobile Cards */}
                            <div className="block lg:hidden">
                                {cart.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[var(--bg-card)] shadow-md rounded-lg p-4 mb-4 border border-gray-200"
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
                                                    {item.flavor} | {item.weight}
                                                </p>
                                                <p className="font-bold text-lg mt-2">₹{item.price.toFixed(2)}</p>
                                                <p
                                                    className={`font-medium mt-1 ${item.stock === 'In stock' ? 'text-green-600' : 'text-red-600'
                                                        }`}
                                                >
                                                    {item.stock}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Quantity:</span>
                                                <div className="flex items-center border border-gray-300 rounded-md w-28">
                                                    <button
                                                        onClick={() =>
                                                            handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                                                        }
                                                        className="px-3 py-1 text-gray-700"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value);
                                                            if (!isNaN(val) && val > 0) handleQuantityChange(item.id, val);
                                                        }}
                                                        className="w-12 text-center py-1 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 text-gray-700"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    className={`flex-1 py-1.5 rounded font-semibold text-white text-sm transition ${item.stock === 'In stock'
                                                            ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                                                            : 'bg-gray-400 cursor-not-allowed'
                                                        }`}
                                                    disabled={item.stock !== 'In stock'}
                                                >
                                                    Add to Checkout
                                                </button>
                                                <button
                                                    className="flex-1 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold text-sm"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden lg:block overflow-x-auto shadow-lg rounded-lg">
                                <table className="w-full min-w-[700px] text-left border border-gray-200">
                                    <thead className="bg-[var(--accent)] text-[var(--text-main)]">
                                        <tr>
                                            <th className="py-3 px-6">Product</th>
                                            <th className="py-3 px-6">Price</th>
                                            <th className="py-3 px-6">Quantity</th>
                                            <th className="py-3 px-6">Stock</th>
                                            <th className="py-3 px-6">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index) => (
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
                                                            {item.flavor} | {item.weight}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 font-medium">₹{item.price.toFixed(2)}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-24">
                                                        <button
                                                            onClick={() =>
                                                                handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                                                            }
                                                            className="px-2 py-1 text-gray-700"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (!isNaN(val) && val > 0) handleQuantityChange(item.id, val);
                                                            }}
                                                            className="w-full text-center px-2 py-1 focus:outline-none"
                                                        />
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="px-2 py-1 text-gray-700"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td
                                                    className={`py-4 px-6 font-medium ${item.stock === 'In stock' ? 'text-green-600' : 'text-red-600'
                                                        }`}
                                                >
                                                    {item.stock}
                                                </td>
                                                <td className="py-4 px-6 flex gap-2">
                                                    <button
                                                        className={`px-4 py-1.5 rounded text-white text-sm font-semibold transition ${item.stock === 'In stock'
                                                                ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                                                                : 'bg-gray-400 cursor-not-allowed'
                                                            }`}
                                                        disabled={item.stock !== 'In stock'}
                                                    >
                                                        Add to Checkout
                                                    </button>
                                                    <button
                                                        className="px-4 py-1.5 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold text-sm"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Clear Cart button below table */}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleClearCart}
                                        className="px-4 py-2 text-[var(--text-main)] underline hover:text-[var(--primary)] font-semibold"
                                    >
                                        Clear Shopping Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="w-full lg:w-[320px] bg-[var(--bg-card)] p-3 rounded-lg shadow flex flex-col gap-2 self-start">
                            <h2 className="text-[25px] font-bold text-[var(--text-main)] mb-2">Order Summary</h2>
                            <div className="border-t border-gray-300 "></div> {/* Divider */}

                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Items</span>
                                <span>{cart.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Sub Total</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Shipping</span>
                                <span>₹{shipping.toFixed(2)}</span>
                            </div>

                            <div className="border-t border-gray-300 my-2"></div> {/* Divider */}
                            <div className="flex justify-between font-bold text-[var(--text-main)] text-lg">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={
                                    isProcessing || cart.filter((item) => item.stock === 'In stock').length === 0
                                }
                                className={`w-full py-1.5 rounded font-semibold transition text-white text- ${isProcessing
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[var(--primary)] hover:bg-[var(--secondary)]'
                                    }`}
                            >
                                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Toast */}
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

export default CartPage;
