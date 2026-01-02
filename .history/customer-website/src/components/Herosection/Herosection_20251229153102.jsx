'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    name: 'Classic',
    img: '/images/chikki-classic.png',
    desc: 'Traditional jaggery & peanut chikki'
  },
  {
    name: 'Strawberry',
    img: '/images/chikki-strawberry.png',
    desc: 'Fruity strawberry crunch delight'
  },
  {
    name: 'Mango',
    img: '/images/chikki-mango.png',
    desc: 'Sweet mango infused chikki'
  },
  {
    name: 'Chocolate',
    img: '/images/chikki-chocolate.png',
    desc: 'Rich chocolate coated goodness'
  },
  {
    name: 'Mixed',
    img: '/images/chikki-mixed.png',
    desc: 'Premium mix of nuts & seeds'
  }
];

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[1]);

  return (
    <section className="min-h-screen bg-[#FFF8EE] flex items-center justify-between px-6 lg:px-20 gap-12">

      {/* LEFT CONTENT */}
      <div className="max-w-xl">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          We Serve The Chikki <br /> You Love 😍
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          {active.desc}. Crafted with premium nuts, seeds and pure jaggery.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <button className="bg-yellow-400 hover:bg-yellow-300 transition px-8 py-3 rounded-full font-semibold shadow-md">
            Explore Chikki
          </button>

          <div className="flex items-center bg-white px-5 py-3 rounded-full shadow-md">
            <input
              placeholder={`Search ${active.name}`}
              className="outline-none bg-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* CENTER IMAGE */}
      <div className="relative flex items-center justify-center">

        {/* BACK RINGS */}
        <div className="absolute w-[460px] h-[460px] rounded-full bg-orange-100 opacity-40"></div>
        <div className="absolute w-[380px] h-[380px] rounded-full border border-yellow-900"></div>

        {/* IMAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="relative w-[320px] h-[320px] rounded-full bg-white shadow-2xl p-4 z-10"
          >
            <img
              src={active.img}
              alt={active.name}
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT FLOATING TABS */}
      <div className="flex flex-col gap-4">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActive(tab)}
            className={`flex items-center gap-4 px-5 py-3 rounded-full transition-all shadow-md
              ${
                active.name === tab.name
                  ? 'bg-yellow-100 scale-105 ring-2 ring-yellow-300'
                  : 'bg-white hover:scale-105'
              }`}
          >
            <img
              src={tab.img}
              alt={tab.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold text-gray-800">
              {tab.name}
            </span>
          </button>
        ))}
      </div>

    </section>
  );
}
