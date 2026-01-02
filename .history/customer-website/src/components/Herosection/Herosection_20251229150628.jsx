'use client';

import React, { useState } from 'react';

export default function UniqueHeroBanner() {
  const [activeTab, setActiveTab] = useState('Dishes');

  const tabs = [
    { name: 'Dishes', icon: '🍽️' },
    { name: 'Dessert', icon: '🍰' },
    { name: 'Drinks', icon: '🥤' },
    { name: 'Platter', icon: '🍲' },
    { name: 'Snacks', icon: '🍿' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-teal-50">
      {/* Unique wavy background layers for depth */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#fff9f0" fillOpacity="0.8" d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,186.7C672,171,768,149,864,154.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg className="absolute top-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#fefce8" fillOpacity="0.6" d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,154.7C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      {/* Floating abstract blobs for modern unique feel */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-300 to-amber-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-tr from-teal-300 to-emerald-400 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-bl from-yellow-200 to-orange-300 rounded-full opacity-10 blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center justify-between">
        {/* Left side - Text & Search */}
        <div className="max-w-2xl text-left">
          <h1 className="text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-teal-600 leading-tight drop-shadow-lg">
            We Serve The<br />Taste You Love 😋
          </h1>
          <p className="mt-10 text-gray-700 text-xl max-w-lg leading-relaxed">
            Discover a world of flavors in our restaurant – from hearty meals and refreshing drinks to indulgent desserts and quick bites. Fresh ingredients, crafted with passion.
          </p>

          <div className="mt-14 flex flex-wrap gap-6">
            <button className="px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-2xl hover:shadow-orange-300/50 transform hover:-translate-y-1">
              Explore Menu
            </button>
            <div className="flex items-center bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl px-8 py-5 border border-gray-200">
              <input
                type="text"
                placeholder="Search your craving..."
                className="outline-none w-64 text-gray-700"
              />
              <svg className="w-7 h-7 text-orange-500 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side - Food Image with unique tilt & glow */}
        <div className="mt-20 lg:mt-0 relative">
          <div className="relative w-[500px] h-[500px] transform rotate-6 hover:rotate-3 transition-transform duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-teal-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
            <img
              src="https://media.istockphoto.com/id/621461646/photo/grilled-salmon-salad.jpg?s=612x612&w=0&k=20&c=b2TrBl7Uz_ivkCtwm-NivQJ1X6mzgqLrR-nvfjF6Lek="
              alt="Delicious Grilled Salmon Salad"
              className="rounded-3xl object-cover w-full h-full shadow-2xl border-12 border-white/80"
            />
            {/* Leaf decoration with animation */}
            <img
              src="https://static.vecteezy.com/system/resources/previews/068/123/857/non_2x/transparent-green-lettuce-leaf-high-resolution-image-of-a-single-fresh-green-lettuce-leaf-isolated-on-a-transparent-background-perfect-for-culinary-health-and-design-projects-free-png.png"
              alt="fresh leaf"
              className="absolute -top-12 -right-12 w-40 rotate-45 opacity-90 animate-bounce slow"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Vertical Tabs - More unique with glow & slide animation */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`group relative flex items-center gap-5 transition-all duration-500 ease-out ${
              activeTab === tab.name
                ? 'translate-x-[-20px] scale-125'
                : 'hover:translate-x-[-10px] hover:scale-110'
            }`}
          >
            {/* Gradient circle with glow */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
              activeTab === tab.name
                ? 'bg-gradient-to-br from-orange-500 to-teal-500 shadow-orange-500/50'
                : 'bg-gradient-to-br from-amber-400 to-yellow-400 group-hover:shadow-amber-400/60'
            }`}>
              <span className="text-4xl drop-shadow-md">{tab.icon}</span>
            </div>
            {/* Tab label with fade-in & background */}
            <span
              className={`absolute right-28 px-6 py-3 bg-white/90 backdrop-blur rounded-full text-gray-800 font-semibold shadow-lg transition-all duration-500 ${
                activeTab === tab.name
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {tab.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}