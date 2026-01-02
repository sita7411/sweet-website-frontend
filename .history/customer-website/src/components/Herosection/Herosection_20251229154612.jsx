'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    name: 'Classic',
    img: '/images/chikki-classic.png',
    icon: '/images/icon-classic.png',
    desc: 'Traditional jaggery & peanut chikki'
  },
  {
    name: 'Strawberry',
    img: '/images/chikki-strawberry.png',
    icon: '/images/icon-strawberry.png',
    float: '/images/float-strawberry.png',
    desc: 'Fruity strawberry crunch delight'
  },
  {
    name: 'Mango',
    img: '/images/chikki-mango.png',
    icon: '/images/icon-mango.png',
    float: '/images/float-mango.png',
    desc: 'Sweet mango infused chikki'
  },
  {
    name: 'Chocolate',
    img: '/images/chikki-chocolate.png',
    icon: '/images/icon-chocolate.png',
    float: '/images/float-choco.png',
    desc: 'Rich chocolate coated goodness'
  },
  {
    name: 'Mixed',
    img: '/images/chikki-mixed.png',
    icon: '/images/icon-mixed.png',
    float: '/images/float-nuts.png',
    desc: 'Premium mix of nuts & seeds'
  }
];

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[1]);

  return (
    <section className="min-h-screen bg-[#FFF9F1] flex items-center px-6 lg:px-24 gap-16">

      {/* LEFT CONTENT */}
      <div className="max-w-xl">
        <span className="inline-block mb-5 px-4 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
          Premium Handmade Chikki
        </span>

        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          We Serve The <br /> Chikki You Love 😍
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          {active.desc}. Crafted using premium nuts, seeds & pure jaggery.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="bg-yellow-500 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-400">
            Explore Chikki
          </button>
        </div>
      </div>

      {/* CENTER IMAGE */}
      <div className="relative flex-1 flex items-center justify-center">

        {/* RINGS */}
        <div className="absolute w-[440px] h-[440px] rounded-full bg-yellow-100 opacity-40"></div>
        <div className="absolute w-[360px] h-[360px] rounded-full border border-yellow-300"></div>

        {/* FLOATING INGREDIENT */}
        {active.float && (
          <motion.img
            key={active.float}
            src={active.float}
            className="absolute -top-6 right-24 w-24 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* MAIN IMAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.45 }}
            className="relative w-[300px] h-[300px] bg-white rounded-full p-5 shadow-2xl z-10"
          >
            <img
              src={active.img}
              className="w-full h-full object-cover rounded-full"
              alt={active.name}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT TABS (SMALL LIKE IMAGE) */}
      <div className="flex flex-col gap-3">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActive(tab)}
            className={`flex items-center gap-3 px-4 py-2 rounded-full transition
              ${
                active.name === tab.name
                  ? 'bg-yellow-100 ring-2 ring-yellow-400'
                  : 'bg-white hover:shadow'
              }`}
          >
            <img
              src={tab.icon}
              className="w-8 h-8 rounded-full"
              alt={tab.name}
            />
            <span className="text-sm font-semibold text-gray-800">
              {tab.name}
            </span>
          </button>
        ))}
      </div>

    </section>
  );
}
