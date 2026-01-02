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
    desc: 'Sweet mango infused chikki',
  },
  {
    name: 'Chocolate',
    img: 'choclate.png',
    icon: 'choclate.png',
    floatTop: 'chockolate.png',
    desc: 'Rich chocolate coated goodness',
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const i = tabs.findIndex(t => t.name === prev.name);
        return tabs[(i + 1) % tabs.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#FFF9F1] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 flex items-center min-h-screen">

        {/* LEFT CONTENT */}
        <div className="max-w-xl relative z-10">

          {active.floatLeft && (
            <motion.img
              src={active.floatLeft}
              alt=""
              className="absolute -top-32 -left-48 w-64 opacity-70"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            We Serve The Chikki <br />
            <span className="text-[#FBC02D]">You Love</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Discover premium varieties of chikki crafted with nuts, seeds and jaggery.
            A perfect blend of tradition and innovation.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="bg-[#FBC02D] hover:bg-[#f5b800] text-gray-900 px-8 py-3 rounded-full font-semibold shadow-md transition">
              Explore Chikki
            </button>
            <button className="px-8 py-3 rounded-full border border-gray-300 font-medium text-gray-700 hover:bg-white transition">
              View Collection
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="ml-auto flex items-center gap-12 relative">

          {/* PRODUCT DISPLAY */}
          <div className="relative w-[420px] h-[420px] flex items-center justify-center">

            <div className="absolute inset-0 rounded-full bg-[#FFE9C9] opacity-60" />
            <div className="absolute w-[360px] h-[360px] rounded-full border border-[#F5C36A]" />
            <div className="absolute w-[310px] h-[310px] rounded-full border border-[#F5C36A] opacity-60" />

            <div className="relative w-[260px] h-[260px] rounded-full bg-white shadow-2xl flex items-center justify-center z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.name}
                  src={active.img}
                  alt={active.name}
                  className="w-full h-full object-cover rounded-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>

            {active.floatTop && (
              <motion.img
                src={active.floatTop}
                alt=""
                className="absolute -top-6 right-12 w-32"
                animate={{ y: [0, -15, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* FLAVOR TABS */}
          <div className="flex flex-col gap-4">
            {tabs.map(tab => {
              const isActive = tab.name === active.name;
              return (
                <motion.button
                  key={tab.name}
                  onClick={() => setActive(tab)}
                  whileHover={{ x: -6 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-4 w-[190px] px-3 py-2 rounded-full transition
                    ${isActive
                      ? 'bg-[#FFE8EC] ring-1 ring-[#F3B3C2] shadow'
                      : 'bg-white shadow-sm hover:shadow-md'
                    }`}
                >
                  <div className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center">
                    <img src={tab.icon} alt={tab.name} className="w-full h-full rounded-full object-cover" />
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{tab.name}</p>
                    <p className="text-xs text-gray-500">{tab.desc}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
