'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState('Strawberry');

  const tabs = [
    { name: 'Classic', img: '/images/chikki-classic.png' },
    { name: 'Strawberry', img: '/images/chikki-strawberry.png' },
    { name: 'Mango', img: '/images/chikki-mango.png' },
    { name: 'Chocolate', img: '/images/chikki-chocolate.png' },
    { name: 'Mixed', img: '/images/chikki-mixed.png' },
  ];

  const activeImage = tabs.find(tab => tab.name === activeTab)?.img;

  return (
    <section className="min-h-screen bg-[#FFF8EE] flex items-center px-6 lg:px-20">
      
      {/* LEFT CONTENT */}
      <div className="max-w-lg">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          We Serve The Chikki <br /> You Love 😍
        </h1>

        <p className="mt-5 text-gray-600">
          Discover delicious varieties of chikki made from premium nuts,
          seeds and pure jaggery. Healthy, crunchy and full of flavour.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-yellow-400 hover:bg-yellow-300 transition px-7 py-3 rounded-full font-semibold shadow">
            Explore Chikki
          </button>

          <div className="flex items-center bg-white px-5 py-3 rounded-full shadow">
            <input
              placeholder="Search"
              className="outline-none text-sm bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* CENTER IMAGE */}
      <div className="relative mx-auto flex items-center justify-center">
        
        {/* RINGS */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-orange-200"></div>
        <div className="absolute w-[360px] h-[360px] rounded-full border border-yellow-200"></div>

        {/* IMAGE ANIMATION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-[300px] h-[300px] rounded-full overflow-hidden border-[10px] border-white shadow-2xl z-10"
          >
            <img
              src={activeImage}
              alt={activeTab}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT TABS */}
      <div className="flex flex-col gap-4">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all shadow
              ${
                activeTab === tab.name
                  ? 'bg-yellow-100 scale-105'
                  : 'bg-white hover:scale-105'
              }`}
          >
            <img
              src={tab.img}
              className="w-9 h-9 rounded-full object-cover"
              alt={tab.name}
            />
            <span className="font-medium text-gray-800">
              {tab.name}
            </span>
          </button>
        ))}
      </div>

    </section>
  );
}
