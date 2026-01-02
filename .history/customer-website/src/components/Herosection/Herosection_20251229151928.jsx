'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState('Dishes');

  const tabs = [
    {
      name: 'Dishes',
      img: 'https://www.feastingathome.com/wp-content/uploads/2022/05/Grilled-Salmon-Salad-15.jpg',
    },
    {
      name: 'Dessert',
      img: 'https://images.unsplash.com/photo-1601924571680-0cf5cbadea7f',
    },
    {
      name: 'Drinks',
      img: 'https://images.unsplash.com/photo-1598514983444-742a6d8b598c',
    },
    {
      name: 'Platter',
      img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
    },
    {
      name: 'Snacks',
      img: 'https://images.unsplash.com/photo-1598136491682-9eac2e072cf2',
    },
  ];

  const activeImage = tabs.find(t => t.name === activeTab)?.img;

  return (
    <div className="min-h-screen bg-[#FFF8EE] flex items-center px-6 lg:px-20">

      {/* LEFT CONTENT */}
      <div className="max-w-lg">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          We Serve The Test <br /> You Love 😍
        </h1>

        <p className="mt-5 text-gray-600">
          This is a type of restaurant which typically serves food and drinks,
          in addition to light refreshments such as baked goods or snacks.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-yellow-400 hover:bg-yellow-300 px-7 py-3 rounded-full font-semibold shadow">
            Explore Food
          </button>

          <div className="flex items-center bg-white px-5 py-3 rounded-full shadow">
            <input
              placeholder="Search"
              className="outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* CENTER IMAGE */}
      <div className="relative mx-auto flex items-center justify-center">

        {/* OUTER RINGS */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-orange-200"></div>
        <div className="absolute w-[360px] h-[360px] rounded-full border border-yellow-200"></div>

        {/* IMAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-[300px] h-[300px] rounded-full overflow-hidden shadow-2xl border-[10px] border-white z-10"
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
            className={`flex items-center gap-3 px-5 py-3 rounded-full transition shadow
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
            <span className="font-medium text-gray-800">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
