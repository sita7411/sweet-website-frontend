'use client';

import { motion } from 'framer-motion';

export default function StatsSection() {
  const stats = [
    { img: 'user.png', value: '5,000+', label: 'Happy Customers', size: 'w-16 h-16' },
    { img: 'cube.png', value: '50+', label: 'Chikki Varieties', size: 'w-16 h-16' },
    { img: 'sparkles.png', value: '10+', label: 'Special Flavors', size: 'w-16 h-16' },
    { img: 'cart.png', value: '1,00,000+', label: 'Chikki Sold', size: 'w-16 h-16' },
  ];

  return (
    <motion.section
      className="relative py-24 overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: "url('Frame 36.png')" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--bg-main)] opacity-10"></div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 text-center px-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center relative px-2"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Divider */}
              {index !== stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-[1px] opacity-30 bg-[var(--text-muted)]"></div>
              )}

              {/* Icon */}
              <motion.div
                className="mb-2"
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--accent)',
                    border: '2px solid var(--secondary)',
                  }}
                >
                  <div
                    className="w-18 h-18 rounded-full flex items-center justify-center shadow-md overflow-hidden"
                    style={{
                      backgroundColor: 'var(--primary)',
                      border: '2px solid var(--secondary)',
                    }}
                  >
                    <img src={stat.img} alt={stat.label} className={stat.size} />
                  </div>
                </div>
              </motion.div>

              <h3 className="text-2xl font-bold text-[var(--secondary)]">
                {stat.value}
              </h3>
              <p className="mt-1 text-[var(--text-muted)] font-medium text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
