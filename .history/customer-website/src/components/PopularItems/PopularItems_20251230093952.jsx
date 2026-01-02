'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const items = [
  {
    title: 'Berries Salad',
    price: '$5.00',
    rating: '5.0',
    color: 'bg-pink-200', // pinkish
  },
  {
    title: 'Healthy Salad',
    price: '$3.00',
    rating: '5.0',
    color: 'bg-orange-300', // orange
  },
  {
    title: 'Berries Salad',
    price: '$4.00',
    rating: '5.0',
    color: 'bg-green-300', // green
  },
  {
    title: 'Healthy Salad',
    price: '$5.00',
    rating: '5.0',
    color: 'bg-purple-400', // purple
  },
];

export default function PopularItems() {
  return (
    <section className="py-28 bg-orange-50"> {/* light beige background like image */}
      <div className="max-w-7xl mx-auto px-4">

        {/* ===== Slider Container (outer box matching the image) ===== */}
        <div className="relative bg-white rounded-[50px] overflow-hidden shadow-lg">
          
          {/* Left Arrow - matching the image style */}
          <button className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
            <ChevronLeftIcon className="w-8 h-8 text-gray-800" />
          </button>

          {/* Right Arrow - matching the image style */}
          <button className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
            <ChevronRightIcon className="w-8 h-8 text-gray-800" />
          </button>

          {/* Cards Container */}
          <div className="px-24 py-16">
            <div className="grid grid-cols-4 gap-8">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -12, scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`
                    relative rounded-3xl overflow-hidden
                    shadow-2xl flex flex-col justify-end
                    h-96 ${item.color} 
                  `}
                >
                  {/* Image - positioned at top like in the reference */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-64 h-64">
                    <img
                      src="/api/placeholder/300/300" // replace with your salad images
                      alt={item.title}
                      className="w-full h-full rounded-full object-cover shadow-xl"
                    />
                  </div>

                  {/* Content at bottom */}
                  <div className="px-8 pb-8 pt-24 text-white">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-3xl font-extrabold mt-4">{item.price}</p>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-8">
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-gray-800 px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition"
                      >
                        Order Now →
                      </motion.button>

                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="w-12 h-12 bg-white/30 backdrop-blur rounded-full flex items-center justify-center"
                        >
                          <HeartIcon className="w-6 h-6 text-white" />
                        </motion.button>
                        <span className="text-lg font-medium">★ {item.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}