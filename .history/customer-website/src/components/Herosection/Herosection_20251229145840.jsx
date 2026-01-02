'use client';

import React, { useState } from 'react';

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
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
        {/* Curved background shape */}
        <div className="absolute inset-0 bg-white rounded-b-full scale-x-150 scale-y-125 translate-y-[-20%]"></div>

        {/* Decorative dots */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-3xl"></div>

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-8 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between">
          {/* Left side - Text & Search */}
          <div className="max-w-2xl text-left">
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
              We Serve The Test<br />
              You Love 😋
            </h1>
            <p className="mt-8 text-gray-600 text-lg max-w-lg">
              This is a type of restaurant which typically serves food and drinks, in addition to light refreshments such as baked goods or snacks. The term comes from the rench word meaning food.
            </p>

            <div className="mt-12 flex gap-4">
              <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition shadow-lg">
                Explore Food
              </button>
              <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none w-48"
                />
                <svg className="w-6 h-6 text-gray-500 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right side - Food Image */}
          <div className="mt-16 lg:mt-0 relative">
            <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
              <img
                src="https://www.feastingathome.com/wp-content/uploads/2022/05/Grilled-Salmon-Salad-15.jpg"
                alt="Grilled Salmon Salad"
                className="rounded-full object-cover w-full h-full shadow-2xl border-8 border-white"
              />
              {/* Green leaf decoration */}
              <img
                src="https://pngimg.com/uploads/lettuce/lettuce_PNG64.png"
                alt="leaf"
                className="absolute -top-8 -right-8 w-32 rotate-12 opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Vertical Tabs on the right */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`group relative flex items-center gap-4 transition-all duration-300 ${
                activeTab === tab.name
                  ? 'translate-x-[-10px] scale-110'
                  : 'hover:translate-x-[-6px] hover:scale-105'
              }`}
            >
              {/* Yellow circle background */}
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                <span className="text-3xl">{tab.icon}</span>
              </div>
              {/* Tab name (appears on hover/active) */}
              <span
                className={`absolute right-20 whitespace-nowrap text-gray-700 font-medium transition-opacity duration-300 ${
                  activeTab === tab.name || 'group-hover:opacity-100'
                } opacity-0`}
              >
                {tab.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}