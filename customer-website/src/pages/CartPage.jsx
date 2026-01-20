// CartPage.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from "../context/ShopContext";
import Features from "../components/Features/Features";
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CartPage = () => {
    const {
        cartItems,
        setCartItems,
        removeFromCart,
        updateQty,
        clearCart,
        fetchCart,
    } = useShop();

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // ────────────────────────────────────────────────
    // Handlers (no toasts)
    // ────────────────────────────────────────────────
    const handleQuantityChange = (productId, weight, value) => {
        const newQty = parseInt(value, 10);
        if (isNaN(newQty) || newQty < 1) {
            handleRemoveItem(productId, weight);
        } else {
            updateQty(productId, weight, newQty);
        }
    };

    const handleRemoveItem = async (productId, weight) => {
        try {
            await removeFromCart(productId, weight);
            // No toast
        } catch (error) {
            console.error("Remove failed:", error);
            fetchCart();
        }
    };

    const handleClearCart = async () => {
        if (window.confirm("Are you sure you want to clear the entire cart?")) {
            try {
                await clearCart();
                setCartItems([]);
                // No toast
            } catch (error) {
                console.error("Clear cart failed:", error);
                fetchCart(); // recover
            }
        }
    };

    const handleCheckout = () => {
        const inStockItems = cartItems.filter(item => item.stockStatus === 'In stock');

        if (inStockItems.length === 0) {
            return;
        }

        navigate('/checkout', { state: { cart: inStockItems } });
    };

    // ────────────────────────────────────────────────
    // Calculations – NO TAX
    // ────────────────────────────────────────────────
    const subtotal = cartItems.reduce((acc, item) => {
        if (item.stockStatus === 'In stock') {
            return acc + (item.price || item.sellingPrice || 0) * (item.qty || 1);
        }
        return acc;
    }, 0);

    const shipping = cartItems.reduce((acc, item) => {
        if (item.stockStatus === 'In stock') {
            return acc + (item.shippingCharge || 0);
        }
        return acc;
    }, 0);

    const total = subtotal + shipping;

    const formatPrice = (num) =>
        '₹' + (num || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 });

    // ──────────────
    // RENDER
    // ──────────────
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
                        <Link to="/" className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200">
                            Home
                        </Link>
                        <span className="font-bold">\\</span>
                        <Link to="/shop" className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200">
                            Products
                        </Link>
                        <span className="font-bold">\\</span>
                        <span className="font-semibold">Cart</span>
                    </motion.div>
                </div>
            </section>

            {/* Cart Content */}
            <div className="container mx-auto mt-10 mb-24 px-4 md:px-10">
                {cartItems.length === 0 ? (
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
                            to="/shop"
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
                            <div className="block lg:hidden space-y-5">
                                {cartItems.map((item, index) => (
                                    <motion.div
                                        key={`${item.productId}-${item.weight}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[var(--bg-card)] shadow-md rounded-lg p-4 border border-gray-200"
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={item.image || '/images/placeholder.jpg'}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                                <p className="text-sm text-[var(--text-muted)]">
                                                    {item.shortDescription || '—'} | {item.weight}
                                                </p>
                                                <p className="font-bold text-lg mt-2">
                                                    {formatPrice(item.price || item.sellingPrice)}
                                                </p>
                                                <p
                                                    className={`font-medium mt-1 ${item.stockStatus === 'In stock' ? 'text-green-600' : 'text-red-600'}`}
                                                >
                                                    {item.stockStatus || 'Unknown'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Quantity:</span>
                                                <div className="flex items-center border border-gray-300 rounded-md w-28">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.productId, item.weight, item.qty - 1)}
                                                        className="px-3 py-1 text-gray-700"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.qty || 1}
                                                        onChange={(e) => handleQuantityChange(item.productId, item.weight, e.target.value)}
                                                        className="w-12 text-center py-1 focus:outline-none"
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(item.productId, item.weight, item.qty + 1)}
                                                        className="px-3 py-1 text-gray-700"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleRemoveItem(item.productId, item.weight)}
                                                    className="flex-1 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold text-sm"
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
                                        {cartItems.map((item, index) => (
                                            <motion.tr
                                                key={`${item.productId}-${item.weight}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="border-b border-gray-200 hover:bg-[var(--bg-soft)] transition"
                                            >
                                                <td className="py-4 px-6 flex items-center gap-4">
                                                    <img
                                                        src={item.image || '/images/placeholder.jpg'}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded shadow-sm"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{item.name}</p>
                                                        <p className="text-sm text-[var(--text-muted)]">
                                                            {item.shortDescription || '—'} | {item.weight}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 font-medium">
                                                    {formatPrice(item.price || item.sellingPrice)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-24">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.productId, item.weight, item.qty - 1)}
                                                            className="px-2 py-1 text-gray-700"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={item.qty || 1}
                                                            onChange={(e) => handleQuantityChange(item.productId, item.weight, e.target.value)}
                                                            className="w-full text-center px-2 py-1 focus:outline-none"
                                                        />
                                                        <button
                                                            onClick={() => handleQuantityChange(item.productId, item.weight, item.qty + 1)}
                                                            className="px-2 py-1 text-gray-700"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td
                                                    className={`py-4 px-6 font-medium ${item.stockStatus === 'In stock' ? 'text-green-600' : 'text-red-600'}`}
                                                >
                                                    {item.stockStatus || 'Unknown'}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <button
                                                        onClick={() => handleRemoveItem(item.productId, item.weight)}
                                                        className="px-4 py-1.5 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>

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
                            <div className="border-t border-gray-300"></div>

                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Items</span>
                                <span>{cartItems.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Sub Total</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--text-muted)]">Shipping</span>
                                <span>{formatPrice(shipping)}</span>
                            </div>

                            <div className="border-t border-gray-300 my-2"></div>
                            <div className="flex justify-between font-bold text-[var(--text-main)] text-lg">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={cartItems.filter(item => item.stockStatus === 'In stock').length === 0}
                                className={`w-full py-3 rounded font-semibold transition text-white text-[18px] mt-4 ${cartItems.filter(item => item.stockStatus === 'In stock').length === 0
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[var(--primary)] hover:bg-[var(--secondary)]'
                                    }`}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
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

export default CartPage;