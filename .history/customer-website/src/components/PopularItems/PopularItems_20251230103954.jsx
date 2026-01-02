'use client';

import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';

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
  {
    title: 'Pista Delight',
    subtitle: 'Nutty & Crunchy',
    price: '₹209',
    rating: '5.0',
    img: 'pista2.png',
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

        {/* Draggable Cards */}
        <motion.div
          className="overflow-x-hidden"
        >
          <motion.div
            className="flex gap-6"
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="min-w-[250px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-grab"
              >
                {/* Image */}
                <div className="w-full h-48 bg-[var(--bg-card)] flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full"
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

