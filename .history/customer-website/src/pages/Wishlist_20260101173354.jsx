// Wishlist.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialWishlist = [
    { id: 1, title: 'Pista Chocolate Chikki', color: 'Chocolate & Peanut Blend', size: '250g', price: 12.0, date: '18 January 2026', stock: 'In stock', img: '/images/pista.png' },
    { id: 2, title: 'Cashew Chikki', color: 'Cashew & Jaggery', size: '200g', price: 15.0, date: '15 January 2026', stock: 'In stock', img: '/images/cashew.png' },
    { id: 3, title: 'Almond Chikki', color: 'Almond & Jaggery', size: '300g', price: 18.0, date: '12 January 2026', stock: 'Out of stock', img: '/images/almond.png' },
];

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(initialWishlist);
    const [quantities, setQuantities] = useState(initialWishlist.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));

    const handleAddToCart = (item) => {
        item.stock === 'In stock' ? toast.success(`${item.title} added to cart!`) : toast.error(`${item.title} is out of stock!`);
    };

    const handleAddAllToCart = () => {
        const inStock = wishlist.filter(item => item.stock === 'In stock');
        inStock.length > 0 ? toast.success('All in-stock items added!') : toast.warn('No items in stock!');
    };

    const handleClearWishlist = () => {
        setWishlist([]);
        toast.info('Wishlist cleared!');
    };

    const handleRemoveItem = (id) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
        toast.info('Item removed!');
    };

    const handleQuantityChange = (id, value) => {
        if (value < 1) value = 1;
        setQuantities(prev => ({ ...prev, [id]: value }));
    };

    const totalPrice = wishlist.reduce((acc, item) => item.stock === 'In stock' ? acc + item.price * (quantities[item.id] || 1) : acc, 0);

    return (
        <div className="min-h-screen bg-[var(--bg-main)]">
            {/* Banner */}
            <div className="relative">
                <img src="login.png" alt="Wishlist Banner" className="w-full h-52 md:h-64 lg:h-72 object-cover brightness-75" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Wishlist</h1>
                    <p className="mt-1 md:mt-2 text-sm md:text-base">Home / <span className="font-semibold">Wishlist</span></p>
                </div>
            </div>

            {/* Wishlist Table */}
            <div className="container mx-auto mt-8 md:mt-12 mb-12 px-4 sm:px-6 lg:px-10">
                {wishlist.length === 0 ? (
                    <div className="text-center py-10 text-[var(--text-muted)] font-semibold text-lg">
                        Your wishlist is empty 😔
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto shadow-lg rounded-lg">
                            <table className="w-full min-w-[600px] md:min-w-[700px] text-left border border-gray-200">
                                <thead className="bg-[var(--accent)] text-[var(--text-main)]">
                                    <tr>
                                        <th className="py-2 px-4 sm:py-3 sm:px-6">Product</th>
                                        <th className="py-2 px-4 sm:py-3 sm:px-6">Price</th>
                                        <th className="py-2 px-4 sm:py-3 sm:px-6">Quantity</th>
                                        <th className="py-2 px-4 sm:py-3 sm:px-6">Date Added</th>
                                        <th className="py-2 px-4 sm:py-3 sm:px-6">Stock</th>
                                        <th className="py-2 px-4 sm:py-3 sm:px-6">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlist.map((item, index) => (
                                        <motion.tr key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="border-b border-gray-200 hover:bg-[var(--bg-soft)] transition">
                                            <td className="py-2 px-4 sm:py-4 sm:px-6 flex items-center gap-2 sm:gap-4">
                                                <img src={item.img} alt={item.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded shadow-sm" />
                                                <div>
                                                    <p className="font-semibold text-sm sm:text-base">{item.title}</p>
                                                    <p className="text-xs sm:text-sm text-[var(--text-muted)]">{item.color} | {item.size}</p>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 sm:py-4 sm:px-6 font-medium text-sm sm:text-base">${item.price.toFixed(2)}</td>
                                            <td className="py-2 px-4 sm:py-4 sm:px-6">
                                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-20 sm:w-24">
                                                    <button onClick={() => handleQuantityChange(item.id, Math.max(1, (quantities[item.id] || 1) - 1))} className="px-1 sm:px-2 py-1 text-gray-700">-</button>
                                                    <input type="text" value={quantities[item.id]} onChange={(e) => { const val = parseInt(e.target.value); if (!isNaN(val) && val > 0) handleQuantityChange(item.id, val); }} className="w-full text-center px-1 sm:px-2 py-1 focus:outline-none text-sm sm:text-base" />
                                                    <button onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 1) + 1)} className="px-1 sm:px-2 py-1 text-gray-700">+</button>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 sm:py-4 sm:px-6 text-sm sm:text-base">{item.date}</td>
                                            <td className={`py-2 px-4 sm:py-4 sm:px-6 font-medium text-sm sm:text-base ${item.stock === 'In stock' ? 'text-green-600' : 'text-red-600'}`}>{item.stock}</td>
                                            <td className="py-2 px-4 sm:py-4 sm:px-6">
                                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center min-h-[70px]">
                                                    <button className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-white font-semibold transition ${item.stock === 'In stock' ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]' : 'bg-gray-400 cursor-not-allowed'}`} disabled={item.stock !== 'In stock'} onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-semibold" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total Price */}
                        <div className="mt-4 md:mt-6 flex justify-end">
                            <div className="bg-[var(--secondary)] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md font-semibold text-base sm:text-lg min-w-[160px] sm:min-w-[200px] text-center">Total: ${totalPrice.toFixed(2)}</div>
                        </div>

                        {/* Wishlist Actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 md:mt-6 gap-3 sm:gap-4">
                            <div className="flex gap-2 items-center w-full sm:w-auto">
                                <input type="text" readOnly value="https://www.chikkistore.com/wishlist" className="border border-gray-300 px-3 py-2 rounded w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] text-sm sm:text-base" />
                                <button className="bg-[var(--secondary)] text-white px-3 sm:px-4 py-2 rounded hover:bg-[var(--primary)] transition font-semibold text-sm sm:text-base" onClick={() => { navigator.clipboard.writeText('https://www.chikkistore.com/wishlist'); toast.success('Wishlist link copied!'); }}>Copy</button>
                            </div>
                            <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <button className="text-[var(--text-main)] underline hover:text-[var(--primary)] transition font-semibold text-sm sm:text-base" onClick={handleClearWishlist} disabled={wishlist.length === 0}>Clear Wishlist</button>
                                <button className={`px-3 sm:px-4 py-2 rounded font-semibold text-white transition text-sm sm:text-base ${wishlist.filter(item => item.stock === 'In stock').length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[var(--secondary)] hover:bg-[var(--primary)]'}`} onClick={handleAddAllToCart} disabled={wishlist.filter(item => item.stock === 'In stock').length === 0}>Add All to Cart</button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Toast */}
            <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover transition={Slide} toastStyle={{ background: 'var(--bg-soft)', color: 'var(--secondary)', fontWeight: 600, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '14px 20px' }} />
        </div>
    );
};

export default Wishlist;
