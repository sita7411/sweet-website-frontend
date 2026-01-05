'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const products = [
    { title: 'Pista Chocolate Chikki', desc: 'Chocolate & Peanut Blend', price: 250, img: 'pista.png', hoverImg: 'choclate.png', tag: 'Bestseller' },
    { title: 'Strawberry Delight', desc: 'Fruity Crunch Chikki', price: 350, img: 'stwabarry_chikki.png', hoverImg: 'mango_chikki.png', tag: 'Special' },
    { title: 'Mango Fusion', desc: 'Seasonal Mango Flavor', price: 179, img: 'mango_chikki.png', hoverImg: 'pista.png', tag: 'Limited' },
    { title: 'Chocolate Crunch', desc: 'Rich Cocoa Coated', price: 199, img: 'choclate.png', hoverImg: 'kalakand.png', tag: 'Trending' },
];

export default function BestSellersEcommerce() {
    const [wishlist, setWishlist] = useState({});
    const [qty, setQty] = useState({});

    return (
        <section className="py-10">
            <div className="max-w-6xl mx-auto px-4">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-[40px] font-extrabold text-[var(--text-main)]">
                        Top Picks for You
                    </h2>
                    <p className="mt-3 text-[15px] text-[var(--text-muted)]">
                        Handpicked chikkis and treats our customers love the most.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="
                                rounded-3xl p-5
                                relative group
                                shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                                hover:shadow-[0_25px_60px_rgba(198,59,47,0.12)]
                            "
                        >
                            {/* Tag */}
                            <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[11px] px-3 py-1 rounded-full z-10">
                                {item.tag}
                            </span>

                            {/* Wishlist */}
                            <button
                                onClick={() => setWishlist(p => ({ ...p, [i]: !p[i] }))}
                                className={`
                                    absolute top-4 right-4 w-9 h-9 rounded-full
                                    flex items-center justify-center z-10
                                    transition-all duration-300
                                    shadow-[0_8px_18px_rgba(0,0,0,0.18)]
                                    ring-1 ring-black/10
                                    ${wishlist[i]
                                        ? 'bg-[var(--accent)] text-white shadow-[0_10px_25px_rgba(198,59,47,0.45)]'
                                        : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'
                                    }
                                `}
                            >
                                <HeartIcon className="w-4 h-4" />
                            </button>

                            {/* Image */}
                            <div className="relative h-44 mb-4 flex items-center justify-center overflow-hidden">
                                <motion.img
                                    src={item.img}
                                    className="absolute inset-0 w-full h-full object-contain group-hover:opacity-0"
                                />
                                <motion.img
                                    src={item.hoverImg}
                                    className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100"
                                />
                            </div>

                            {/* Info */}
                            <h3 className="text-sm font-semibold text-[var(--text-main)]">
                                {item.title}
                            </h3>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                                {item.desc}
                            </p>

                            {/* Price */}
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-lg font-bold text-[var(--secondary)]">
                                    ₹{item.price}
                                </p>

                                {!qty[i] ? (
                                    <button
                                        onClick={() => setQty(p => ({ ...p, [i]: 1 }))}
                                        className="
                                            flex items-center gap-2
                                            px-5 py-2 rounded-full
                                            text-xs font-semibold
                                            bg-[var(--bg-soft)]
                                            text-[var(--primary)]
                                            hover:bg-[var(--bg-main)]
                                            transition
                                        "
                                    >
                                        <ShoppingCartIcon className="w-4 h-4" />
                                        Add
                                    </button>
                                ) : (
                                    <div className="
                                        flex items-center gap-3
                                        bg-[var(--bg-main)]
                                        px-4 py-1.5
                                        rounded-full
                                        shadow-inner
                                    ">
                                        <button
                                            onClick={() => setQty(p => {
                                                const val = p[i] - 1;
                                                if (val <= 0) {
                                                    const copy = { ...p };
                                                    delete copy[i];
                                                    return copy;
                                                }
                                                return { ...p, [i]: val };
                                            })}
                                            className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                                        >
                                            −
                                        </button>

                                        <span className="text-sm font-semibold text-[var(--text-main)]">
                                            {qty[i]}
                                        </span>

                                        <button
                                            onClick={() => setQty(p => ({ ...p, [i]: p[i] + 1 }))}
                                            className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                
            </div>
        </section>
    );
}
