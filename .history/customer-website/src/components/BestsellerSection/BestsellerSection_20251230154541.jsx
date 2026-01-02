'use client';

import { motion } from 'framer-motion';
import { ShoppingCartIcon, SparklesIcon } from '@heroicons/react/24/solid';

const products = [
  {
    title: 'Classic Peanut Chikki',
    desc: 'Pure jaggery & roasted peanuts',
    price: '₹120',
    img: 'pista.png',
    tag: 'Bestseller',
  },
  {
    title: 'Dry Fruit Combo Pack',
    desc: 'Almond, cashew & pista mix',
    price: '₹349',
    img: 'kalakand.png',
    tag: 'Special Combo',
  },
  {
    title: 'Chocolate Crunch Chikki',
    desc: 'Cocoa coated crunchy delight',
    price: '₹199',
    img: 'choclate.png',
    tag: 'New',
  },
  {
    title: 'Sesame Jaggery Chikki',
    desc: 'Healthy & traditional taste',
    price: '₹149',
    img: 'mango_chikki.png',
    tag: 'Healthy Pick',
  },
];

export default function BestSellersGrid() {
  return (
    <section className="py-20 bg-[var(--bg-soft)]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-[40px] font-extrabold text-[var(--text-main)]">
            Best Sellers & Special Combos
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto">
            Discover our most loved chikkis and value-packed combos made with
            authentic ingredients.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] relative"
            >
              {/* Tag */}
              <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1">
                <SparklesIcon className="w-3 h-3" />
                {item.tag}
              </span>

              {/* Image */}
              <div className="w-full h-40 flex items-center justify-center mb-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-28 h-28 object-cover"
                />
              </div>

              {/* Content */}
              <h3 className="text-[16px] font-semibold text-[var(--text-main)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {item.desc}
              </p>

              {/* Price + Button */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-[20px] font-bold text-[var(--secondary)]">
                  {item.price}
                </p>

                <button className="flex items-center gap-2 bg-[var(--bg-main)] text-[var(--primary)] text-xs px-4 py-2 rounded-full font-semibold hover:bg-[var(--primary)] hover:text-white transition">
                  <ShoppingCartIcon className="w-4 h-4" />
                  Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button className="bg-[var(--primary)] text-white px-10 py-3 rounded-full font-semibold hover:brightness-110 transition">
            View All Products
          </button>
        </div>

      </div>
    </section>
  );
}
