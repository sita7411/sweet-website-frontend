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
];

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const index = tabs.findIndex((t) => t.name === prev.name);
        return tabs[(index + 1) % tabs.length];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-[var(--bg-main)] flex flex-col lg:flex-row items-center px-6 sm:px-10 lg:px-20 overflow-hidden relative">

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-[480px] relative text-center lg:text-left"
      >
        {/* FLOAT LEFT (hide on mobile) */}
        {active.floatLeft && (
          <motion.img
            src={active.floatLeft}
            className="hidden lg:block absolute -top-36 -left-64 w-72 z-20"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-tight text-[var(--text-main)]">
          Crafted With Care, <br className="hidden sm:block" />
          Chikki You Truly Love
        </h1>

        <p className="mt-5 text-sm sm:text-[15px] leading-relaxed text-[var(--text-muted)] max-w-xl mx-auto lg:mx-0">
          Experience the authentic taste of handcrafted chikki made with premium
          nuts, seeds, and natural jaggery. A perfect balance of tradition,
          purity, and delightful flavors.
        </p>

        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--accent)] text-[var(--secondary)] px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Explore Our Chikki
          </motion.button>
        </div>
      </motion.div>

      {/* CENTER + RIGHT */}
      <div className="w-full lg:ml-auto flex flex-col lg:flex-row items-center mt-16 lg:mt-0">

        {/* CENTER IMAGE */}
        <div className="relative w-[300px] sm:w-[380px] lg:w-[460px] h-[300px] sm:h-[380px] lg:h-[460px] flex items-center justify-center">

          <div className="absolute inset-0 rounded-full bg-[var(--bg-soft)] opacity-70" />
          <div className="absolute w-[75%] h-[75%] rounded-full border border-[var(--accent)] opacity-60" />
          <div className="absolute w-[65%] h-[65%] rounded-full border border-[var(--accent)] opacity-40" />

          <div className="relative w-[55%] h-[55%] rounded-full bg-white shadow-xl z-10 flex items-center justify-center">
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

          {/* FLOAT TOP */}
          {active.floatTop && (
            <motion.img
              src={active.floatTop}
              className="hidden sm:block absolute -top-8 right-12 w-28 lg:w-40 z-30"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />
          )}
        </div>

        {/* RIGHT TABS */}
        <div className="flex lg:flex-col gap-4 mt-8 lg:mt-0 lg:-ml-8 z-30 overflow-x-auto lg:overflow-visible px-2">
          {tabs.map((tab) => {
            const isActive = active.name === tab.name;

            return (
              <motion.button
                key={tab.name}
                onClick={() => setActive(tab)}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-3 min-w-[160px] px-3 py-2 rounded-full transition
                  ${isActive
                    ? 'bg-[var(--bg-soft)] ring-1 ring-[var(--accent)] shadow-md'
                    : 'bg-white shadow'}
                `}
              >
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
                  <img src={tab.icon} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-sm font-semibold text-[var(--text-main)]">
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
