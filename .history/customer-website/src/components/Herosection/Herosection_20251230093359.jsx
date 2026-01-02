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

  // Auto rotate tabs
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
    <section className="min-h-screen bg-[var(--bg-main)] flex items-center px-20 overflow-hidden relative">

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="w-[480px] relative"
      >
        {/* FLOAT LEFT */}
        {active.floatLeft && (
          <motion.img
            src={active.floatLeft}
            className="absolute -top-36 -left-64 w-72 z-20"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[46px] font-extrabold leading-tight text-[var(--text-main)]"
        >
          Crafted With Care, <br />
          Chikki You Truly Love
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="mt-6 text-[15px] leading-relaxed text-[var(--text-muted)]"
        >
          Experience the authentic taste of handcrafted chikki made with
          premium nuts, seeds, and natural jaggery. A perfect balance of
          tradition, purity, and delightful flavors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="
              bg-[var(--accent)]
              text-[var(--secondary)]
              px-9 py-3
              rounded-full
              font-semibold
              shadow-[0_12px_30px_rgba(0,0,0,0.18)]
              hover:brightness-105
              transition
            "
          >
            Explore Our Chikki
          </motion.button>
        </motion.div>
      </motion.div>

      {/* CENTER + RIGHT */}
      <div className="ml-auto flex items-center -mr-16">

        {/* CENTER IMAGE */}
        <div className="relative w-[460px] h-[460px] flex items-center justify-center">

          <div className="absolute inset-0 rounded-full bg-[var(--bg-soft)] opacity-70" />
          <div className="absolute w-[380px] h-[380px] rounded-full border border-[var(--accent)] opacity-60" />
          <div className="absolute w-[330px] h-[330px] -ml-6 rounded-full border border-[var(--accent)] opacity-40" />

          <div className="relative w-[290px] h-[290px] -ml-11 rounded-full bg-white shadow-[0_14px_45px_rgba(0,0,0,0.18)] z-10 flex items-center justify-center">
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

          {active.floatTop && (
            <motion.img
              src={active.floatTop}
              className="absolute -top-10 right-16 w-40 z-30"
              animate={{ y: [0, -15, 0], rotate: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />
          )}

          {active.floatBottom && (
            <motion.img
              src={active.floatBottom}
              className="absolute bottom-10 left-24 w-20 z-20"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
            />
          )}
        </div>

        {/* RIGHT TABS */}
        <div className="flex flex-col gap-4 -ml-8 z-30">
          {tabs.map((tab) => {
            const isActive = active.name === tab.name;

            return (
              <motion.button
                key={tab.name}
                onClick={() => setActive(tab)}
                whileHover={{ scale: 1.05, x: -6 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-4 w-[190px] px-3 py-2 rounded-full
                  transition-all duration-300
                  ${isActive
                    ? 'bg-[var(--bg-soft)] ring-1 ring-[var(--accent)] shadow-md'
                    : 'bg-white shadow hover:shadow-md'}
                `}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
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
