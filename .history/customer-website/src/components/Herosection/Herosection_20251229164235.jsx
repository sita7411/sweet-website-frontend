'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    id: 'classic',
    name: 'Classic',
    image: '/images/chikki-pista.png', // fixed filename consistency
    icon: '/images/icon-classic.png',
    floatTop: '/images/icon.png',
    description: 'Traditional jaggery & peanut chikki',
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    image: '/images/chikki-strawberry.png',
    icon: '/images/icon-strawberry.png',
    floatTop: '/images/float-strawberry.png',
    description: 'Fruity strawberry crunch delight',
  },
  {
    id: 'mango',
    name: 'Mango',
    image: '/images/chikki-mango.png',
    icon: '/images/icon-mango.png',
    floatTop: '/images/float-mango.png',
    floatBottom: '/images/float-nuts.png',
    description: 'Sweet mango infused chikki',
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    image: '/images/chikki-chocolate.png',
    icon: '/images/icon-chocolate.png',
    floatTop: '/images/float-choco.png',
    floatBottom: '/images/float-nuts.png',
    description: 'Rich chocolate coated goodness',
  },
  {
    id: 'mixed',
    name: 'Mixed',
    image: '/images/chikki-mixed.png',
    icon: '/images/icon-mixed.png',
    floatTop: '/images/float-nuts.png',
    floatBottom: '/images/float-nuts.png',
    description: 'Premium mix of nuts & seeds',
  },
];

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF9F1] to-[#FFF4E8] flex items-center justify-center px-8 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="space-y-8 max-w-lg">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            We Serve The Chikki <br />
            <span className="text-[#FBC02D]">You Love</span> 😍
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Discover delicious varieties of chikki crafted with premium nuts, seeds, and natural jaggery. 
            From timeless classics to bold new flavors — indulgence meets tradition.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="bg-[#FBC02D] hover:bg-[#f9b21a] px-8 py-4 rounded-full font-semibold text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Explore Flavors
            </button>

            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md border border-gray-100">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search flavors..."
                className="outline-none text-gray-700 placeholder-gray-400 w-full min-w-[160px]"
                aria-label="Search chikki flavors"
              />
            </div>
          </div>
        </div>

        {/* Right: Hero Visual */}
        <div className="relative flex items-center justify-center">
          {/* Main Product Display */}
          <div className="relative w-[480px] h-[480px]">
            {/* Soft Glow Background */}
            <div className="absolute inset-0 rounded-full bg-[#FFE9C9] opacity-50 blur-3xl" />

            {/* Decorative Rings */}
            <div className="absolute inset-8 rounded-full border-2 border-[#F5C36A]/30" />
            <div className="absolute inset-16 rounded-full border border-[#F5C36A]/20" />

            {/* White Plate */}
            <div className="absolute inset-24 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTab.id}
                  src={activeTab.image}
                  alt={`${activeTab.name} Chikki`}
                  initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Floating Elements */}
            {activeTab.floatTop && (
              <motion.img
                src={activeTab.floatTop}
                alt=""
                className="absolute -top-6 -right-8 w-28 drop-shadow-xl z-10"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                aria-hidden="true"
              />
            )}

            {activeTab.floatBottom && (
              <motion.img
                src={activeTab.floatBottom}
                alt=""
                className="absolute -bottom-8 -left-10 w-24 drop-shadow-xl z-10"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Flavor Selector Tabs */}
          <div className="absolute -right-4 lg:right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab.id === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    group relative flex items-center gap-4 w-56 px-5 py-4 rounded-full
                    transition-all duration-300 overflow-hidden
                    ${isActive
                      ? 'bg-gradient-to-r from-[#FFE8EC] to-[#FFF0F5] ring-2 ring-[#F3B3C2] shadow-xl'
                      : 'bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1'
                    }
                  `}
                  aria-label={`Select ${tab.name} flavor`}
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center ring-2 ring-white/50">
                    <img src={tab.icon} alt="" className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{tab.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {tab.description}
                    </p>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#FBC02D]/10 to-transparent rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}