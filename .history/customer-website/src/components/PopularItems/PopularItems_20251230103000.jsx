'use client';

import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/solid';

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
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[42px] font-extrabold text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Handcrafted chikki made with premium ingredients, loved for its authentic taste and perfect crunch.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="relative">
          {/* Left Arrow */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition z-10">
            <ChevronLeftIcon className="w-5 h-5 text-[var(--text-main)]" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {/* Image */}
                <div className="w-full h-48 bg-[var(--bg-card)] flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-main)]">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">{item.subtitle}</p>

                  {/* Price + Wishlist */}
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-[22px] font-bold text-[var(--secondary)]">{item.price}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="w-9 h-9 bg-[var(--bg-soft)] rounded-full flex items-center justify-center shadow"
                    >
                      <HeartIcon className="w-4 h-4 text-[var(--primary)]" />
                    </motion.button>
                  </div>

                  {/* Order Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full bg-[var(--accent)] text-[var(--secondary)] text-sm font-semibold py-2 rounded-full shadow hover:brightness-105 transition"
                  >
                    Order Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition z-10">
            <ChevronRightIcon className="w-5 h-5 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
