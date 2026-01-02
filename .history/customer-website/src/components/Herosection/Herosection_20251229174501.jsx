'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUTO_SWITCH_DELAY = 5000;

const tabs = [
  {
    name: 'Classic',
    img: '/images/chikki/classic.png',
    icon: '/images/icons/pista.png',
    floatTop: '/images/floats/pista_icon.png',
    floatLeft: '/images/floats/nuts.png',
    desc: 'Traditional jaggery & peanut chikki',
  },
  {
    name: 'Strawberry',
    img: '/images/chikki/strawberry.png',
    icon: '/images/icons/strawberry.png',
    floatTop: '/images/floats/strawberry.png',
    floatLeft: '/images/floats/nuts.png',
    desc: 'Fruity strawberry crunch delight',
  },
  {
    name: 'Mango',
    img: '/images/chikki/mango.png',
    icon: '/images/icons/mango.png',
    floatTop: '/images/floats/mango.png',
    floatBottom: '/images/floats/nuts.png',
    floatLeft: '/images/floats/nuts.png',
    desc: 'Sweet mango infused chikki',
  },
  {
    name: 'Chocolate',
    img: '/images/chikki/chocolate.png',
    icon: '/images/icons/chocolate.png',
    floatTop: '/images/floats/chocolate.png',
    floatBottom: '/images/floats/nuts.png',
    floatLeft: '/images/floats/nuts.png',
    desc: 'Rich chocolate coated goodness',
  },
];

const floatAnim = {
  animate: { y: [0, -12, 0] },
  transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
};

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const index = tabs.findIndex(t => t.name === prev.name);
        return tabs[(index + 1) % tabs.length];
      });
    }, AUTO_SWITCH_DELAY);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#FFF9F1] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT CONTENT */}
        <div className="max-w-lg relative">
          {active.floatLeft && (
            <motion.img
              src={active.floatLeft}
              alt=""
              className="absolute -top-24 -left-40 w-48 hidden lg:block"
              {...floatAnim}
            />
          )}

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            We Serve The Chikki <br /> You Love
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Discover delicious varieties of chikki crafted from premium nuts,
            seeds, and pure jaggery — a perfect blend of tradition & taste.
          </p>

          <button className="mt-10 inline-flex items-center justify-center rounded-full bg-[#FBC02D] px-8 py-3 font-semibold shadow-md hover:brightness-105 transition">
            Explore Chikki
          </button>
        </div>

        {/* CENTER IMAGE */}
        <div className="relative w-[340px] h-[340px] lg:w-[460px] lg:h-[460px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#FFE9C9] opacity-60" />
          <div className="absolute w-[80%] h-[80%] rounded-full border border-[#F5C36A]" />
          <div className="absolute w-[70%] h-[70%] rounded-full border border-[#F5C36A] opacity-70" />

          <div className="relative z-10 w-[60%] h-[60%] rounded-full bg-white shadow-xl flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.name}
                src={active.img}
                alt={active.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover rounded-full"
              />
            </AnimatePresence>
          </div>

          {active.floatTop && (
            <motion.img
              src={active.floatTop}
              alt=""
              className="absolute -top-6 right-12 w-24"
              animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />
          )}

          {active.floatBottom && (
            <motion.img
              src={active.floatBottom}
              alt=""
              className="absolute bottom-10 left-16 w-20"
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
            />
          )}
        </div>

        {/* RIGHT TABS */}
        <div className="flex lg:flex-col gap-4">
          {tabs.map(tab => {
            const isActive = tab.name === active.name;

            return (
              <motion.button
                key={tab.name}
                onClick={() => setActive(tab)}
                className={`flex items-center gap-3 px-4 py-2 rounded-full w-44
                  ${isActive
                    ? 'bg-[#FFE8EC] ring-1 ring-[#F3B3C2] shadow-md'
                    : 'bg-white shadow hover:shadow-md'}
                `}
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={tab.icon}
                  alt={tab.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
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
