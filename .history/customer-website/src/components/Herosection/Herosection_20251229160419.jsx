'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    name: 'Classic',
    img: '/images/chikki-classic.png',
    icon: '/images/icon-classic.png',
    desc: 'Traditional jaggery & peanut chikki',
  },
  {
    name: 'Strawberry',
    img: '/images/chikki-strawberry.png',
    icon: '/images/icon-strawberry.png',
    floatTop: '/images/float-strawberry.png',
    desc: 'Fruity strawberry crunch delight',
  },
  {
    name: 'Mango',
    img: '/images/chikki-mango.png',
    icon: '/images/icon-mango.png',
    floatTop: '/images/float-mango.png',
    floatBottom: '/images/float-nuts.png',
    desc: 'Sweet mango infused chikki',
  },
  {
    name: 'Chocolate',
    img: '/images/chikki-chocolate.png',
    icon: '/images/icon-chocolate.png',
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
  const [active, setActive] = useState(tabs[1]);

  return (
    <section className="min-h-screen bg-[#FFF9F1] flex items-center px-6 lg:px-24 overflow-hidden">

      {/* LEFT CONTENT */}
      <div className="max-w-xl pr-24">
        <span className="inline-block mb-5 px-4 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
          Premium Handmade Chikki
        </span>

        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          We Serve The <br /> Chikki You Love
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          {active.desc}. Crafted using premium nuts, seeds & pure jaggery.
        </p>

        <div className="mt-10">
          <button className="bg-yellow-500 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-400 transition">
            Explore Chikki
          </button>
        </div>
      </div>

      {/* CENTER + RIGHT */}
      <div className="relative flex items-center gap-12">

        {/* CENTER IMAGE */}
        <div className="relative w-[420px] h-[420px] flex items-center justify-center">

          {/* OUTER RING */}
          <div className="absolute w-full h-full rounded-full bg-yellow-100 opacity-40" />

          {/* INNER RING */}
          <div className="absolute w-[340px] h-[340px] rounded-full border border-yellow-300" />

          {/* FLOATING TOP */}
          {active.floatTop && (
            <motion.img
              key={active.floatTop}
              src={active.floatTop}
              className="absolute top-6 right-20 w-20 z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          )}

          {/* FLOATING BOTTOM */}
          {active.floatBottom && (
            <motion.img
              key={active.floatBottom}
              src={active.floatBottom}
              className="absolute bottom-8 left-24 w-20 z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          )}

          {/* MAIN IMAGE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4 }}
              className="relative w-[260px] h-[260px] bg-white rounded-full p-4 shadow-xl z-10"
            >
              <img
                src={active.img}
                alt={active.name}
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT FLAVOR TABS (IMAGE MATCHED) */}
        <div className="flex flex-col gap-4">
          {tabs.map((tab) => {
            const isActive = active.name === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => setActive(tab)}
                className={`
                  flex items-center gap-4 w-[190px] px-4 py-3 rounded-full
                  transition-all duration-300
                  ${
                    isActive
                      ? 'bg-[#FFE8EC] shadow-md ring-1 ring-[#F7B2C4]'
                      : 'bg-white shadow hover:shadow-md'
                  }
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-white' : 'bg-gray-100'}
                  `}
                >
                  <img
                    src={tab.icon}
                    alt={tab.name}
                    className="w-6 h-6 object-contain"
                  />
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
