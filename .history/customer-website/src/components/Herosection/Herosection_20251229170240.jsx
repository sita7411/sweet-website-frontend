'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    {
        name: 'Classic',
        img: 'pista.png',
        icon: 'pista.png',
        floatTop: 'pista_icon.png',
        desc: 'Traditional jaggery & peanut chikki',
    },
    {
        name: 'Strawberry',
        img: 'stwabarry_chikki.png',
        icon: 'stwabarry_chikki.png',
        floatTop: 'icon.png',
        desc: 'Fruity strawberry crunch delight',
    },
    {
        name: 'Mango',
        img: 'mango_chikki.png',
        icon: 'mango_chikki.png',
        floatTop: 'mango.png',
        floatBottom: '/images/float-nuts.png',
        desc: 'Sweet mango infused chikki',
    },
    {
        name: 'Chocolate',
        img: 'choclate.png',
        icon: 'choclate.png',
        floatTop: '/images/float-choco.png',
        floatBottom: '/images/float-nuts.png',
        desc: 'Rich chocolate coated goodness',
    },
    {
        name: 'Mixed',
        img: '/images/chikki-mixed.png',
        icon: '/images/icon-mixed.png',
        floatTop: '/images/float-nuts.png',
        floatBottom: '/images/float-nuts.png',
        desc: 'Premium mix of nuts & seeds',
    },
];

export default function HeroBanner() {
    const [active, setActive] = useState(tabs[0]);

    return (
        <section className="min-h-screen bg-[#FFF9F1] flex flex-col lg:flex-row items-center px-8 lg:px-20 overflow-hidden relative">

            {/* LEFT CONTENT */}
            <div className="relative w-full lg:w-[480px] mb-12 lg:mb-0">

                {/* FLOATING IMAGE ON LEFT */}
                {active.floatTop && (
                    <motion.img
                        src={active.floatTop}
                        className="absolute -top-10 left-0 w-24 lg:w-32 z-10"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    />
                )}

                <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-extrabold text-gray-900 leading-tight">
                    We Serve The Chikki <br /> You Love 😍
                </h1>

                <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                    Discover delicious varieties of chikki made from nuts, seeds, and jaggery.
                    We bring you the best traditional and innovative chikki flavors to enjoy.
                </p>

                {/* ACTIONS */}
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button className="bg-[#FBC02D] px-8 py-3 rounded-full font-semibold shadow hover:brightness-105 transition">
                        Explore Chikki
                    </button>

                    <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow w-full sm:w-auto">
                        <span className="text-gray-400 text-sm">🔍</span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-none text-sm text-gray-600 w-full sm:w-28"
                        />
                    </div>
                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full lg:w-auto">

                {/* CENTER IMAGE */}
                <div className="relative w-[300px] sm:w-[360px] lg:w-[460px] h-[300px] sm:h-[360px] lg:h-[460px] flex items-center justify-center">

                    {/* OUTER GLOW */}
                    <div className="absolute inset-0 rounded-full bg-[#FFE9C9] opacity-60" />

                    {/* INNER RINGS */}
                    <div className="absolute w-[80%] h-[80%] rounded-full border border-[#F5C36A]" />
                    <div className="absolute w-[70%] h-[70%] -ml-6 rounded-full border border-[#F5C36A] opacity-70" />

                    {/* WHITE PLATE */}
                    <div className="relative w-[290px] h-[290px] -ml-11 rounded-full bg-white shadow-[0_12px_40px_rgba(0,0,0,0.15)] z-10 flex items-center justify-center">
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

                    {/* FLOATING BOTTOM */}
                    {active.floatBottom && (
                        <motion.img
                            src={active.floatBottom}
                            className="absolute bottom-4 left-10 w-16 sm:w-20 z-20"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        />
                    )}
                </div>

                {/* RIGHT TABS */}
                <div className="flex flex-col gap-4">
                    {tabs.map((tab) => {
                        const isActive = active.name === tab.name;

                        return (
                            <button
                                key={tab.name}
                                onClick={() => setActive(tab)}
                                className={`
                                    flex items-center gap-4 w-[200px] px-4 py-3 rounded-full transition-all duration-300
                                    ${isActive
                                        ? 'bg-[#FFE8EC] ring-1 ring-[#F3B3C2] shadow-md'
                                        : 'bg-white shadow hover:shadow-md'
                                    }
                                `}
                            >
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                                    <img src={tab.icon} className="w-full h-full object-cover rounded-full" />
                                </div>

                                <span className="text-sm font-semibold text-gray-800">
                                    {tab.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}
