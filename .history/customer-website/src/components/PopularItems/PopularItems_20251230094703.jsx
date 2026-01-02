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

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-[42px] font-extrabold">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Handcrafted chikki made with premium ingredients.
          </p>
        </div>

        {/* ===== SHAPED CONTAINER ===== */}
        <div className="relative px-50">

          {/* WHITE MASKED BACKGROUND */}
          <div
            className="
              absolute inset-0
              bg-white
              shadow-[0_30px_70px_rgba(0,0,0,0.15)]
            "
            style={{
              borderRadius: '140px',
              WebkitMaskImage: `
                radial-gradient(circle 120px at 0% 50%, transparent 98%, black 100%),
                radial-gradient(circle 120px at 100% 50%, transparent 98%, black 100%),
                linear-gradient(black, black)
              `,
              WebkitMaskComposite: 'destination-out, destination-out, source-over',
              maskComposite: 'exclude',
            }}
          />

          {/* CONTENT */}
          <div className="relative bg-[var(--bg-soft)] rounded-[60px] px-20 py-16">

            {/* Left Arrow */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-10">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[28px] px-6 pt-20 pb-7 shadow-lg relative"
                >
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-[var(--bg-card)] rounded-full flex items-center justify-center shadow">
                    <img src={item.img} className="w-24 h-24 rounded-full" />
                  </div>

                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                  <p className="text-xl font-bold mt-3">{item.price}</p>

                  <div className="flex justify-between items-center mt-6">
                    <button className="bg-[var(--accent)] text-xs px-5 py-1.5 rounded-full font-semibold">
                      Order Now
                    </button>
                    <span className="text-xs">★ {item.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center">
              <ChevronRightIcon className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
