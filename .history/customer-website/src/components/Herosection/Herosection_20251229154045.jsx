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
  const [active, setActive] = useState(tabs[0]);

  return (
    <section className="min-h-screen bg-[#FFF9F1] flex items-center justify-between px-6 lg:px-24 gap-16">

      {/* LEFT CONTENT */}
      <div className="max-w-xl">
        <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
          Premium Handmade Chikki
        </span>

        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Crafted With Love <br /> Served With Crunch
        </h1>

        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          {active.desc}. Made using premium nuts, seeds and pure natural jaggery —
          a perfect blend of taste & tradition.
        </p>

        <div className="mt-10 flex items-center gap-5">
          <button className="bg-yellow-500 hover:bg-yellow-400 transition px-8 py-3 rounded-full font-semibold text-gray-900 shadow-lg">
            Explore Collection
          </button>

          <button className="px-8 py-3 rounded-full font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* CENTER IMAGE */}
      <div className="relative flex items-center justify-center">

        {/* BACK RINGS */}
        <div className="absolute w-[480px] h-[480px] rounded-full bg-yellow-100 opacity-40"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full border border-yellow-300"></div>

        {/* IMAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative w-[320px] h-[320px] rounded-full bg-white shadow-2xl p-5 z-10"
          >
            <img
              src={active.img}
              alt={active.name}
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT TABS */}
      <div className="flex flex-col gap-4">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActive(tab)}
            className={`flex items-center gap-4 px-6 py-3 rounded-full transition-all shadow-sm
              ${
                active.name === tab.name
                  ? 'bg-yellow-100 ring-2 ring-yellow-400 scale-105'
                  : 'bg-white hover:scale-105 hover:shadow-md'
              }`}
          >
            <img
              src={tab.img}
              alt={tab.name}
              className="w-11 h-11 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-800">{tab.name}</p>
            </div>
          </button>
        ))}
      </div>

    </section>
  );
}
