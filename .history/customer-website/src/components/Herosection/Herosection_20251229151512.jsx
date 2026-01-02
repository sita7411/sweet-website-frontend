'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState('Dishes');

  const tabs = [
    { name: 'Dishes', icon: '🍽️', color: 'bg-yellow-100' },
    { name: 'Dessert', icon: '🍰', color: 'bg-pink-100' },
    { name: 'Drinks', icon: '🥤', color: 'bg-blue-100' },
    { name: 'Platter', icon: '🍲', color: 'bg-green-100' },
    { name: 'Snacks', icon: '🍿', color: 'bg-orange-100' },
  ];

  const images = {
    Dishes: 'mango.png',
    Dessert: 'stw',
    Drinks: 'https://images.unsplash.com/photo-1598514983444-742a6d8b598c',
    Platter: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
    Snacks: 'https://images.unsplash.com/photo-1598136491682-9eac2e072cf2',
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center px-6 lg:px-20">

      {/* ⭐ Floating Starry Elements */}
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-yellow-300/40"
          initial={{
            x: Math.random() * 1200 - 600,
            y: Math.random() * 800 - 400,
            opacity: 0,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0.8],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Left Content */}
      <div className="max-w-lg relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Taste That <br />
          Feels Like Home 🍽️
        </motion.h1>

        <motion.p
          className="mt-5 text-gray-600 text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Experience freshly prepared meals crafted with passion.
          From delicious dishes to refreshing drinks — we serve love on every plate.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button className="px-7 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-full shadow-lg transition">
            Explore Menu
          </button>

          <div className="flex items-center bg-white rounded-full px-5 py-3 shadow">
            <input
              type="text"
              placeholder="Search food..."
              className="outline-none text-sm text-gray-600"
            />
            <svg
              className="w-4 h-4 ml-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Center Image */}
      <div className="relative mx-12 flex items-center justify-center">
        <div className="absolute w-96 h-96 rounded-full border border-yellow-200/50 animate-spin-slow"></div>
        <div className="absolute w-80 h-80 rounded-full border border-orange-200/40"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white relative z-10"
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img
              src={images[activeTab]}
              alt={activeTab}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Tabs */}
      <div className="flex flex-col gap-4 relative z-10">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-3 px-5 py-3 rounded-full font-medium transition-all ${
              activeTab === tab.name
                ? `${tab.color} text-gray-900 shadow-md scale-105`
                : 'bg-white text-gray-600 shadow hover:scale-105'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
