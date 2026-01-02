'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    name: 'Classic',
    img: 'pista.png',
    icon: 'pista.png',
    floatTop: 'pista_icon.png',
    floatLeft: 'nuts.png',
    particles: ['nuts.png', 'pista_icon.png'],
    desc: 'Traditional jaggery & peanut chikki',
    color: '#FFE9C9',
  },
  {
    name: 'Strawberry',
    img: 'stwabarry_chikki.png',
    icon: 'stwabarry_chikki.png',
    floatTop: 'icon.png',
    floatLeft: 'nuts.png',
    particles: ['nuts.png', 'icon.png'],
    desc: 'Fruity strawberry crunch delight',
    color: '#FFE8EC',
  },
  {
    name: 'Mango',
    img: 'mango_chikki.png',
    icon: 'mango_chikki.png',
    floatTop: 'mango.png',
    floatLeft: 'nuts.png',
    particles: ['mango.png', 'nuts.png'],
    desc: 'Sweet mango infused chikki',
    color: '#FFF4E0',
  },
  {
    name: 'Chocolate',
    img: 'choclate.png',
    icon: 'choclate.png',
    floatTop: 'chockolate.png',
    floatLeft: 'nuts.png',
    particles: ['chockolate.png', 'nuts.png'],
    desc: 'Rich chocolate coated goodness',
    color: '#FCEDE6',
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[0]);

  // Auto-switch every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const currentIndex = tabs.findIndex((tab) => tab.name === prev.name);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF9F4] via-[#FFFCF8] to-[#FFF5EE] flex items-center justify-center px-8 overflow-hidden relative">
      
      {/* Subtle Grain Overlay - FIXED & SAFE */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className="max-w-7xl w-full flex items-center justify-between relative z-10">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-6xl font-black text-gray-900 leading-none">
            We Serve The<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
              Chikki
            </span>{' '}
            You Love
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-md">
            {active.desc}
          </p>

          <div className="mt-12 flex items-center gap-6">
            <button className="bg-gradient-to-r from-[#FBC02D] to-[#FFB300] px-10 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
              Explore Flavors
            </button>
            <button className="text-gray-700 font-semibold hover:text-gray-900 transition">
              View All →
            </button>
          </div>
        </motion.div>

        {/* Center + Right - Main Visual */}
        <div className="relative">

          {/* Dynamic Background Glow */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              background: [
                `radial-gradient(circle at center, ${active.color} 0%, transparent 70%)`,
                `radial-gradient(circle at center, ${active.color} 10%, transparent 80%)`,
                `radial-gradient(circle at center, ${active.color} 0%, transparent 70%)`,
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -left-32 -top-20 w-[600px] h-[600px] rounded-full opacity-50 -z-10"
          />

          {/* Main Product Area */}
          <div className="relative w-[520px] h-[520px] flex items-center justify-center">

            {/* Floating Particles (Nuts/Fruits) */}
            {active.particles.map((particle, i) => (
              <motion.img
                key={i}
                src={particle}
                className="absolute w-20 drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  x: [0, Math.sin(i * 1.5) * 100, 0],
                  y: [0, Math.cos(i * 1.5) * 100, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 14 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.2,
                }}
                style={{
                  top: `${45 + Math.sin(i) * 25}%`,
                  left: `${45 + Math.cos(i) * 25}%`,
                }}
              />
            ))}

            {/* Main Plate with Product */}
            <motion.div
              className="w-[360px] h-[360px] rounded-full bg-white shadow-2xl overflow-hidden ring-8 ring-white/80"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.name}
                  src={active.img}
                  alt={active.name}
                  initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </motion.div>

            {/* Top Floating Element */}
            {active.floatTop && (
              <motion.img
                src={active.floatTop}
                className="absolute -top-16 right-8 w-48 drop-shadow-2xl"
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 12, -8, 0],
                }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              />
            )}
          </div>

          {/* Unique Circular Flavor Selector */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0">
            {tabs.map((tab, index) => {
              const angle = -60 + index * 40; // Beautiful arc spread
              const isActive = active.name === tab.name;

              return (
                <motion.button
                  key={tab.name}
                  onClick={() => setActive(tab)}
                  className="absolute origin-center"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-240px) rotate(${-angle}deg)`,
                  }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 border-4 ${
                      isActive
                        ? 'border-white scale-125 shadow-2xl'
                        : 'border-transparent'
                    }`}
                    style={{
                      background: isActive ? tab.color : '#ffffff',
                    }}
                  >
                    <img
                      src={tab.icon}
                      alt={tab.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </motion.div>

                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 20 }}
                      className="absolute top-full mt-6 text-sm font-bold text-gray-800 whitespace-nowrap"
                    >
                      {tab.name}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}