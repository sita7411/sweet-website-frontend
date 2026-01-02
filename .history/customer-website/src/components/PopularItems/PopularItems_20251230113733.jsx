'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    HeartIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/solid';

const items = [
    {
        title: 'Classic Nut Chikki',
        subtitle: 'Jaggery & Peanut Blend',
        price: '₹199',
        rating: '5.0',
        img: 'pista.png',
    },
    {
        title: 'Strawberry Delight',
        subtitle: 'Fruity Crunch Chikki',
        price: '₹149',
        rating: '5.0',
        img: 'stwabarry_chikki.png',
    },
    {
        title: 'Mango Fusion',
        subtitle: 'Seasonal Mango Flavor',
        price: '₹179',
        rating: '5.0',
        img: 'mango_chikki.png',
    },
    {
        title: 'Chocolate Crunch',
        subtitle: 'Rich Cocoa Coated',
        price: '₹199',
        rating: '5.0',
        img: 'choclate.png',
    },
    {
        title: 'SP Dana GUD lADU',
        subtitle: 'Rich Cocoa Coated',
        price: '₹280',
        rating: '5.0',
        img: 'dana_ladu.png',
    },
      {
        title: 'Pineapple Chocolate Chikki',
        subtitle: 'Rich Cocoa Coated',
        price: '₹0',
        rating: '5.0',
        img: 'mango_chikki.png',
    },
];

export default function PopularItems() {
    const [index, setIndex] = useState(0);
    const [addedItems, setAddedItems] = useState({}); // Track added state
    const [wishlistItems, setWishlistItems] = useState({});

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    const handleAddToCart = (i) => {
        setAddedItems((prev) => ({ ...prev, [i]: true }));
    };
    const handleWishlist = (i) => {
        setWishlistItems((prev) => ({ ...prev, [i]: !prev[i] }));
    };


    return (
        <section className="py-22">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-[42px] font-extrabold text-[var(--text-main)]">
                        Our Popular Picks
                    </h2>
                    <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
                        Handcrafted chikki made with premium ingredients, loved for its
                        authentic taste and perfect crunch.
                    </p>
                </motion.div>

                {/* Cards Container */}
                <div
                    className="relative rounded-[60px] px-17 py-18 bg-cover bg-center bg-no-repeat flex items-center justify-center"
                    style={{ backgroundImage: "url('Group 57.png')" }}
                >
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 w-19 h-19 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
                    >
                        <ChevronLeftIcon className="w-8 h-8 text-[var(--text-main)]" />
                    </button>

                    {/* 4 Cards */}
                    <div className="grid grid-cols-4 gap-10 mt-9">
                        {items
                            .slice(index, index + 4)
                            .concat(index + 4 > items.length ? items.slice(0, (index + 4) - items.length) : [])
                            .map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    viewport={{ once: true }}
                                    className="
                    relative bg-white rounded-[28px]
                    px-6 pt-28 pb-7
                    shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                  "
                                >
                                    {/* Image */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 4 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                        className="
                      absolute -top-14 left-1/2 -translate-x-1/2
                      w-25 h-25 bg-[var(--bg-card)]
                      rounded-full shadow-md
                      flex items-center justify-center
                    "
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-[15px] -mt-12 font-semibold text-[var(--text-main)]">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">
                                        {item.subtitle}
                                    </p>

                                    {/* Price + Wishlist */}
                                    <div className="flex items-center justify-between mt-3">
                                        <p className="text-[22px] font-bold text-[var(--secondary)]">
                                            {item.price}
                                        </p>

                                        <motion.button
                                            onClick={() => handleWishlist(i)}
                                            whileHover={{ scale: 1.15 }}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition ${wishlistItems[i] ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-card)] text-[var(--primary)]'
                                                }`}
                                        >
                                            <HeartIcon className="w-4 h-4" />
                                        </motion.button>

                                    </div>

                                    {/* Add to Cart */}
                                    <div className="flex items-center justify-between mt-4 -ml-2 gap-3">
                                        <motion.button
                                            onClick={() => handleAddToCart(i)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`
      flex items-center gap-2
      text-xs px-5 py-1.5 rounded-full font-semibold shadow
      transition
      ${addedItems[i]
                                                    ? 'bg-[var(--accent)] text-white' // Filled accent when added
                                                    : 'bg-[var(--bg-soft)] text-[var(--primary)] hover:brightness-105'} // Default state
    `}
                                        >
                                            <ShoppingCartIcon className="w-4 h-4" />
                                            {addedItems[i] ? 'Added' : 'Add to Cart'}
                                        </motion.button>

                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-[var(--text-muted)]">
                                                ★ {item.rating}
                                            </span>
                                        </div>
                                    </div>


                                </motion.div>
                            ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 w-19 h-19 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
                    >
                        <ChevronRightIcon className="w-8 h-8 text-[var(--text-main)]" />
                    </button>
                </div>
            </div>
        </section>
    );
}
