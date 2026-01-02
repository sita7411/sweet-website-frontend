'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState('Dishes');

  const tabs = [
    { name: 'Dishes', icon: '🍽️' },
    { name: 'Dessert', icon: '🍰' },
    { name: 'Drinks', icon: '🥤' },
    { name: 'Platter', icon: '🍲' },
    { name: 'Snacks', icon: '🍿' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
      {/* Curved background */}
      <div className="absolute inset-0 bg-white rounded-b-[50%] scale-x-150 scale-y-125 -translate-y-1/5"></div>

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left - Text and CTA */}
        <div className="max-w-xl text-left">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight"
          >
            Taste The Best <br />
            Food You Love 😋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-gray-600 text-lg sm:text-xl max-w-lg"
          >
            Experience a delightful selection of dishes, desserts, drinks, and snacks. Freshly prepared with love and served to satisfy your cravings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition shadow-lg hover:shadow-2xl">
              Explore Menu
            </button>
            <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search dishes..."
                className="outline-none w-full sm:w-48 px-2 py-1"
              />
              <svg
                className="w-5 h-5 text-gray-400 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Right - Food Image */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
          <motion.img
            src="https://www.feastingathome.com/wp-content/uploads/2022/05/Grilled-Salmon-Salad-15.jpg"
            alt="Grilled Salmon Salad"
            className="rounded-full object-cover w-full h-full shadow-2xl border-8 border-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.img
            src="https://pngimg.com/uploads/lettuce/lettuce_PNG64.png"
            alt="leaf"
            className="absolute -top-8 -right-8 w-28 sm:w-32 rotate-12 opacity-90"
            initial={{ x: 20, y: -20, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
        </div>
      </div>

      {/* Vertical Tabs */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
        {tabs.map((tab) => (
          <motion.button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="group relative flex items-center gap-4 transition-all duration-300"
            whileHover={{ x: -6, scale: 1.05 }}
            animate={{ x: activeTab === tab.name ? -10 : 0, scale: activeTab === tab.name ? 1.1 : 1 }}
          >
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transition-shadow group-hover:shadow-2xl">
              <span className="text-3xl">{tab.icon}</span>
            </div>
            <span
              className={`absolute right-20 whitespace-nowrap text-gray-700 font-medium transition-opacity duration-300 ${
                activeTab === tab.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {tab.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
