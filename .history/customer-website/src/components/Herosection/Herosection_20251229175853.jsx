'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const tabs = [
  // ... same tabs array as before (no change needed)
  {
    name: 'Classic',
    img: 'pista.png',
    icon: 'pista.png',
    floatTop: 'pista_icon.png',
    particles: ['nuts.png', 'pista_icon.png'],
    desc: 'Traditional jaggery & peanut chikki',
    color: '#FFE9C9',
  },
  {
    name: 'Strawberry',
    img: 'stwabarry_chikki.png',
    icon: 'stwabarry_chikki.png',
    floatTop: 'icon.png',
    particles: ['nuts.png', 'icon.png'],
    desc: 'Fruity strawberry crunch delight',
    color: '#FFE8EC',
  },
  {
    name: 'Mango',
    img: 'mango_chikki.png',
    icon: 'mango_chikki.png',
    floatTop: 'mango.png',
    particles: ['mango.png', 'nuts.png'],
    desc: 'Sweet mango infused chikki',
    color: '#FFF4E0',
  },
  {
    name: 'Chocolate',
    img: 'choclate.png',
    icon: 'choclate.png',
    floatTop: 'chockolate.png',
    particles: ['chockolate.png', 'nuts.png'],
    desc: 'Rich chocolate coated goodness',
    color: '#FCEDE6',
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(tabs[0]);

  // Auto-switch
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const idx = tabs.findIndex((t) => t.name === prev.name);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Parallax tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF9F4] via-[#FFFCF8] to-[#FFF5EE] flex items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden relative">
      {/* Animated waving background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, #FFE9C9 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #FFE8EC 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, #FFF4E0 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Content - Responsive */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
            We Serve The<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
              Chikki
            </span>{' '}
            You Love
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
            {active.desc}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-[#FBC02D] to-[#FFB300] px-10 py-5 rounded-full font-bold text-white shadow-2xl hover:scale-110 transition transform duration-300">
              Explore Flavors
            </button>
            <button className="text-gray-700 font-semibold hover:text-gray-900 transition">
              View All →
            </button>
          </div>
        </motion.div>

        {/* Right Visual - With Tilt */}
        <div className="relative flex justify-center" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-[380px] sm:w-[480px] h-[380px] sm:h-[480px]"
          >
            {/* Floating Particles */}
            {active.particles.map((particle, i) => (
              <motion.img
                key={i}
                src={particle}
                className="absolute w-16 sm:w-24 drop-shadow-2xl"
                animate={{
                  x: [0, Math.sin(i) * 120, 0],
                  y: [0, Math.cos(i) * 120, 0],
                  rotate: [0, 360],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 18 + i * 4,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 1.5,
                }}
                style={{
                  top: `${40 + Math.sin(i + 1) * 30}%`,
                  left: `${40 + Math.cos(i + 1) * 30}%`,
                }}
              />
            ))}

            {/* Main Product */}
            <motion.div className="absolute inset-8 sm:inset-12 rounded-full bg-white shadow-2xl overflow-hidden ring-8 ring-white/70">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.name}
                  src={active.img}
                  alt={active.name}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </motion.div>

            {/* Top Float */}
            {active.floatTop && (
              <motion.img
                src={active.floatTop}
                className="absolute -top-12 sm:-top-20 left-1/2 -translate-x-1/2 w-32 sm:w-48"
                animate={{ y: [-20, 0, -20], rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 8 }}
              />
            )}
          </motion.div>

          {/* Unique Circular Selector - Responsive Arc */}
          <div className="absolute -right-10 sm:-right-20 top-1/2 -translate-y-1/2 hidden lg:block">
            {tabs.map((tab, index) => {
              const angle = -70 + index * 46;
              const isActive = active.name === tab.name;

              return (
                <motion.button
                  key={tab.name}
                  onClick={() => setActive(tab)}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-280px) rotate(${-angle}deg)`,
                  }}
                  whileHover={{ scale: 1.3 }}
                >
                  <motion.div
                    className={`w-20 h-20 rounded-full shadow-2xl border-4 flex items-center justify-center ${
                      isActive ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    animate={isActive ? { boxShadow: ['0 0 0 0 rgba(251,192,45,0.7)', '0 0 0 20px rgba(251,192,45,0)'] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ background: isActive ? tab.color : '#ffffff' }}
                  >
                    <img src={tab.icon} className="w-14 h-14 rounded-full object-cover" />
                  </motion.div>
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-10 text-base font-bold text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {tab.name}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Flavor Tabs */}
          <div className="flex gap-4 mt-12 justify-center lg:hidden">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActive(tab)}
                className={`w-14 h-14 rounded-full shadow-lg ${active.name === tab.name ? 'ring-4 ring-yellow-400 scale-110' : ''}`}
                style={{ background: tab.color }}
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