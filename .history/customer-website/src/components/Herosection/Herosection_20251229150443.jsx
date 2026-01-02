'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState('Dishes');

  const tabs = [
    { name: 'Dishes', icon: '🍽️', color: 'bg-yellow-200' },
    { name: 'Dessert', icon: '🍰', color: 'bg-pink-200' },
    { name: 'Drinks', icon: '🥤', color: 'bg-blue-200' },
    { name: 'Platter', icon: '🍲', color: 'bg-green-200' },
    { name: 'Snacks', icon: '🍿', color: 'bg-orange-200' },
  ];

  const images = {
    Dishes: 'https://www.feastingathome.com/wp-content/uploads/2022/05/Grilled-Salmon-Salad-15.jpg',
    Dessert: 'https://images.unsplash.com/photo-1601924571680-0cf5cbadea7f?auto=format&fit=crop&w=500&q=60',
    Drinks: 'https://images.unsplash.com/photo-1598514983444-742a6d8b598c?auto=format&fit=crop&w=500&q=60',
    Platter: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=500&q=60',
    Snacks: 'https://images.unsplash.com/photo-1598136491682-9eac2e072cf2?auto=format&fit=crop&w=500&q=60',
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center px-6 lg:px-20">
      
      {/* Left Text */}
      <div className="max-w-lg">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-gray-800 leading-snug"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          We Serve The Test <br /> You Love 😍
        </motion.h1>
        <motion.p
          className="mt-4 text-gray-600 text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          This is a type of restaurant which typically serves food and drinks, in addition to light refreshments such as baked goods or snacks. The term comes from the French word meaning food.
        </motion.p>

        <motion.div className="mt-6 flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button className="px-6 py-2 bg-yellow-400 text-gray-800 font-medium rounded-full hover:bg-yellow-300 transition">
            Explore Food
          </button>
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <input type="text" placeholder="Search" className="outline-none text-sm" />
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Center Food Image */}
      <div className="relative mx-10">
        <motion.div
          key={activeTab}
          className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={images[activeTab]}
            alt={activeTab}
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
      </div>

      {/* Right-side Tabs */}
      <div className="flex flex-col gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab.name ? `${tab.color} text-gray-900` : 'bg-white text-gray-600 shadow hover:shadow-md'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
