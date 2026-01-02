'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const items = [
  {
    title: 'Classic Nut Chikki',
    subtitle: 'Jaggery & Peanut Blend',
    price: '₹199',
    rating: '5.0',
    img: 'pista.png',
  },
  {
    title: 'Strawberry Delight',
    subtitle: 'Fruity Crunch Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'stwabarry_chikki.png',
  },
  {
    title: 'Mango Fusion',
    subtitle: 'Seasonal Mango Flavor',
    price: '₹179',
    rating: '5.0',
    img: 'mango_chikki.png',
  },
  {
    title: 'Chocolate Crunch',
    subtitle: 'Rich Cocoa Coated',
    price: '₹199',
    rating: '5.0',
    img: 'choclate.png',
  },
];

export default function PopularItems() {
  return (
    <section className="py-28 bg-[var(--bg-main)]">
      <div className="max-w-6xl mx-auto">

        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-[42px] font-extrabold text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Handcrafted chikki made with premium ingredients.
          </p>
        </motion.div>

        {/* ===== Curved Background Container ===== */}
        <div className="relative">

          {/* SVG SHAPE */}
          <svg
            viewBox="0 0 1200 360"
            className="w-full h-[360px]"
            preserveAspectRatio="none"
          >
            <path
              d="
                M40,60
                Q80,20 140,40
                H420
                C460,40 460,140 420,140
                H780
                C740,140 740,40 780,40
                H1060
                Q1120,20 1160,60
                V300
                Q1120,340 1060,320
                H780
                C740,320 740,220 780,220
                H420
                C460,220 460,320 420,320
                H140
                Q80,340 40,300
                Z
              "
              fill="white"
              filter="drop-shadow(0px 30px 60px rgba(0,0,0,0.15))"
            />
          </svg>

          {/* ===== Content Over SVG ===== */}
          <div className="absolute inset-0 flex items-center justify-center px-20">

            {/* Inner Soft Container */}
            <div className="relative bg-[var(--bg-soft)] rounded-[60px] px-20 py-16 w-full">

              {/* Left Arrow */}
              <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition">
                <ChevronLeftIcon className="w-5 h-5 text-[var(--text-main)]" />
              </button>

              {/* Cards */}
              <div className="grid grid-cols-4 gap-10">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    className="relative bg-white rounded-[28px] px-6 pt-20 pb-7 shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
                  >
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-[var(--bg-card)] rounded-full flex items-center justify-center shadow">
                      <img src={item.img} className="w-24 h-24 rounded-full" />
                    </div>

                    <h3 className="text-[15px] font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.subtitle}
                    </p>
                    <p className="text-[22px] font-bold mt-3">
                      {item.price}
                    </p>

                    <div className="flex items-center justify-between mt-6">
                      <button className="bg-[var(--accent)] text-xs px-5 py-1.5 rounded-full font-semibold">
                        Order Now
                      </button>
                      <span className="text-xs">★ {item.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Arrow */}
              <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition">
                <ChevronRightIcon className="w-5 h-5 text-[var(--text-main)]" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
