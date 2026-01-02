'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    name: 'Classic',
    img: 'pista.png',
    icon: 'pista.png',
    floatTop: 'pista_icon.png',
    floatLeft: 'pista_icon.png',
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
    floatLeft: 'mango.png',
    desc: 'Sweet mango infused chikki',
  },
  {
    name: 'Chocolate',
    img: 'choclate.png',
    icon: 'choclate.png',
    floatTop: '/images/float-choco.png',
    floatBottom: '/images/float-nuts.png',
    floatLeft: '/images/float-choco.png',
    desc: 'Rich chocolate coated goodness',
  },
  {
    name: 'Mixed',
    img: '/images/chikki-mixed.png',
    icon: '/images/icon-mixed.png',
    floatTop: '/images/float-nuts.png',
    floatBottom: '/images/float-nuts.png',
    floatLeft: '/images/float-nuts.png',
    desc: 'Premium mix of nuts & seeds',
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[0]);

  // Auto-cycle tabs every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = tabs.findIndex((t) => t.name === active.name);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActive(tabs[nextIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <section className="min-h-[90vh] sm:min-h-[80vh] bg-[#FFF9F1] flex flex-col items-center justify-center px-6 sm:px-10 relative overflow-hidden">

      {/* MAIN CONTENT */}
      <div className="text-center max-w-md sm:max-w-lg">
        <h1 className="text-[40px] sm:text-[44px] font-extrabold text-gray-900 leading-tight">
          We Serve The Chikki <br /> You Love
        </h1>
        <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base leading-relaxed">
          Discover delicious varieties of chikki made from nuts, seeds, and jaggery.
          We bring you the best traditional and innovative chikki flavors to enjoy.
        </p>

        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <button className="bg-[#FBC02D] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow hover:brightness-105 transition">
            Explore Chikki
          </button>

          <div className="flex items-center gap-2 bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-xs sm:text-sm text-gray-600 w-20 sm:w-28"
            />
          </div>
        </div>
      </div>

      {/* MAIN CIRCLE + FLOATING ELEMENTS */}
      <div className="relative mt-12 sm:mt-16 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] flex items-center justify-center">

        {/* SOFT GLOW */}
        <div className="absolute inset-0 rounded-full bg-[#FFE9C9] opacity-60 animate-pulse" />

        {/* INNER RINGS */}
        <div className="absolute w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full border border-[#F5C36A] animate-spin-slow" />
        <div className="absolute w-[260px] sm:w-[370px] h-[260px] sm:h-[370px] rounded-full border border-[#F5C36A] opacity-70 animate-spin-slow-reverse" />

        {/* WHITE PLATE */}
        <div className="relative w-[220px] sm:w-[310px] h-[220px] sm:h-[310px] rounded-full bg-white shadow-[0_12px_50px_rgba(0,0,0,0.2)] z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={active.name}
              src={active.img}
              alt={active.name}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover rounded-full"
            />
          </AnimatePresence>
        </div>

        {/* FLOATING ELEMENTS */}
        {active.floatTop && (
          <motion.img
            src={active.floatTop}
            className="absolute -top-6 sm:-top-8 right-10 sm:right-14 w-16 sm:w-24 z-30"
            animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        )}
        {active.floatLeft && (
          <motion.img
            src={active.floatLeft}
            className="absolute -left-8 sm:-left-12 w-16 sm:w-24 z-20"
            animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        )}
        {active.floatBottom && (
          <motion.img
            src={active.floatBottom}
            className="absolute bottom-4 sm:bottom-6 left-16 sm:left-24 w-14 sm:w-20 z-20"
            animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        )}
      </div>

      {/* TABS BELOW MAIN CIRCLE */}
      <div className="mt-8 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
        {tabs.map((tab) => {
          const isActive = active.name === tab.name;
          return (
            <motion.button
              key={tab.name}
              onClick={() => setActive(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex flex-col items-center gap-1 sm:gap-2
                w-16 sm:w-20 h-20 sm:h-24 px-1 sm:px-2 py-1 rounded-full
                transition-all duration-300
                ${isActive
                  ? 'bg-[#FFE8EC] ring-2 ring-[#F3B3C2] shadow-md'
                  : 'bg-white shadow hover:shadow-md'
                }
              `}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white flex items-center justify-center shadow">
                <img src={tab.icon} className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-[9px] sm:text-xs font-semibold text-gray-800">{tab.name}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
