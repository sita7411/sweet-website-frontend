'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const tabs = [
  { name: 'Classic', img: 'pista.png', icon: 'pista.png', floatTop: 'pista_icon.png', particles: ['nuts.png', 'pista_icon.png'], desc: 'Traditional jaggery & peanut chikki', color: 'from-amber-100 to-orange-100' },
  { name: 'Strawberry', img: 'stwabarry_chikki.png', icon: 'stwabarry_chikki.png', floatTop: 'icon.png', particles: ['nuts.png', 'icon.png'], desc: 'Fruity strawberry crunch delight', color: 'from-pink-100 to-red-100' },
  { name: 'Mango', img: 'mango_chikki.png', icon: 'mango_chikki.png', floatTop: 'mango.png', particles: ['mango.png', 'nuts.png'], desc: 'Sweet mango infused chikki', color: 'from-yellow-100 to-amber-100' },
  { name: 'Chocolate', img: 'choclate.png', icon: 'choclate.png', floatTop: 'chockolate.png', particles: ['chockolate.png', 'nuts.png'], desc: 'Rich chocolate coated goodness', color: 'from-amber-200 to-brown-100' },
];

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => tabs[(tabs.indexOf(prev) + 1) % tabs.length]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useTransform(x, [-150, 150], [-25, 25]);
  const rotateX = useTransform(y, [-150, 150], [25, -25]);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section className={`min-h-screen bg-gradient-to-br ${active.color} flex items-center justify-center px-6 overflow-hidden relative`}>
      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.img
            key={i}
            src={active.particles[i % 2]}
            className="absolute w-12 opacity-60"
            animate={{
              x: [0, Math.random() * 400 - 200, 0],
              y: [0, Math.random() * 400 - 200, 0],
              rotate: [0, 360],
            }}
            transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 items-center z-10">

        {/* Left Text */}
        <motion.div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-extrabold text-gray-800"
          >
            Handcrafted<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">Chikki</span><br />
            Perfection
          </motion.h1>

          <motion.p
            key={active.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-xl text-gray-700 max-w-md mx-auto lg:mx-0"
          >
            {active.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
          >
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 px-12 py-5 rounded-full text-white font-bold shadow-2xl hover:scale-110 transition">
              Shop Now
            </button>
            <button className="text-gray-800 font-semibold hover:text-amber-600 transition">
              Discover Flavors →
            </button>
          </motion.div>
        </motion.div>

        {/* Right Interactive Visual */}
        <div className="relative flex justify-center">
          <motion.div
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative w-96 h-96 sm:w-[500px] sm:h-[500px]"
          >
            {/* Main Product Card */}
            <motion.div className="absolute inset-10 rounded-full bg-white shadow-3xl overflow-hidden ring-12 ring-white/60">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.name}
                  src={active.img}
                  initial={{ scale: 1.2, rotate: 10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Particle Burst on Change */}
              <AnimatePresence>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0"
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.img
                      key={i}
                      src={active.particles[i % 2]}
                      className="absolute w-10"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ x: Math.cos(i * 45) * 200, y: Math.sin(i * 45) * 200, opacity: 0 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      style={{ top: '50%', left: '50%' }}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Orbiting Flavor Selector - Ultra Unique! */}
            {tabs.map((tab, i) => {
              const angle = (i * 360 / tabs.length) + Date.now() / 100; // Slow rotation
              const isActive = tab.name === active.name;
              return (
                <motion.button
                  key={tab.name}
                  onClick={() => setActive(tab)}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    x: '-50%',
                    y: '-50%',
                    transform: `rotate(${angle}deg) translateX(280px)`,
                  }}
                  animate={{ rotate: -angle }}
                  whileHover={{ scale: 1.4 }}
                >
                  <motion.div
                    className={`w-20 h-20 rounded-full shadow-2xl flex items-center justify-center ${isActive ? 'ring-8 ring-amber-400' : ''}`}
                    style={{ background: isActive ? '#FBC02D' : 'white' }}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <img src={tab.icon} className="w-16 h-16 rounded-full object-cover" />
                  </motion.div>
                </motion.button>
              );
            })}

            {/* Top Floating */}
            {active.floatTop && (
              <motion.img
                src={active.floatTop}
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-40"
                animate={{ y: [-30, 10, -30], rotate: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 10 }}
              />
            )}
          </motion.div>

          {/* Mobile Simple Tabs */}
          <div className="flex gap-6 mt-16 justify-center lg:hidden">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActive(tab)}
                className={`w-16 h-16 rounded-full shadow-lg ring-4 ${active.name === tab.name ? 'ring-amber-500 scale-125' : 'ring-transparent'}`}
                style={{ background: tab.color.split(' ')[1] || 'white' }}
              >
                <img src={tab.icon} className="w-full h-full rounded-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}