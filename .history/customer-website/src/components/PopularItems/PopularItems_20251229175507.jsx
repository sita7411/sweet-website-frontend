'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const popularItems = [
    {
        name: 'Classic Chikki',
        img: 'pista.png',
        desc: 'Crunchy peanut & jaggery delight',
        price: '₹199',
        floatTop: 'pista_icon.png',
        floatLeft: 'nuts.png',
    },
    {
        name: 'Strawberry Chikki',
        img: 'stwabarry_chikki.png',
        desc: 'Fruity strawberry crunch',
        price: '₹249',
        floatTop: 'strawberry.png',
        floatLeft: 'nuts.png',
    },
    {
        name: 'Mango Chikki',
        img: 'mango_chikki.png',
        desc: 'Sweet mango infused chikki',
        price: '₹229',
        floatTop: 'mango.png',
        floatLeft: 'nuts.png',
    },
    {
        name: 'Chocolate Chikki',
        img: 'choclate.png',
        desc: 'Rich chocolate coated goodness',
        price: '₹299',
        floatTop: 'choco.png',
        floatLeft: 'nuts.png',
    },
];

export default function PopularItems() {
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (itemName) => {
        setWishlist(prev =>
            prev.includes(itemName)
                ? prev.filter(name => name !== itemName)
                : [...prev, itemName]
        );
    };

    return (
        <section className="py-20 relative overflow-hidden ">
            {/* Section Title */}
            <div className="max-w-7xl mx-auto px-8 text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-16">
                    Popular Chikkis
                </h2>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {popularItems.map((item) => (
                        <motion.div
                            key={item.name}
                            className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 relative flex flex-col items-center hover:shadow-2xl transition-all duration-300"
                            whileHover={{ scale: 1.06 }}
                        >
                            {/* Floating Top Image */}
                            {item.floatTop && (
                                <motion.img
                                    src={item.floatTop}
                                    className="absolute -top-6 right-5 w-12 z-20"
                                    animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                />
                            )}

                            {/* Floating Left Image */}
                            {item.floatLeft && (
                                <motion.img
                                    src={item.floatLeft}
                                    className="absolute -left-6 top-10 w-10 z-10"
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                />
                            )}

                            {/* Product Image */}
                            <div className="w-32 h-32 mb-4 relative z-30">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-full shadow-md"
                                />
                            </div>

                            {/* Product Info */}
                            <h3 className="text-lg font-semibold text-gray-800 mt-2">{item.name}</h3>
                            <p className="text-gray-500 text-sm mt-1 text-center">{item.desc}</p>
                            <span className="text-yellow-600 font-bold text-lg mt-2">{item.price}</span>

                            {/* Action Buttons */}
                            {/* Action Buttons */}
<div className="mt-4 flex gap-3">
  {/* Add to Cart */}
  <button
    className="relative px-6 py-2 rounded-full font-semibold text-white shadow-lg
               bg-[var(--primary)] hover:bg-[var(--secondary)] 
               transition duration-300
               after:content-[''] after:absolute after:inset-0 after:rounded-full after:shadow-[0_8px_15px_rgba(198,59,47,0.3)] 
               active:scale-95 active:shadow-sm"
  >
    Add to Cart
  </button>

  {/* Wishlist Button */}
  <button
    onClick={() => toggleWishlist(item.name)}
    className="relative flex items-center justify-center w-12 h-12 bg-[var(--bg-card)] 
               border border-[var(--accent)] rounded-full shadow-md 
               hover:bg-[var(--accent)] hover:text-white transition duration-300 
               active:scale-95"
  >
    {wishlist.includes(item.name) ? (
      <HeartSolid className="w-6 h-6 text-red-500" />
    ) : (
      <HeartOutline className="w-6 h-6 text-[var(--accent)]" />
    )}
  </button>
</div>

                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Subtle Animated Background Circles */}
            <motion.div
                className="absolute top-0 left-0 w-72 h-72 bg-yellow-100 rounded-full opacity-30 -z-10"
                animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-64 h-64 bg-pink-100 rounded-full opacity-30 -z-10"
                animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            />
        </section>
    );
}
