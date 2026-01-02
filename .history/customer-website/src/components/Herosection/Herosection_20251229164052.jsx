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
    <section className="min-h-screen bg-[#FFF9F1] flex items-center px-20 overflow-hidden">

      {/* LEFT CONTENT */}
      <div className="w-[480px]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[44px] font-extrabold text-gray-900 leading-tight"
        >
          We Serve The Chikki <br /> You Love 😍
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 text-gray-600 text-base leading-relaxed"
        >
          Discover delicious varieties of chikki made from nuts, seeds, and jaggery.
          We bring you the best traditional and innovative chikki flavors to enjoy.
        </motion.p>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-10 flex items-center gap-4"
        >
          <button className="bg-[#FBC02D] px-8 py-3 rounded-full font-semibold shadow hover:brightness-105 transition">
            Explore Chikki
          </button>

          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm text-gray-600 w-28"
            />
          </div>
        </motion.div>
      </div>

      {/* CENTER + RIGHT */}
      <div className="ml-auto flex items-center -mr-18">

        {/* CENTER IMAGE */}
        <div className="relative w-[460px] h-[460px] flex items-center justify-center">

          {/* OUTER GLOW */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#FFE9C9] opacity-60"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          />

          {/* RING 1 */}
          <motion.div
            className="absolute w-[380px] h-[380px] rounded-full border border-[#F5C36A]"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
          />

          {/* RING 2 */}
          <div className="absolute w-[330px] h-[330px] -ml-6 rounded-full border border-[#F5C36A] opacity-60" />

          {/* PLATE */}
          <div className="relative w-[290px] h-[290px] -ml-11 rounded-full bg-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] z-10 flex items-center justify-center">

            <AnimatePresence mode="wait">
              <motion.img
                key={active.name}
                src={active.img}
                alt={active.name}
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 8 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="w-full h-full object-cover rounded-full"
              />
            </AnimatePresence>

          </div>

          {/* FLOATING ELEMENTS */}
          {active.floatTop && (
            <motion.img
              src={active.floatTop}
              className="absolute top-8 right-24 w-20 z-20"
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          )}

          {active.floatBottom && (
            <motion.img
              src={active.floatBottom}
              className="absolute bottom-10 left-24 w-20 z-20"
              animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          )}

          {/* FLAVOR INFO */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name + '-info'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="absolute -bottom-16 bg-white px-6 py-4 rounded-2xl shadow-md text-center w-[300px]"
            >
              <h4 className="font-bold text-gray-800 text-sm">
                {active.name} Chikki
              </h4>
              <p className="text-xs text-gray-500 mt-1">{active.desc}</p>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* RIGHT FLAVOR TABS */}
        <div className="flex flex-col gap-4 ml-10">
          {tabs.map((tab) => {
            const isActive = active.name === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => setActive(tab)}
                className={`
                  flex items-center gap-4 w-[210px] px-4 py-3 rounded-full
                  transition-all duration-300
                  ${isActive
                    ? 'bg-[#FFE8EC] ring-1 ring-[#F3B3C2] shadow-lg scale-[1.03]'
                    : 'bg-white shadow hover:shadow-lg hover:-translate-y-[2px]'
                  }
                `}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                  <img src={tab.icon} className="w-6 h-6" />
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
