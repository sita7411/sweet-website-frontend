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
    <section className="min-h-screen bg-[var(--bg-main)] flex items-center px-6 md:px-20 overflow-hidden relative">
      <div className="flex flex-col lg:flex-row items-center w-full">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="w-full lg:w-[480px] relative text-center lg:text-left"
        >
          {/* FLOAT LEFT – hide on small */}
          {active.floatLeft && (
            <motion.img
              src={active.floatLeft}
              className="hidden lg:block absolute -top-36 -left-64 w-72 z-20"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
          )}

          <h1 className="text-[34px] md:text-[46px] font-extrabold leading-tight text-[var(--text-main)]">
            Crafted With Care, <br /> Chikki You Truly Love
          </h1>

          <p className="mt-6 text-[14px] md:text-[15px] text-[var(--text-muted)]">
            Experience the authentic taste of handcrafted chikki made with
            premium nuts, seeds, and natural jaggery.
          </p>

          <div className="mt-10">
            <button className="bg-[var(--accent)] text-[var(--secondary)] px-9 py-3 rounded-full font-semibold shadow-lg">
              Explore Our Chikki
            </button>
          </div>
        </motion.div>

        {/* CENTER + RIGHT */}
        <div className="flex flex-col lg:flex-row items-center ml-0 lg:ml-auto mt-16 lg:mt-0">

          {/* CENTER IMAGE */}
          <div className="relative w-[300px] h-[300px] md:w-[460px] md:h-[460px] flex items-center justify-center">

            <div className="absolute inset-0 rounded-full bg-[var(--bg-soft)] opacity-70" />
            <div className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full border border-[var(--accent)] opacity-60" />
            <div className="absolute w-[200px] h-[200px] md:w-[330px] md:h-[330px] rounded-full border border-[var(--accent)] opacity-40" />

            <div className="relative w-[180px] h-[180px] md:w-[290px] md:h-[290px] rounded-full bg-white shadow-xl z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.name}
                  src={active.img}
                  className="w-full h-full object-cover rounded-full"
                />
              </AnimatePresence>
            </div>

            {/* FLOATS – desktop only */}
            {active.floatTop && (
              <motion.img
                src={active.floatTop}
                className="hidden lg:block absolute -top-10 right-16 w-40"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              />
            )}
          </div>

          {/* RIGHT TABS */}
          <div className="flex flex-row lg:flex-col gap-3 mt-10 lg:mt-0 lg:-ml-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActive(tab)}
                className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold
                  ${active.name === tab.name
                    ? 'bg-[var(--bg-soft)] ring-1 ring-[var(--accent)]'
                    : 'bg-white shadow'}
                `}
              >
                <img src={tab.icon} className="w-8 h-8 rounded-full" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
