import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE; // your backend URL

export default function HeroBanner() {
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(null);
  const [leftContent, setLeftContent] = useState({
    heading: '',
    description: '',
    buttonText: '',
  });

  // Fetch hero content from backend
  const fetchHeroContent = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/hero`);
      const hero = res.data;

      setLeftContent(hero.leftContent || {});
      setTabs(hero.variants || []);
      setActive(hero.variants?.[0] || null);
    } catch (err) {
      console.error("Failed to fetch hero content:", err);
    }
  };

  useEffect(() => {
    fetchHeroContent();
  }, []);

  // Auto rotate tabs
  useEffect(() => {
    if (!active || tabs.length === 0) return;

    const interval = setInterval(() => {
      setActive((prev) => {
        const index = tabs.findIndex((t) => t._id === prev._id);
        return tabs[(index + 1) % tabs.length];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [active, tabs]);

  if (!active) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="min-h-screen bg-[var(--bg-main)] flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 py-10 lg:py-0 overflow-hidden relative">

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="w-full lg:w-auto lg:max-w-[480px] relative z-10"
      >
        {/* FLOAT LEFT */}
        {active.floatLeft && (
          <motion.img
            src={active.floatLeft}
            className="hidden lg:block absolute -top-36 -left-64 w-72 z-20"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold leading-tight text-[var(--text-main)] text-center lg:text-left"
          dangerouslySetInnerHTML={{ __html: leftContent.heading || 'Crafted With Care,<br />Chikki You Truly Love' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="mt-6 text-base sm:text-lg lg:text-[15px] leading-relaxed text-[var(--text-muted)] text-center lg:text-left"
        >
          {leftContent.description || 'Experience the authentic taste of handcrafted chikki made with premium nuts, seeds, and natural jaggery. A perfect balance of tradition, purity, and delightful flavors.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex justify-center lg:justify-start"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="
              bg-[var(--accent)]
              text-[var(--secondary)]
              px-8 sm:px-9 py-3
              rounded-full
              font-semibold
              shadow-[0_12px_30px_rgba(0,0,0,0.18)]
              hover:brightness-105
              transition
            "
          >
            {leftContent.buttonText || 'Explore Our Chikki'}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* CENTER + RIGHT */}
      <div className="mt-12 lg:mt-0 flex flex-col lg:flex-row items-center lg:items-center lg:-mr-16">

        {/* CENTER IMAGE */}
        <div className="relative w-[320px] sm:w-[400px] lg:w-[460px] h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[var(--bg-soft)] opacity-70" />
          <div className="absolute w-[85%] h-[85%] rounded-full border border-[var(--accent)] opacity-60" />
          <div className="absolute w-[75%] h-[75%] -ml-4 lg:-ml-6 rounded-full border border-[var(--accent)] opacity-40" />

          <div className="relative w-[65%] h-[65%] -ml-8 lg:-ml-11 rounded-full bg-white shadow-[0_14px_45px_rgba(0,0,0,0.18)] z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={active._id}
                src={active.mainImage}
                alt={active.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover rounded-full"
              />
            </AnimatePresence>
          </div>

          {active.floatTop && (
            <motion.img
              src={active.floatTop}
              className="absolute -top-8 sm:-top-10 right-8 sm:right-16 w-32 sm:w-40 z-30"
              animate={{ y: [0, -15, 0], rotate: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />
          )}
        </div>

        {/* RIGHT TABS */}
        <div className="mt-10 lg:mt-0 flex flex-col gap-4 lg:-ml-8 z-30">
          {tabs.map((tab) => {
            const isActive = active._id === tab._id;
            return (
              <motion.button
                key={tab._id}
                onClick={() => setActive(tab)}
                whileHover={{ scale: 1.05, x: -6 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-4 w-[180px] sm:w-[190px] px-3 py-2 rounded-full
                  transition-all duration-300 mx-auto lg:mx-0
                  ${isActive
                    ? 'bg-[var(--bg-soft)] ring-1 ring-[var(--accent)] shadow-md'
                    : 'bg-white shadow hover:shadow-md'}
                `}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
                  <img src={tab.icon} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-sm font-semibold text-[var(--text-main)]">
                  {tab.name}
                </span>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
