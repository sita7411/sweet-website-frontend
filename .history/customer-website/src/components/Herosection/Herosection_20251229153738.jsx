'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { name: 'Classic', color: 'bg-amber-100' },
  { name: 'Strawberry', color: 'bg-pink-100' },
  { name: 'Mango', color: 'bg-yellow-100' },
  { name: 'Chocolate', color: 'bg-amber-200' },
  { name: 'Mixed', color: 'bg-orange-100' },
];

const tabImages = {
  Classic: 'https://rudrasfoods.in/wp-content/uploads/2025/09/peanut-chikki-in-plate-1.webp',
  Strawberry: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqOB9CsCNCrM1gnRI6KeEDLzxZ2gUNysi5rkCfJEFmXqnC-p3KdY0ZRJY5VYlOGm2LSThVFDuql_YRLGrY1Ns5V5k1E9zyHViWTnNMAC5gUmVlmGDazw_ljmCLCzqKz0zvLuVIJckyGV1O/s1600/IMG_2979.JPG',
  Mango: 'https://m.media-amazon.com/images/I/51wNDzReHiL._AC_UF1000,1000_QL80_.jpg',
  Chocolate: 'https://img-global.cpcdn.com/recipes/62bd75c0b4ff9176/1200x630cq80/photo.jpg',
  Mixed: 'https://i0.wp.com/foodtrails25.com/wp-content/uploads/2018/01/temp-100.jpg?resize=720%2C540&ssl=1',
};

const tabIcons = {
  Classic: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/08/chikki-recipe-680x510.webp',
  Strawberry: 'https://www.shutterstock.com/image-photo/homemade-dubai-chocolate-strawberry-cup-260nw-2659837921.jpg',
  Mango: 'https://m.media-amazon.com/images/I/51wNDzReHiL._AC_UF1000,1000_QL80_.jpg',
  Chocolate: 'https://img-global.cpcdn.com/recipes/06b0a718102da869/1200x630cq80/photo.jpg',
  Mixed: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2754541831429615',
};

export default function ChikkiHeroBanner() {
  const [activeTab, setActiveTab] = useState('Strawberry');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
      {/* Light curved background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-b-full scale-x-150 scale-y-110 translate-y-[-30%] opacity-90"></div>
      </div>

      {/* Scattered decorative elements (peanuts/chikki pieces feel) */}
      <div className="absolute top-20 left-10 opacity-30">
        <img src="https://thumbs.dreamstime.com/b/tempting-panoramic-view-crunchy-peanut-chikki-delicious-south-asian-sweet-treat-perfect-kids-indulge-389671923.jpg" alt="scattered" className="w-48 rotate-12" />
      </div>
      <div className="absolute bottom-32 right-20 opacity-20">
        <img src="https://thumbs.dreamstime.com/b/close-up-peanut-chikki-traditional-indian-sweet-treat-delicious-peanut-chikki-sugar-coating-traditional-indian-sweet-378513304.jpg" alt="scattered" className="w-64 -rotate-45" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-8 pt-32 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Text Section */}
        <div className="max-w-lg text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
          >
            We Serve The Chikki<br />
            You Love 😍
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-gray-600 text-lg leading-relaxed"
          >
            Discover delicious varieties of chikki made from nuts, seeds, and jaggery. We bring you the best traditional and innovative chikki flavors to enjoy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-6 items-center"
          >
            <button className="px-10 py-4 bg-yellow-500 text-white font-bold rounded-full hover:bg-yellow-600 transition shadow-lg hover:shadow-xl">
              Explore Chikki
            </button>
            <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-4">
              <svg className="w-6 h-6 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-700">Search</span>
            </div>
          </motion.div>
        </div>

        {/* Center Image with Plate */}
        <div className="relative">
          {/* Background rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 rounded-full border-4 border-orange-100 opacity-50"></div>
            <div className="absolute w-80 h-80 rounded-full border-2 border-amber-200 opacity-70"></div>
          </div>

          {/* Main Plate Image with Framer Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="relative w-96 h-96 rounded-full bg-white shadow-2xl overflow-hidden border-8 border-white"
            >
              <img
                src={tabImages[activeTab]}
                alt={`${activeTab} Chikki`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Floating Tabs */}
        <div className="flex flex-col gap-5">
          {tabs.map((tab) => (
            <motion.button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              whileHover={{ scale: 1.08, x: -10 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-4 px-6 py-4 rounded-full shadow-lg transition-all ${
                activeTab === tab.name
                  ? `${tab.color} ring-4 ring-yellow-400 scale-110`
                  : 'bg-white hover:shadow-xl'
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                <img
                  src={tabIcons[tab.name]}
                  alt={tab.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-gray-800">{tab.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}