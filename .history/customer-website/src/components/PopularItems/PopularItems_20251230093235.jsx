'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const items = [
  { title: 'Pista Chikki', price: '₹199', rating: '5.0', img: 'pista.png' },
  { title: 'Strawberry Chikki', price: '₹149', rating: '5.0', img: 'stwabarry_chikki.png' },
  { title: 'Mango Chikki', price: '₹179', rating: '5.0', img: 'mango_chikki.png' },
  { title: 'Chocolate Chikki', price: '₹199', rating: '5.0', img: 'choclate.png' },
];

export default function PopularItems() {
  return (
    <section className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[var(--text-main)]">
            Our Bestsellers
          </h2>
          <p className="mt-4 text-[var(--text-muted)] max-w-xl mx-auto">
            Handcrafted traditional sweets loved across India
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative bg-[var(--bg-soft)] rounded-[48px] px-16 py-14 shadow-lg">

          {/* Left Arrow */}
          <Arrow position="left">
            <ChevronLeftIcon className="w-5 h-5" />
          </Arrow>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-10">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative bg-[var(--bg-card)] rounded-[32px] px-6 pt-20 pb-6 text-center shadow-md hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-[var(--bg-main)] rounded-full shadow flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-base font-semibold text-[var(--text-main)]">
                  {item.title}
                </h3>

                <p className="text-xl font-bold text-[var(--primary)] mt-1">
                  {item.price}
                </p>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs px-5 py-2 rounded-full bg-[var(--primary)] text-white font-semibold shadow hover:opacity-90 transition"
                  >
                    Order Now
                  </motion.button>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      className="w-8 h-8 rounded-full bg-[var(--bg-soft)] flex items-center justify-center"
                    >
                      <HeartIcon className="w-4 h-4 text-[var(--primary)]" />
                    </motion.button>
                    <span className="text-xs font-medium text-[var(--text-muted)]">
                      ★ {item.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <Arrow position="right">
            <ChevronRightIcon className="w-5 h-5" />
          </Arrow>
        </div>
      </div>
    </section>
  );
}

/* Arrow Component */
function Arrow({ children, position }) {
  return (
    <button
      className={`absolute ${position === 'left' ? 'left-6' : 'right-6'}
      top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
      bg-white shadow-md flex items-center justify-center
      hover:scale-110 transition text-[var(--text-main)]`}
    >
      {children}
    </button>
  );
}
