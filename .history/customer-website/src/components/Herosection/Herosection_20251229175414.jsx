'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    {
        name: 'Classic',
        img: 'pista.png',
        icon: 'pista.png',
        floatTop: 'pista_icon.png',
        floatLeft: 'nuts.png', 
        desc: 'Traditional jaggery & peanut chikki',
    },
    {
        name: 'Strawberry',
        img: 'stwabarry_chikki.png',
        icon: 'stwabarry_chikki.png',
        floatTop: 'icon.png',
        floatLeft: 'nuts.png',
        desc: 'Fruity strawberry crunch delight',
    },
    {
        name: 'Mango',
        img: 'mango_chikki.png',
        icon: 'mango_chikki.png',
        floatTop: 'mango.png',
        floatBottom: '/images/float-nuts.png',
        floatLeft: 'nuts.png',
        desc: 'Sweet mango infused chikki',
    },
    {
        name: 'Chocolate',
        img: 'choclate.png',
        icon: 'choclate.png',
        floatTop: 'chockolate.png',
        floatBottom: '/images/float-nuts.png',
        floatLeft: 'nuts.png',
        desc: 'Rich chocolate coated goodness',
    },
    //    {
    //     name: 'Mango',
    //     img: 'mango_chikki.png',
    //     icon: 'mango_chikki.png',
    //     floatTop: 'mango.png',
    //     floatBottom: '/images/float-nuts.png',
    //     floatLeft: 'nuts.png',
    //     desc: 'Sweet mango infused chikki',
    // },
];

export default function HeroBanner() {
    const [active, setActive] = useState(tabs[0]);

    // Auto-switch tabs every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => {
                const currentIndex = tabs.findIndex(tab => tab.name === prev.name);
                const nextIndex = (currentIndex + 1) % tabs.length;
                return tabs[nextIndex];
            });
        }, 5000); // 5 seconds per tab

        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <section className="min-h-screen bg-[#FFF9F] flex items-center px-20 overflow-hidden relative">

            {/* LEFT CONTENT */}
            <div className="w-[480px] relative">

                {/* LEFT FLOATING IMAGE */}
                {active.floatLeft && (
                    <motion.img
                        src={active.floatLeft}
                        className="absolute -top-34 -left-64 w-70 z-20"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    />
                )}

                <h1 className="text-[44px] font-extrabold text-gray-900 leading-tight">
                    We Serve The Chikki <br /> You Love 
                </h1>

                <p className="mt-6 text-gray-600 text-base leading-relaxed">
                    Discover delicious varieties of chikki made from nuts, seeds, and jaggery.
                    We bring you the best traditional and innovative chikki flavors to enjoy.
                </p>

                {/* ACTIONS */}
                <div className="mt-10 flex items-center gap-4">
                    <button className="bg-[#FBC02D] px-8 py-3 rounded-full font-semibold shadow hover:brightness-105 transition">
                        Explore Chikki
                    </button>

                
                </div>
            </div>

            {/* CENTER + RIGHT */}
            <div className="ml-auto flex items-center -mr-18">

                {/* CENTER IMAGE */}
                <div className="relative w-[460px] h-[460px] flex items-center justify-center">

                    {/* OUTER SOFT GLOW */}
                    <div className="absolute inset-0 rounded-full bg-[#FFE9C9] opacity-60" />

                    {/* INNER RING 1 */}
                    <div className="absolute w-[380px] h-[380px] rounded-full border border-[#F5C36A]" />

                    {/* INNER RING 2 */}
                    <div className="absolute w-[330px] h-[330px] -ml-6 rounded-full border border-[#F5C36A] opacity-70" />

                    {/* WHITE ROUND (PLATE) */}
                    <div className="relative w-[290px] h-[290px] -ml-11 rounded-full bg-white shadow-[0_12px_40px_rgba(0,0,0,0.15)] z-10 flex items-center justify-center">

                        {/* MAIN IMAGE */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={active.name}
                                src={active.img}
                                alt={active.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </AnimatePresence>

                    </div>

                    {/* FLOATING TOP */}
                    {active.floatTop && (
                        <motion.img
                            src={active.floatTop}
                            className="absolute -top-8 right-14 w-39 z-34"
                            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        />
                    )}

                    {/* FLOATING BOTTOM */}
                    {active.floatBottom && (
                        <motion.img
                            src={active.floatBottom}
                            className="absolute bottom-10 left-24 w-20 z-20"
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                        />
                    )}

                </div>

                {/* RIGHT FLAVOR TABS */}
                <div className="flex flex-col gap-4 -ml-8 z-30">
                    {tabs.map((tab) => {
                        const isActive = active.name === tab.name;

                        return (
                            <motion.button
                                key={tab.name}
                                onClick={() => setActive(tab)}
                                className={`
                                    flex items-center gap-4 w-[180px] px-2 py-2 rounded-full
                                    transition-all duration-300
                                    ${isActive
                                        ? 'bg-[#FFE8EC] ring-1 ring-[#F3B3C2] shadow-md'
                                        : 'bg-white shadow hover:shadow-md'
                                    }
                                `}
                                whileHover={{ scale: 1.05, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                                    <img src={tab.icon} className="w-full h-full object-cover rounded-full" />
                                </div>

                                <span className="text-sm font-semibold text-gray-800">
                                    {tab.name}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
