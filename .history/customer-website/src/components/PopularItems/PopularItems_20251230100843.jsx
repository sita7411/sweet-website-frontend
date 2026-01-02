'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  ShoppingCartIcon as CartSolid,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

const items = [
  {
    id: 1,
    title: 'Classic Nut Chikki',
    subtitle: 'Jaggery & Peanut Blend',
    price: '₹199',
    rating: '5.0',
    img: 'pista.png',
  },
  {
    id: 2,
    title: 'Strawberry Delight',
    subtitle: 'Fruity Crunch Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'https://delicacysweets.com/public/uploads/all/p5sS0MKi6sJO1mhljUNiia8ILmisdUixdzx0XM8s.png',
  },
  {
    id: 3,
    title: 'Mango Fusion',
    subtitle: 'Seasonal Mango Flavor',
    price: '₹179',
    rating: '5.0',
    img: 'https://d3pi03i22pjpvc.cloudfront.net/images/product/400.400/bikaji_mangodryfruit_n.webp',
  },
  {
    id: 4,
    title: 'Chocolate Crunch',
    subtitle: 'Rich Cocoa Coated',
    price: '₹199',
    rating: '5.0',
    img: 'https://img-global.cpcdn.com/recipes/62bd75c0b4ff9176/1200x630cq80/photo.jpg',
  },
  {
    id: 5,
    title: 'Pistachio Premium',
    subtitle: 'Rich Green Nut Bliss',
    price: '₹229',
    rating: '5.0',
    img: 'https://www.indianmarketus.com/cdn/shop/products/52CC4982-6B46-4173-93EC-1FB13EEC6036_-_Devanshi_Shah_2048x2048.jpg?v=1571733800',
  },
];

export default function PopularItems() {
  const [liked, setLiked] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

  const toggleLike = (id) =>
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleCart = (id) =>
    setAddedToCart((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return (
    <section className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[34px] font-semibold text-[var(--text-main)]">
            Popular Picks
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            Premium handcrafted chikki made with authentic ingredients.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative group">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-8 overflow-x-auto scroll-smooth px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="relative h-56 bg-[#fff6ea] overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-[15px] font-semibold text-[var(--text-main)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-[var(--secondary)]">
                      {item.price}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      ★ {item.rating}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-5">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCart(item.id)}
                      className="
                        flex items-center gap-2
                        bg-[var(--accent)]
                        text-[var(--secondary)]
                        px-4 py-2
                        text-xs font-semibold
                        rounded-full shadow
                      "
                    >
                      {addedToCart.includes(item.id) ? (
                        <CartSolid className="w-4 h-4" />
                      ) : (
                        <ShoppingCartIcon className="w-4 h-4" />
                      )}
                      {addedToCart.includes(item.id) ? 'Added' : 'Add'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      onClick={() => toggleLike(item.id)}
                      className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center"
                    >
                      {liked.includes(item.id) ? (
                        <HeartSolid className="w-4 h-4 text-red-500" />
                      ) : (
                        <HeartIcon className="w-4 h-4 text-[var(--primary)]" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Arrows */}
          <button className="absolute left-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex w-10 h-10 bg-white rounded-full shadow items-center justify-center">
            <ChevronLeftIcon className="w-5 h-5 text-[var(--text-main)]" />
          </button>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex w-10 h-10 bg-white rounded-full shadow items-center justify-center">
            <ChevronRightIcon className="w-5 h-5 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
